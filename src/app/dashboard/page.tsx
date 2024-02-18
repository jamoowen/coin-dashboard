import { coinbaseRestRequest, createWebsocketQueryParams, fetchProductCandles, fetchTradingPairs } from '@/lib/services/coinbaseRestRequests'
import { FC, Suspense, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import TickerInformation from './TickerInformation'
import { TradingPairs } from '@/types/coinbase-types'
import TickerChart from './TickerChart'
import { Skeleton } from '@/components/ui/skeleton'

interface pageProps {
    params: string
    searchParams: { id: string }
}

const page: FC<pageProps> = async ({ params, searchParams }) => {
    const productId = searchParams.id;
    const wss_url = "wss://ws-direct.sandbox.exchange.coinbase.com"
    const initialTickerData = await coinbaseRestRequest(`/products/${productId}/ticker`)
    let data: TradingPairs[] = await fetchTradingPairs()

    // const chartData = await fetchProductCandles('ETH-BTC')
    // console.log(`Chart data: ${chartData}`)
    // console.log(`TEST: ${JSON.stringify(initialTickerData.data)}`)

    // console.log(`PAGE LOADING FOR ID: ${searchParams.id}`)
    return (
        <main className="h-full flex  flex-col overflow-hidden min-h-screen ">


            <div className='grid grid-cols-3 mt-10 w-full gap-1 '>

                <div className='col-span-3 items-center w-full  flex justify-center '>

                    <div className=' w-full flex'>
                        <div className=' px-5 bg-blend-color gap-5  flex-col overflow-scroll  opacity  min-h-screen  grow '>
                            <span className='text-4xl sm:text-7xl cursor-default mt-10 text-white'>{productId}</span>

                            <TickerInformation productId={productId} initialTickerData={initialTickerData ? initialTickerData.data : undefined} />
                            <Suspense fallback={<div className="flex flex-col space-y-3">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[250px]" />
                                </div>
                                <Skeleton className="h-[400px] w-full rounded-xl" />

                            </div>} >

                            <TickerChart productId={productId} />
                            </Suspense>
                        </div>
                    </div>
                </div>







            </div>

        </main>
    )
}

export default page