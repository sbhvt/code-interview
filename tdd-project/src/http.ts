import axios from 'axios';

type RequestConfig = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  baseUrl?: string;
  headers?: any;
  body?: any;
  params?: any;
};

type Response = {
  data?: any;
  error?: any;
  status: number;
  statusText: string;
  headers: any;
};

/** Basic http functionality, more verbs needed */
interface RequestClient {
  request(config: RequestConfig): Promise<Response>;
  get(url: string, config?: RequestConfig): Promise<Response>;
  post(url: string, config?: RequestConfig): Promise<Response>;
}

// handles axios weirdness in errors
function convertErrorMessage(error: any) {
  if (error.response?.data?.error_description) {
    console.log('error.response.data', error.response.data);
    return `${error.response.data.error || 'Error'}: ${error.response.data.error_description}`;
  }
  return error.response?.data?.toString() || error.message?.toString() || error?.toString();
}

/** Wraps basic http request handling */
export class HttpClient implements RequestClient {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
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

  /** Wraps to handle axios weirdness */
  async request(config: RequestConfig) {
    try {
      const { data, status, statusText, headers } = await this.reqClient.request({
        ...this.defaults,
        ...config,
      });
      return {
        data,
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

  get(url: string, config: Partial<RequestConfig> = {}): Promise<Response> {
    return this.request({ url, method: 'get', ...config });
  }

  post(url: string, config: Partial<RequestConfig> = {}): Promise<Response> {
    return this.request({ url, method: 'post', ...config });
  }
}
