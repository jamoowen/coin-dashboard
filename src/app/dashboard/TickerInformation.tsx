'use client'
import { createWebsocketQueryParams } from '@/lib/services/coinbaseRestRequests';
import { TickerData, TickerWebsocketData } from '@/types/coinbase-types';
import { subscribe } from 'diagnostics_channel';
import { FC, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket';

interface WebSocketComponentProps {
    initialTickerData: TickerData | undefined
    productId: string
}



const TickerInformation: FC<WebSocketComponentProps> = ({ productId, initialTickerData }) => {
    const startingTicker = initialTickerData ? initialTickerData : "No starting data"
    const baseCurrency = productId.split('-')[0];
    const quoteCurrency = productId.split('-')[1];
    // const [tickerData, setTickerData] = useState(initialTickerData ? initialTickerData.data : "No starting data");
    const [tickerData, setTickerData] = useState(initialTickerData);
    const [ask, setAsk] = useState(initialTickerData ? initialTickerData.ask : '-')
    const [bid, setBid] = useState(initialTickerData ? initialTickerData?.bid : '-')
    const [price, setPrice] = useState(initialTickerData ? initialTickerData?.price : '-')
    const [vol, setVol] = useState(initialTickerData ? initialTickerData?.volume : '-')
    const [timeUpdated, setTimeUpdated] = useState(initialTickerData ? initialTickerData?.time : '-')



    // const wss_url = "wss://ws-direct.sandbox.exchange.coinbase.com"
    const wss_url = "wss://ws-feed-public.sandbox.exchange.coinbase.com";
    const channelMessage = {
        "type": "subscribe",
        "product_ids": [
            productId
        ],
        "channels": ["ticker_batch"]
    }
    const authMessage = createWebsocketQueryParams();
    const subscribeMessage = {
        ...channelMessage,
        ...authMessage
    }

    const {
        sendJsonMessage,
        lastMessage,
        readyState
    } = useWebSocket(wss_url, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => false,
        // onMessage: (event: WebSocketEventMap['message']) => console.log(event.data)
        onMessage: (event: WebSocketEventMap['message']) => handleMessage(JSON.parse(event.data))
    });
    console.log(`subscribing...`)
    sendJsonMessage(subscribeMessage);

    

    const handleMessage = (message: TickerWebsocketData) => {
        if (message['type'] === 'ticker') {
            // console.log(`Updating prices...`)
            // console.log(`Initial price: ${initialTickerData?.price}, Socket price: ${message.price}`)
            setAsk(message.best_ask)
            setBid(message.best_bid)
            setPrice(message.price)
            setVol(message.volume_24h)
            setTimeUpdated(message.time)
        } else {
            console.log(`ERR: ${JSON.stringify(message)}`)
        }
    }

    return (
        <div>
            {tickerData ?
                <div className='flex flex-col'>
                    <div className='text-white'>
                        {ask} {quoteCurrency} (Best Ask)
                    </div>

                    <div className='text-white'>
                        {bid} {quoteCurrency} (Best Bid)
                    </div>
                    <div className='text-white'>
                        {price} {quoteCurrency} (Price)
                    </div>
                    <div className='text-white'>
                        {vol} {baseCurrency} (24HR Volume)
                    </div>
                    <div className='text-white text-opacity-60'>
                        {timeUpdated}
                    </div>
                </div>

                : <div className='animate-pulse'>Unable to load live ticker data</div>}
        </div>
    )
}

export default TickerInformation