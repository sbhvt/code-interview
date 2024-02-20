import { HttpClient, RequestConfig } from './http';

describe('with nullable configurations', () => {
  const responseconfiguration: { whenRequest: RequestConfig; responseData: any } = {
    whenRequest: {
      url: '/myRoute',
      method: 'get',
      params: { x: '123' },
    },
    responseData: { hello: 'world' },
  };

  const nullHttpClient = HttpClient.createNull([responseconfiguration]);

  it('should return as configured', async () => {
    const result = await nullHttpClient.get('/myRoute');
    expect(result.data).toEqual({ hello: 'world' });
  });

  it('should return as 404 if route not configured', async () => {
    const result = await nullHttpClient.get('/diffRoute');
    expect(result.status).toBe(404);
  });

  it('should return as 404 if verb not configured', async () => {
    const result = await nullHttpClient.post('/myRoute');
    expect(result.status).toBe(404);
  });
});

// not copying over any http tests here as it would require test setup scripts which startup and run a server, etc, but that's what we'd end up with if we split this out for real
