// import crypto library
const cryptoLib = require('crypto');

// some coinbase api routes require authentication headers
// the headers are created below and returned

/**
 * Creates authentication headers required for some Coinbase API routes.
 * 
 * @param requestPath - The API endpoint path.
 * @param body - The JSON request body (default: empty object).
 * @param method - The HTTP request method (default: 'GET').
 * @returns Authentication headers object.
 */
export const createCoinbaseAuthHeaders = (requestPath: string, body='', method='GET') => {
    // create the json request object
const cb_access_timestamp = Date.now() / 1000; // in ms
const cb_access_key = process.env.API_KEY!
// const cb_access_key = 'rubiwobeaoih'
const cb_access_passphrase = process.env.API_PASSPHRASE!;
const secret = process.env.API_SECRET!;

// create the prehash string by concatenating required parts
const message = cb_access_timestamp + method + requestPath + body;
// decode the base64 secret
const key = Buffer.from(secret, 'base64');
// create a sha256 hmac with the secret
const hmac = cryptoLib.createHmac('sha256', key);
// sign the require message with the hmac and base64 encode the result
const cb_access_sign = hmac.update(message).digest('base64');

const headers = { 
    'Content-Type': 'application/json',
    'cb-access-key': cb_access_key,
    'cb-access-passphrase': cb_access_passphrase,
    'cb-access-sign': cb_access_sign,
    'cb-access-timestamp': cb_access_timestamp

  }

  return headers

}


