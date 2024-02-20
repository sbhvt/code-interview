/* eslint-disable max-classes-per-file */
import axios from 'axios';

export type RequestConfig = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  baseUrl?: string;
  headers?: any;
  body?: any;
  params?: any;
};

type Response<T> = {
  data?: T;
  error?: any;
  status: number;
  statusText: string;
  headers: any;
};

/** Basic http functionality */
interface RequestClient {
  request<T>(config: RequestConfig): Promise<Response<T>>;
}

// handles axios weirdness in errors
function convertErrorMessage(error: any) {
  if (error.response?.data?.error_description) {
    console.log('error.response.data', error.response.data);
    return `${error.response.data.error || 'Error'}: ${error.response.data.error_description}`;
  }
  return error.response?.data?.toString() || error.message?.toString() || error?.toString();
}

export type ConfigurableRequestResponse = {
  whenRequest: { url: string; method: string };

  responseData: any;
};

class NullableHttpClient implements RequestClient {
  // eslint-disable-next-line no-useless-constructor
  constructor(private requestConfigResponses: { whenRequest: RequestConfig; responseData: any }[] = []) {}

  async request<T>(config: RequestConfig): Promise<Response<T>> {
    const matching = this.requestConfigResponses.find(
      (x) => x.whenRequest.url === config.url && x.whenRequest.method === config.method,
    );
    if (matching) return { status: 200, statusText: 'ok', data: matching.responseData, headers: {} };

    // not found
    return { status: 404, statusText: 'NotFound', headers: {} };
  }
}

/** Wraps basic http request handling */
export class HttpClient implements RequestClient {
  private constructor(
    private reqClient: RequestClient,
    private defaults: Partial<RequestConfig> = {
      method: 'get',
      url: '/',
      headers: { 'Content-Type': 'application/json' },
    },
  ) {}

  static create(defaults?: RequestConfig) {
    return new HttpClient(axios.create(), defaults);
  }

  static createNull(configs?: { whenRequest: RequestConfig; responseData: any }[]) {
    return new HttpClient(new NullableHttpClient(configs));
  }

  /** Wraps to handle axios weirdness */
  async request<T>(config: RequestConfig) {
    try {
      const { data, status, statusText, headers } = await this.reqClient.request({
        ...this.defaults,
        ...config,
      });
      return {
        data: <T>data,
        status,
        statusText,
        headers,
      };
    } catch (error: any) {
      const errMsg = convertErrorMessage(error); // handles axios weird
      return {
        error: errMsg,
        status: error?.response?.status || 500,
        statusText: error?.response?.statusText || 'ERROR',
        headers: error?.response?.headers || {},
      };
    }
  }

  get<T>(url: string, config: Partial<RequestConfig> = {}): Promise<Response<T>> {
    return this.request<T>({ url, method: 'get', ...config });
  }

  post<T>(url: string, config: Partial<RequestConfig> = {}): Promise<Response<T>> {
    return this.request({ url, method: 'post', ...config });
  }

  put<T>(url: string, config: Partial<RequestConfig> = {}): Promise<Response<T>> {
    return this.request({ url, method: 'put', ...config });
  }

  delete<T>(url: string, config: Partial<RequestConfig> = {}): Promise<Response<T>> {
    return this.request({ url, method: 'delete', ...config });
  }
}
