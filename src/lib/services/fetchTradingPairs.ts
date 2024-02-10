import { TradingPairs } from "@/types/coinbase-types";
import { AxiosResponse } from "axios";
import { createCoinbaseAuthHeaders } from "./createCoinbaseAuth";
import { AxiosError } from 'axios';

// import { useToast } from "@/components/ui/use-toast"


// const { toast } = useToast()


const axios = require('axios').default;


const urlPath = '/conversions/fees'

// coinbase requires authentication headers for some endpoints
const authenticatedHeader = createCoinbaseAuthHeaders(urlPath)


const config = {
    method: 'get',
    url: `https://api-public.sandbox.exchange.coinbase.com${urlPath}`,
    headers: authenticatedHeader
};

// import axios, { AxiosError, AxiosResponse } from 'axios';

export async function fetchTradingPairs() {
    try {
        const response: AxiosResponse = await axios(config);
        console.log(`!!!!!!! ${response.status}`)
        if (response.status === 200) {
            console.log(`response: ${response.data.length}`);
            const extractedData = response.data.map(({ id, base_currency, quote_currency, display_name }) => ({ id, base_currency, quote_currency, display_name }));
            return extractedData;
        } else if (response.status === 401) {
            throw new AxiosError(`ERROR authenticating API route, response: ${response.status}`);
        } else if (response.status === 500) {
            throw new AxiosError(`ERROR accessing API route, response: ${response.status}`);
        } else {
            throw new AxiosError(`Unknown error: ${response.status}`);
        }
    } catch (error: unknown) {
        let errorDescription = 'API error';
        if (error instanceof Error) {
            errorDescription = error.message;
            // Here we could handle any errors by notifying devs
            console.log(`Error: ${error.message}`);
        } 
        else {
            console.log('Unknown error');
        }
        console.error(error);
    }
}



// REST API	https://api-public.sandbox.exchange.coinbase.com
// Websocket Feed	wss://ws-feed-public.sandbox.exchange.coinbase.com
// Websocket Direct Feed	wss://ws-direct.sandbox.exchange.coinbase.com
// FIX API - Order Entry 4.2 SP2	tcp+ssl://fix-public.sandbox.exchange.coinbase.com:4198
// FIX API - Order Entry 5.0 SP2	tcp+ssl://fix-ord.sandbox.exchange.coinbase.com:6121
// FIX API - Market Data 5.0 SP2	tcp+ssl://fix-md.sandbox.exchange.coinbase.com:6121