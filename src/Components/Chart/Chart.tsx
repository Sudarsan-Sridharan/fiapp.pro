import {dispose, init} from "klinecharts";
import React, {useEffect} from "react";
import {IKlineAPI, klineAPI} from "../../API/coinAPI";

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

    useEffect(() => {
        const chart = init('simple_chart');
        if (chart && chartKline) {
            chart.createIndicator('VOL');
            chart.applyNewData(chartKline);
            chart.setPriceVolumePrecision(pricePrecision, volumePrecision)
        }
        return () => {
            dispose('simple_chart');
        }
    }, [chartKline]);

    return <div id="simple_chart" style={{height: props.height ?? '800px'}}/>;
}

export default Chart