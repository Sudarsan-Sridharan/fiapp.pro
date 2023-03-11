import {Chart, dispose, init} from "klinecharts";
import React, {useEffect, useRef} from "react";
import {IKlineAPI, klineAPI, signalAPI} from "../../API/coinAPI";
import timejs from "../../Unit/timejs";

interface IChart {
    height?: string,
    name: string,
    timeframe: string
}


const Chart: React.FC<IChart> = (props) => {
    const kline = klineAPI({
        name: props.name,
        timeframe: props.timeframe
    } as IKlineAPI)

    const chartKline = kline && kline.map((item) => {
        return {
            close: item.close_bid,
            high: item.highest_bid,
            low: item.lowest_bid,
            open: item.open_bid,
            // cover date to timestamp in milliseconds
            timestamp: new Date(item.open_at).getTime(),
            volume: item.volume_bid
        }
    })

    // calculate price precision
    const pricePrecision = chartKline && (chartKline[0].close.toString().split('.')[1] || '').length
    // calculate volume precision
    const volumePrecision = chartKline && (chartKline[0].volume.toString().split('.')[1] || '').length

    const chart = useRef<Chart | null>()

    const signalData = signalAPI({
        name: props.name,
        timeframe: props.timeframe
    } as IKlineAPI)

    useEffect(() => {
        chart.current = init(`_chart`);
        if (chart.current && chartKline) {
            chart.current.applyNewData(chartKline);
            chart.current.setPriceVolumePrecision(pricePrecision, volumePrecision)
        }

        const signalBuy = signalData && signalData.length > 0 ? signalData.map((item) => {
            if (item.direction === 1) {
                const [addTimeNum, addTimeStr]: any = item.timeframe.match(/^(\d+)([a-zA-Z]+)$/)?.slice(1) ?? [30, 'M'];
                const realTime = timejs(item.open_time).add(Number(addTimeNum), addTimeStr.toLowerCase()).valueOf()
                return {
                    timestamp: realTime,
                    value: item.open_price
                }
            } else {
                return {
                    timestamp: 0,
                    value: 0
                }
            }
        }) : null

        const signalSell = signalData && signalData.length > 0 ? signalData.map((item) => {
            if (item.direction === -1) {
                const [addTimeNum, addTimeStr]: any = item.timeframe.match(/^(\d+)([a-zA-Z]+)$/)?.slice(1) ?? [30, 'M'];
                const realTime = timejs(item.open_time).add(Number(addTimeNum), addTimeStr.toLowerCase()).valueOf()
                return {
                    timestamp: realTime,
                    value: item.open_price
                }
            } else {
                return {
                    timestamp: 0,
                    value: 0
                }
            }
        }) : null

        if (chart.current) {
            if (signalBuy) {
                chart.current.createOverlay({
                    name: 'simpleAnnotation',
                    extendData: '买入',
                    points: [...signalBuy],
                })
            }

            if (signalSell) {
                chart.current.createOverlay({
                    name: 'simpleAnnotation',
                    extendData: '卖出',
                    points: [...signalSell],
                })
            }
        }

    }, [chartKline, signalData]);

    useEffect(() => {
        return () => {
            dispose(`_chart`);
        }
    }, [chartKline, signalData])

    return <div id={`_chart`} style={{height: props.height ?? '800px'}}/>;
}

export default Chart