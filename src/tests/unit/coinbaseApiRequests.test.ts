import { createCoinbaseAuthHeaders, coinbaseRestRequest, fetchTradingPairs, createWebsocketQueryParams, fetchProductCandles, returnEnvVars } from "../../lib/services/coinbaseRestRequests";
// import { createCoinbaseAuthHeaders } from 
import { expect, describe, it, test } from "vitest"
// test.spec.js
// import { test } from 'vitetest';

const {cb_access_key, cb_access_passphrase, secret, coinbaseRestUrl} = returnEnvVars()

test('createCoinbaseAuthHeaders function returns authentication headers', () => {

  const requestPath = '/products';
  const body = '';
  const method = 'GET';
  const headers = createCoinbaseAuthHeaders(requestPath, body, method);
  console.log(`HEADERS: ${headers}`)
  expect(headers).toBeDefined();
  expect(headers).toHaveProperty('cb-access-key');
  expect(headers).toHaveProperty('cb-access-passphrase');
  expect(headers).toHaveProperty('cb-access-sign');
  expect(headers).toHaveProperty('cb-access-timestamp');
  // Add more assertions as needed
});

test('coinbaseRestRequest function fetches data from the Coinbase API', async () => {
  const endpoint = '/products';
  const response = await coinbaseRestRequest(endpoint);
  expect(response).toBeDefined();
  // Add more assertions as needed
});

test('fetchProductCandles function fetches product candles', async () => {
  const endpoint = '/products/ETH-BTC/candles';
  const candles = await fetchProductCandles(endpoint);
  expect(candles).toBeDefined();
  expect(candles).toHaveProperty('productData');
  expect(candles).toHaveProperty('productOhlc');
  expect(candles).toHaveProperty('productVolume');
  // Add more assertions as needed
});

test('fetchTradingPairs function fetches trading pairs', async () => {
  const tradingPairs = await fetchTradingPairs();
  expect(tradingPairs).toBeDefined();
  expect(Array.isArray(tradingPairs)).toBe(true);
  // Add more assertions as needed
});

test('createWebsocketQueryParams function returns authentication headers', () => {
  const headers = createWebsocketQueryParams();
  expect(headers).toBeDefined();
  expect(headers).toHaveProperty('signature');
  expect(headers).toHaveProperty('key');
  expect(headers).toHaveProperty('passphrase');
  expect(headers).toHaveProperty('timestamp');
  // Add more assertions as needed
});

