'use client'
import { FC, useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { fetchProductCandles, fetcher3, productCandleFetcher } from '@/lib/services/coinbaseRestRequests'
import useSWR from 'swr'
import axios from 'axios'
import { Button } from '@/components/ui/button'

// addFunnel = require('highcharts/modules/funnel');

// const Highcharts = require('highcharts');


interface TickerChartProps {
    productId: string
    candleData: any
}



const TickerChart: FC<TickerChartProps> = ({ productId, candleData }) => {
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

    const [timeInterval, setTimeInterval] = useState(timeIntervals['1 hour'])
    const [chartData, setChartData] = useState('')
    const [chartOhlc, setChartOhlc] = useState('')
    const [chartVol, setChartVol] = useState('')
    console.log(timeInterval)
    // const fetcher = url => axios.get(`https://api-public.sandbox.exchange.coinbase.com${url}`).then(res => res.data)
    // const { data, error, isLoading } = useSWR(`/products/${productId}/candles?granularity=${timeInterval}`, fetchProductCandles)



    // const fetcher = url => axios.get(url).then(res => res.data)
    // const { data, error, isLoading } = useSWR(`https://demo-live-data.highcharts.com/aapl-ohlcv.json`, fetcher)


    // console.log(isLoading)




    // const chartData = fetchProductCandles('ETH')
    // 60, 300, 900, 3600, 21600, 86400 -> one minute, five minutes, fifteen minutes, one hour, six hours, and one day
    const chartRef = useRef();


    // const testData = await fetch(
    //     'https://demo-live-data.highcharts.com/aapl-ohlcv.json'
    // ).then(response => response.json());


    // split the data set into ohlc and volume


    // if (!isLoading) {
    //     let ohlc = []
    //     let volume = []
    //     // console.log(`DATA: ${data}`)
    //     for (let i = 0; i < data.length; i += 1) {
    //         ohlc.push([
    //             data[i][0], // the date
    //             data[i][1], // open
    //             data[i][2], // high
    //             data[i][3], // low
    //             data[i][4] // close
    //         ]);

    //         volume.push([
    //             data[i][0], // the date
    //             data[i][5] // the volume
    //         ]);
    //     }
    //     setChartData(ohlc);
    //     // setChartVol(volume);
    //     console.log(`SETTING: ${ohlc[0]}`)
    // }

    // set the allowed units for data grouping
    const groupingUnits = [[
        'hour',                         // unit name
        [1]                             // allowed multiples
    ],[
        'day',                         // unit name
        [1]                             // allowed multiples
    ],[
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
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },

        title: {
            text: timeInterval
        },

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: '-'
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
            type: 'candlestick',
            name: '-',
            data: chartOhlc,
            
        }, {
            type: 'column',
            name: 'Volume',
            data: chartVol,
            yAxis: 1,
            
        }]
    });

    useEffect(() => {

        const fetchTest = async () => {
            const fetcher = url => axios.get(url).then(res => res.data)
            // const fetcher2 = url => axios.get(url).then(res => res.data)
            const { productOhlc, productVolume } = await fetchProductCandles(`/products/BTC-USD/candles?granularity=86400`)
            // const realData = await fetcher3('https://api-public.sandbox.exchange.coinbase.com/products/BTC-USD/candles?granularity=3600')



            // const data = await fetcher('https://demo-live-data.highcharts.com/aapl-ohlcv.json')
            
            // let ohlc = []
            // let volume = []
            // // console.log(`DATA: ${data}`)
            // for (let i = 0; i < data.length; i += 1) {
            //     ohlc.push([
            //         data[i][0], // the date
            //         data[i][1], // open
            //         data[i][2], // high
            //         data[i][3], // low
            //         data[i][4] // close
            //     ]);

            //     volume.push([
            //         data[i][0], // the date
            //         data[i][5] // the volume
            //     ]);
            // }
            // console.log(`TESTDATA: ${ohlc.length}`)
            console.log(`Actualdata: ${productVolume}`)

            setChartOptions({
                series: [{
                    type: 'candlestick',
                    name: baseCurrency,
                    data: productOhlc,
                    
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: productVolume,
                    yAxis: 1,
                    
                }],
                title: {
                    text: timeInterval,
                },
            });
            // return testData
        }
        fetchTest();




    }, [timeInterval]);

    // Load the dataset
    // 60, 300, 900, 3600, 21600, 86400 -> one minute, five minutes, fifteen minutes, one hour, six hours, and one day

    return (

        <div className='w-full mt-10 p-2 bg-gray-800 rounded-sm '>
            {(false) ?
                <div className=' h-96'>
                    loading...
                </div>
                : <>
                    <div>
                        {Object.keys(timeIntervals).map((key) => (
                            <Button key={key} onClick={() => setTimeInterval(timeIntervals[key])}>{key}</Button>
                        ))}

                    </div>


                </>}
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                constructorType="stockChart"
                ref={chartRef}
            />
        </div>

    )
}

export default TickerChart