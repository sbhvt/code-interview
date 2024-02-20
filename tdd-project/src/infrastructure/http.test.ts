import { HttpClient, RequestConfig } from './http';

const express = require('express');

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

describe('with http', () => {
  let server;
  beforeAll(async () => {
    // eslint-disable-next-line no-use-before-define
    const app = getTestExpressServer();
    server = app.listen(5002, '0.0.0.0', () => {});
  });
  afterAll(async () => {
    server.close((err) => {});
  });

  it('should succeed for get with valid path', async () => {
    const subject = HttpClient.create();
    const result = await subject.get('http://localhost:5002/');
    expect(result.status).toBe(200);
  });
  it('should succeed for post with valid path', async () => {
    const subject = HttpClient.create();
    const result = await subject.post('http://localhost:5002/');
    expect(result.status).toBe(200);
  });
  it('should succeed for put with valid path', async () => {
    const subject = HttpClient.create();
    const result = await subject.put('http://localhost:5002/');
    expect(result.status).toBe(200);
  });
  it('should succeed for delete with valid path', async () => {
    const subject = HttpClient.create();
    const result = await subject.delete('http://localhost:5002/');
    expect(result.status).toBe(200);
  });
  it('should fail for get with bad path', async () => {
    const subject = HttpClient.create();
    const result = await subject.get('http://localhost:5002/bad');
    expect(result.status).toBe(404);
  });
  it('should fail for get with error path', async () => {
    const subject = HttpClient.create();
    const result = await subject.get('http://localhost:5002/error');
    console.log(result);
    expect(result.status).toBe(500);
  });
});

// just builds a simple express server to run for testing HttpClient with axios instead of nullable
const getTestExpressServer = () => {
  const app = express();
  const goodResponse = (req, res) => {
    res.status(200).json({ test: 'success' });
  };
  // setup basic routes at root
  app.get('/', goodResponse);
  app.post('/', goodResponse);
  app.put('/', goodResponse);
  app.delete('/', goodResponse);
  app.get('/error', (req, res) => {
    res.status(500).json('ERROR ROUTE');
  });

  return app;
};
