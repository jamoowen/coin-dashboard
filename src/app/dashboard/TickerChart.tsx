'use client'
import { FC, useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { fetchProductCandles } from '@/lib/services/coinbaseRestRequests'
import useSWR from 'swr'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCcw } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'




interface TickerChartProps {
    productId: string

}


const TickerChart: FC<TickerChartProps> = ({ productId }) => {
    const router = useRouter()
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
    const rangeMapping = {
        60: 0,
        300: 1,
        900: 1,
        3600: 2,
        21600: 4,
        86400: 4,
    }

    const [timeInterval, setTimeInterval] = useState<number>(timeIntervals['1 day'])
    const [chartData, setChartData] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [chartType, setChartType] = useState<string>('line')
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false)

    // 60, 300, 900, 3600, 21600, 86400 -> one minute, five minutes, fifteen minutes, one hour, six hours, and one day
    const chartRef = useRef();


    // CHART CONFIG set the allowed units for data grouping
    const groupingUnits = [[
        'minute',                         // unit name
        [1, 5, 15]                             // allowed multiples
    ], [
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

    // CHART CONFIG kept in state
    // the this.reflow is used to fix bug when resizing page -> reflow resizes the chart to its parent div
    const [chartOptions, setChartOptions] = useState({
        chart: {
            style: {
                overflow: 'auto',
            },
            events: {
                load() {
                    console.log("before reflow");
                    this.reflow();
                    console.log("after reflow");
                }
            }
        },

    });

    // data is fetched within the use effect. the time interval and chart type are dependencies, meaning the data will be refetched when one of those is changed
    // You are able to select the time interval you want, and the type of chart (line/candlestick) but I have not allowed custom ranges as the coinbase api returns a maximum of 300 product candles
    // More logic is needed to allow for this
    useEffect(() => {
        setIsLoading(true)
        const fetchTest = async () => {

            const dataDict = await fetchProductCandles(`/products/${productId}/candles?granularity=${timeInterval}&start=`)
            const productData = dataDict?.productData
            const productOhlc = dataDict?.productOhlc
            const productVolume = dataDict?.productVolume

            // console.log(`latest date:: ${new Date(productOhlc[productOhlc.length-1][0])}`)

            // console.log(`TESTDATA: ${ohlc[0]}`)
            // console.log(`Actualdata length: ${productData.length} data1: ${productData[0]} dataend: ${productData[productData.length-1]}`)
            // console.log(`Actualdata: ${productOhlc}`)

            // once the data has been fetched, we must update the chart
            setChartOptions({
                title: {
                    text: `${productId} Historical`
                },
                style: {
                    overflow: 'auto'
                },
                chart: {
                    style: {
                        overflow: 'auto',

                    },
                    events: {
                        load() {
                            console.log("before reflow");
                            this.reflow();
                            console.log("after reflow");
                        }
                    }
                },

                rangeSelector: {
                    buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '1D'
                    }, {
                        type: 'week',
                        count: 1,
                        text: '1w'
                    }, {
                        type: 'month',
                        count: 1,
                        text: '1m'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    }, {
                        type: 'all',
                        text: 'All',
                        title: 'View all'
                    }],
                    selected: 5,
                    inputEnabled: true
                },

                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: `Price (${quoteCurrency})`
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
                }],
            });
            // return testData
            productOhlc && (productOhlc?.length > 1) ? setChartData(true) : setChartData(false);
            


        }


        fetchTest();
        setIsLoading(false);


    }, [timeInterval, chartType, reloadTrigger]);

    // Load the dataset
    // 60, 300, 900, 3600, 21600, 86400 -> one minute, five minutes, fifteen minutes, one hour, six hours, and one day

    return (
        <>
            {isLoading ?
                <div className="flex mt-5 flex-col space-y-3">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-[400px] w-full rounded-xl" />

                </div>
                :
                <>

                    <div className='mt-10 flex flex-col  px-2  mb-10 bg-gray-800 rounded-sm '>
                        {chartData ? <>
                            <span className='mt-2 ml-1'>Ticker intervals</span>
                            <div className='grid grid-cols-4 py-2 sm:flex gap-2'>

                                {Object.keys(timeIntervals).map((key) => (
                                    <Button className={`${timeInterval === timeIntervals[key] ? 'bg-white text-black hover:' : ''}`} key={key} onClick={() => setTimeInterval(timeIntervals[key])}>{key}</Button>
                                ))}

                            </div>
                            <span className='mt-2 ml-1'>Chart type</span>
                            <div className='flex gap-2 py-2'>
                            
                                <Button className={`${chartType === 'candlestick' ? 'bg-white text-black hover:' : ''}`} onClick={() => setChartType('candlestick')}>
                                    Candlestick
                                </Button>
                                <Button className={`${chartType != 'candlestick' ? 'bg-white text-black hover:' : ''}`} onClick={() => setChartType('line')}>
                                    Line
                                </Button>
                            </div>
                            <div className='flex'>
                                <Button onClick={()=>setReloadTrigger(!reloadTrigger)} className='hover:bg-white rounded-none hover:text-gray-900'>
                                    <RefreshCcw className='' />
                                </Button>
                            </div>
                        </> :
                            <div className=' '>
                                <span className='text-2xl text-red-500'>Error!</span> <br />Unable to load historical data for {productId} <br /> Try selecting a different asset
                            </div>
                        }

                        <div className='flex overflow-auto  h-[300px] sm:h-[500px]'>
                            <HighchartsReact

                                highcharts={Highcharts}
                                options={chartOptions}
                                constructorType="stockChart"
                                ref={chartRef}
                                style="overflow: auto"
                                containerProps={{ className: 'overflow-auto xl:w-[1200px] lg:w-[1000px] md:w-[800px] sm:w-[600px] w-[500px]' }}
                            // callback = { setTimeout(this.reflow.bind(this), 0) }


                            />
                        </div>

                    </div>
                </>
            }
        </>
    )


}

export default TickerChart