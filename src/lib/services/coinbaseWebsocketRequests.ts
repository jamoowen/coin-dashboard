// JS Example for subscribing to a channel

// wss://advanced-trade-ws.coinbase.com
// wss://ws-feed-public.sandbox.exchange.coinbase.com -> websocket feed
// wss://ws-direct.sandbox.exchange.coinbase.com -> websocket direct feed 
// To begin receiving feed messages, you must send a subscribe message to the server indicating which channel and products to receive. 
// This message is mandatory and you are disconnected if no subscribe has been received within 5 seconds.
// you must generate a different JWT for each websocket message sent, since the JWTs will expire after 2 minutes

// You can subscribe to multiple channels but you must send a unique subscription message for each channel.

// Coinbase Market Data is our traditional feed which is available without authentication.
// Coinbase Direct Market Data has direct access to Coinbase Exchange servers and requires Authentication.

// You can subscribe to both ws-feed (Coinbase Market Data) and ws-direct (Coinbase Direct Market Data),
//  but if ws-direct is your primary connection, we recommend using ws-feed as a failover.

// Include the following header in the opening handshake to allow for compression, 
// which will lower bandwidth consumption with minimal impact to CPU / memory: Sec-WebSocket-Extensions: permessage-deflate. 
// See Websocket Compression Extension





// Request
// Subscribe to ETH-USD and ETH-EUR with the level2 channel
// Request
// Subscribe to ETH-USD and ETH-EUR with the level2, heartbeat and ticker channels,
// plus receive the ticker entries for ETH-BTC and ETH-USD
// {
//     "type": "subscribe",
//     "product_ids": [
//         "ETH-USD",
//         "ETH-EUR"
//     ],
//     "channels": [
//         "level2",
//         "heartbeat",
//         {
//             "name": "ticker",
//             "product_ids": [
//                 "ETH-BTC",
//                 "ETH-USD"
//             ]
//         }
//     ]
// }

// Request
// You can also unsubscribe from a channel entirely by providing no product IDs
// {
//     "type": "unsubscribe",
//     "channels": [
//         "heartbeat"
//     ]
// }

// const exampleSocket = new WebSocket("wss://www.example.com/socketserver", [
//   "protocolOne",
//   "protocolTwo",
// ]);

// exampleSocket.send("Here's some text that the server is urgently awaiting!");
// exampleSocket.send(JSON.stringify(msg));
// exampleSocket.onopen = (event) => {
//     exampleSocket.send("Here's some text that the server is urgently awaiting!");
//   };

// exampleSocket.onmessage = (event) => {
//     console.log(event.data);
//   };


// exampleSocket.close();


/* eslint-disable */
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { createCoinbaseAuthHeaders } from './coinbaseRestRequests';

// const wss_url = 'wss://ws-direct.sandbox.exchange.coinbase.com';
// const authHeaders = createCoinbaseAuthHeaders(wss_url)
// let queryParams = {
//     "signature": authHeaders['cb-access-sign'],
//     "key": authHeaders['cb-access-key'],
//     "passphrase": authHeaders['cb-access-passphrase'],
//     "timestamp": authHeaders['cb-access-timestamp']
// }

// let queryParams = {
//     "type": "subscribe",
//     "product_ids": [
//         "BTC-USD"
//     ],
//     "channels": [
//         "full"
//     ],
//     "signature": "...",
//     "key": "...",
//     "passphrase": "...",
//     "timestamp": "..."
// }



// const { sendJsonMessage, getWebSocket } = useWebSocket(wss_url, {
//     onOpen: () => console.log('WebSocket connection opened.'),
//     onClose: () => console.log('WebSocket connection closed.'),
//     shouldReconnect: (closeEvent) => true,
//     onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
// },);


