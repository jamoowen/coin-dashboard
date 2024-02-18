'use client'
import { FC, useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { fetchProductCandles, fetcher3, productCandleFetcher } from '@/lib/services/coinbaseRestRequests'
import useSWR from 'swr'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

// addFunnel = require('highcharts/modules/funnel');

// const Highcharts = require('highcharts');


interface TickerChartProps {
    productId: string
    
}


const TickerChart: FC<TickerChartProps> = ({ productId }) => {
    const baseCurrency = productId.split('-')[0];
    const quoteCurrency = productId.split('-')[1];

    const timeIntervals = {
        "1 min": 60,
        "5 mins": 300,
        "15 mins": 900,
        "1 hour": 3600,
        "6 hours": 21600,
        "1 day": 86400
    }

    const [timeInterval, setTimeInterval] = useState(timeIntervals['1 day'])
    const [chartData, setChartData] = useState()
    const [chartData2, setChartData2] = useState()
    const [chartOhlc, setChartOhlc] = useState()
    const [chartVol, setChartVol] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [chartType, setChartType] = useState('candlestick')
    // console.log(timeInterval)
    // const fetcher = url => axios.get(`https://api-public.sandbox.exchange.coinbase.com${url}`).then(res => res.data)
    // const { data, error, isLoading } = useSWR(`/products/${productId}/candles?granularity=${timeInterval}`, fetchProductCandles)



    // const chartData = fetchProductCandles('ETH')
    // 60, 300, 900, 3600, 21600, 86400 -> one minute, five minutes, fifteen minutes, one hour, six hours, and one day
    const chartRef = useRef();


    // const testData = await fetch(
    //     'https://demo-live-data.highcharts.com/aapl-ohlcv.json'
    // ).then(response => response.json());


    // set the allowed units for data grouping
    const groupingUnits = [[
        'hour',                         // unit name
        [1]                             // allowed multiples
    ], [
        'day',                         // unit name
        [1]                             // allowed multiples
    ], [
        'week',                         // unit name
        [1]                             // allowed multiples
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];




    // console.log(`TEST DATA: ${testData}`)
    const [chartOptions, setChartOptions] = useState({

        rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            },{
                type: 'week',
                count: 1,
                text: '1w'
            },{
                type: 'month',
                count: 1,
                text: '1m'
            },{
                type: 'month',
                count: 3,
                text: '3m'
            },{
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 5,
            inputEnabled: true
        },

        title: {
            text: `${productId} Historical`
        },

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        tooltip: {
            split: true
        },

    });

    useEffect(() => {
        setIsLoading(true)
        const fetchTest = async () => {
            const fetcher = url => axios.get(url).then(res => res.data)
            // const fetcher2 = url => axios.get(url).then(res => res.data)
            const { productData, productOhlc, productVolume } = await fetchProductCandles(`/products/${productId}/candles?granularity=${timeInterval}&start=1645108200000`)
            setChartData(productData)
            setChartOhlc(productOhlc)
            setChartVol(productVolume)
            // const realData = await fetcher3('https://api-public.sandbox.exchange.coinbase.com/products/BTC-USD/candles?granularity=3600')
            // 1645108200000
            // 1678233600000

            const data = await fetcher('https://demo-live-data.highcharts.com/aapl-ohlcv.json')

            // console.log(`TESTDATA: ${ohlc[0]}`)
            // console.log(`Actualdata length: ${productData.length} data1: ${productData[0]} dataend: ${productData[productData.length-1]}`)
            // console.log(`Actualdata: ${productOhlc}`)

            setChartOptions({
                series: [{
                    type: chartType,
                    name: baseCurrency,
                    data: productOhlc,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: productVolume,
                    yAxis: 1,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }]
            });
            // return testData
        }
        fetchTest();
        setIsLoading(false);



    }, [timeInterval, chartType]);

    // Load the dataset
    // 60, 300, 900, 3600, 21600, 86400 -> one minute, five minutes, fifteen minutes, one hour, six hours, and one day

    if (isLoading) {
        return (
            <div className="flex flex-col space-y-3">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-xl" />

            </div>
        )
    } else if (!isLoading && chartData) {
        return (
            <div className='w-full mt-10 gap-5 flex flex-col p-2 bg-gray-800 rounded-sm '>
                Ticker intervals
                <div className='flex gap-2'>

                    {Object.keys(timeIntervals).map((key) => (
                        <Button className={`${timeInterval === timeIntervals[key] ? 'bg-white text-black hover:' : ''}`} key={key} onClick={() => setTimeInterval(timeIntervals[key])}>{key}</Button>
                    ))}

                </div>
                <div className='flex gap-2'>
                    <Button className={`${chartType === 'candlestick'? 'bg-white text-black hover:' : ''}`} onClick={()=>setChartType('candlestick')}>
                        Candlestick
                    </Button>
                    <Button className={`${chartType != 'candlestick'? 'bg-white text-black hover:' : ''}`} onClick={()=>setChartType('line')}>
                        Line
                    </Button>
                </div>

                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    constructorType="stockChart"
                    ref={chartRef}
                />
            </div>
        )
    } else {
        return (
            <div className='animate-pulse'>
                Unable to fetch historical data for {productId}
            </div>
        )
    }

}

export default TickerChart