import { coinbaseRestRequest, createWebsocketQueryParams, fetchProductCandles, fetchTradingPairs } from '@/lib/services/coinbaseRestRequests'
import { FC, Suspense, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import TickerInformation from './TickerInformation'
import { TradingPairs } from '@/types/coinbase-types'
import TickerChart from './TickerChart'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'


interface pageProps {
    params: string
    searchParams: { id: string }
}

const page: FC<pageProps> = async ({ params, searchParams }) => {
    const productId = searchParams.id;
    const wss_url = "wss://ws-direct.sandbox.exchange.coinbase.com"
    const initialTickerData = await coinbaseRestRequest(`/products/${productId}/ticker`)
    const tradingPairs: TradingPairs[] = await fetchTradingPairs()

    return (
        <main className="h-full flex  flex-col overflow-hidden min-h-screen ">

                        <div className='mt-10 px-5 bg-blend-color gap-5  flex-col  opacity  min-h-screen  grow '>
                            <span className='text-4xl sm:text-7xl cursor-default mt-10 text-white'>{productId}</span>

                            <TickerInformation productId={productId} initialTickerData={initialTickerData ? initialTickerData.data : undefined} />
                            <Popover>
                                <PopoverTrigger className='bg-white text-black rounded-md px-5 mt-5 py-1 flex flex-row'>Token Pair <ChevronDown /></PopoverTrigger>
                                <PopoverContent className='ml-5'>
                                    <ScrollArea className="">
                                        {tradingPairs.map((pair)=> (
                                            <div key={pair.id} className={productId===pair.id ? 'bg-black bg-opacity-20 pointer-events-none w-full':'hover:border hover:border-black'}>
                                                <a  href={`/dashboard?id=${pair.id}`} key={pair.id}>{pair.id}</a>
                                            </div>
                                            
                                        ))}
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                            <Suspense fallback={
                            <div className="flex mt-5 flex-col space-y-3">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[250px]" />
                                </div>
                                <Skeleton className="h-[400px] w-full rounded-xl" />

                            </div>} >

                                <TickerChart productId={productId} />
                            </Suspense>
                        </div>


        </main>
    )
}

export default page