// import crypto library
import { TradingPairs } from "@/types/coinbase-types";
import { AxiosResponse } from "axios";
import { AxiosError } from 'axios';
// import useSWR from 'swr'
// const cryptoLib = require('crypto');
import cryptoLib from 'crypto';
import axios from 'axios';
// const axios = require('axios').default;


type RequestHeader = {
    [key: string]: any | undefined;
}

// if the api keys are not provided, the currently implemented routes will still work
const coinbaseRestUrl = 'https://api-public.sandbox.exchange.coinbase.com'
const cb_access_key = process.env.NEXT_PUBLIC_API_KEY
const cb_access_passphrase = process.env.NEXT_PUBLIC_API_PASSPHRASE
const secret = process.env.NEXT_PUBLIC_API_SECRET

export const returnEnvVars = () => {
    return{
        'cb_access_key': cb_access_key,
        'cb_access_passphrase': cb_access_passphrase,
        'secret': secret,
        'coinbaseRestUrl': coinbaseRestUrl
    }
}


/**
 * Creates authentication headers required for some Coinbase API routes.
 * 
 * @param requestPath - The API endpoint path.
 * @param body - The JSON request body (default: empty object).
 * @param method - The HTTP request method (default: 'GET').
 * @returns Authentication headers object.
 */
export const createCoinbaseAuthHeaders = (requestPath: string, body = '', method = 'GET') => {

    if (secret) {
        // create the prehash string by concatenating required parts
        const cb_access_timestamp = Date.now() / 1000; // in ms
        const message = cb_access_timestamp + method + requestPath + body;
        const key = Buffer.from(secret, 'base64');
        const hmac = cryptoLib.createHmac('sha256', key);
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
    else {
        console.log("cant get auth...")
    }
}

/**
 * Fetches trading pairs from the Coinbase API.
 * 
 * @returns A promise resolving to an array of trading pair objects containing id, base_currency, quote_currency, and display_name.
 * @param endpoint The api endpoint you want to hit eg: /products.
 */
export async function coinbaseRestRequest(endpoint: string) {
    let header: RequestHeader = {
        'Content-Type': 'application/json',
    }

    const authHeaders = createCoinbaseAuthHeaders(endpoint)
    if (authHeaders) {
        header = authHeaders;
    }
    const config = {
        method: 'get',
        url: `${coinbaseRestUrl}${endpoint}`,
        headers: header
    };
    try {
        const response: AxiosResponse = await axios(config);
        return response;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
            return
        }
        else {
            console.log('Unknown error');
            return
        }
    }
}

/**
 * Fetches product candles from the specified endpoint.
 * @param endpoint The endpoint to fetch product candles from.
 * @returns An object containing product candles data, OHLC data, and volume data.
 */
export async function fetchProductCandles(endpoint: string) {
    let header: RequestHeader = {
        'Content-Type': 'application/json',
    }

    const authHeaders = createCoinbaseAuthHeaders(endpoint)
    // if (authHeaders) {
    //     header = authHeaders;
    // }
    const config = {
        method: 'get',
        url: `${coinbaseRestUrl}${endpoint}`,
        // headers: header
    };
    try {
        const response: AxiosResponse = await axios(config);
        const data = response.data

        let ohlc = []
        let volume = []
        let productData = []
        // console.log(`DATA: ${data}`)
        // NOTE: highcharts requires data to be in ascending order, date, open, high, low, close
        // coinbase responds with descending date, low, high, open, close, volume
        for (let i = 0; i < data.length; i += 1) {
            ohlc.unshift([
                data[i][0] * 1000, // the date
                data[i][3], // open
                data[i][2], // high
                data[i][1], // low
                data[i][4] // close
            ]);

            volume.unshift([
                data[i][0] * 1000, // the date
                data[i][5] // the volume
            ]);
            productData.unshift([
                data[i][0] * 1000, // the date
                data[i][3], // open
                data[i][2], // high
                data[i][1], // low
                data[i][4], // close
                data[i][5] // the volume
            ]);
        }
        return { productData: productData, productOhlc: ohlc, productVolume: volume }

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
        else {
            console.log('Unknown error');
        }
    }
}

/**
 * Fetches trading pairs from the Coinbase API.
 * 
 * @returns A promise resolving to an array of trading pair objects containing id, base_currency, quote_currency, and display_name.
 */
export async function fetchTradingPairs() {
    try {
        const apiResponse: AxiosResponse | undefined = await coinbaseRestRequest('/products')

        // console.log(`response: ${response.data.length}`);
        if (!apiResponse) {
            throw new Error
        }
        const extractedData = apiResponse.data.map(({ id, base_currency, quote_currency, display_name }) => ({ id, base_currency, quote_currency, display_name }));
        return extractedData;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
            return
        }
        else {
            console.log('Unknown error');
            return
        }
    }
}

/**
 * Creates query parameters for WebSocket authentication.
 * @returns An object containing authentication headers including signature, key, passphrase, and timestamp.
 */
export function createWebsocketQueryParams() {
    if (secret) {
        const cb_access_timestamp = Date.now() / 1000; // in ms
        const what = cb_access_timestamp + 'GET' + '/users/self/verify'
        const key = Buffer.from(secret, 'base64')
        const hmac = cryptoLib.createHmac('sha256', key);
        const signature = hmac.update(what).digest('base64')

        const authenticatedHeaders = {
            "signature": signature,
            "key": cb_access_key,
            "passphrase": cb_access_passphrase,
            "timestamp": cb_access_timestamp,
        }
        return authenticatedHeaders
    } else {
        // if we cant find the api keys return an empty dict == no authentication
        console.log("Cant authenticate websocket...")
        return {}
    }

}
