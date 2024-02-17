export type TradingPairs = {
    id: string
    base_currency: string
    quote_currency: string
    display_name: string
}

export type TickerData = {
    ask: string
    bid: string
    volume: string
    trade_id: number
    price: string
    size: string
    time: string
}

export type TickerWebsocketData = {
    type: string,
    sequence: string,
    product_id: string,
    price: string,
    open_24h: string,
    volume_24h: string,
    low_24h: string,
    high_24h: string,
    volume_30d: string,
    best_bid: string,
    best_bid_size: string,
    best_ask: string,
    best_ask_size: string,
    side: string,
    time: string,
    trade_id: string,
    last_size: string
}