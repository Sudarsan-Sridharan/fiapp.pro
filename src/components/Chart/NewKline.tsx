import {createChart, PriceScaleMode} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';
import {Box} from "@mui/material";
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {timejs} from "@/utils/time";
import {green, grey, red} from "@mui/material/colors";
import {ITrendingChange} from "@/components/Table/TrendingChange";
import {messageType} from "@/pages/Detail/Detail";
import {IRiskWarning} from "@/components/Table/RiskWarning";

export const ChartComponent = (props: any) => {
    const chartContainerRef = useRef<any>();
    const APIQuery = useAPIQuery()
    const conditions = {
        timeFrame: APIQuery.value.timeframe ?? '',
        name: props.name
    };
    const sendUrl = new URLSearchParams(conditions).toString();

    const {data: klines} = useSWR(`${domain}/Coin?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 5,
    });

    const {data: trendingChange} = useSWR(`${domain}/TrendingChange?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 5,
    })

    const {data: riskWarning} = useSWR(`${domain}/RiskWarning?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 5,
    })

    const trending = trendingChange?.data.map((x: ITrendingChange) => {
        return {
            time: timejs(new Date(x.open_time).toLocaleString()).unix(),
            position: `${x.current_trending === 1 ? 'belowBar' : x.current_trending === 0 ? 'belowBar' : 'aboveBar'}`,
            color: `${x.current_trending === 1 ? green[900] : x.current_trending === 0 ? grey[900] : red[900]}`,
            shape: `${x.current_trending === 1 ? 'arrowUp' : x.current_trending === 0 ? 'arrowUp' : 'arrowDown'}`,
            text: `${x.current_trending === 1 ? '趋势转多' : x.current_trending === 0 ? '趋势中立' : '趋势转空'}(${6 - x.risk})`,
            size: 2
        }
    })

    const risk = riskWarning?.data.map((x: IRiskWarning) => {
        return {
            time: timejs(new Date(x.open_time).toLocaleString()).unix(),
            position: 'belowBar',
            color: grey[500],
            shape: 'arrowUp',
            text: `${messageType[x.description_type as keyof typeof messageType]} \n(${x.risk})`,
        }
    })

    const price = klines?.data?.data.coinKlines?.klines.map((item: { open_at: Date, open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; }) => {
        return {
            time: timejs(new Date(item.open_at).toLocaleString()).unix(),
            open: item.open_bid,
            high: item.highest_bid,
            low: item.lowest_bid,
            close: item.close_bid,
        }
    })

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({width: chartContainerRef.current.clientWidth});
            };

            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                rightPriceScale: {
                    mode: PriceScaleMode.Logarithmic
                }
            });
            chart.timeScale().applyOptions({
                barSpacing: 1,
                timeVisible: true,
            });

            const timer = new Date().getTime();

            chart.applyOptions({
                watermark: {
                    visible: true,
                    fontSize: 24,
                    horzAlign: 'center',
                    vertAlign: 'center',
                    color: 'rgba(0, 0, 0, 0.3)',
                    text: 'Fiapp.pro',
                },
                grid: {
                    vertLines: {color: grey[100]},
                    horzLines: {color: grey[100]},
                },
            });

            const newSeries = chart.addCandlestickSeries({
                upColor: '#fff',
                downColor: grey[800],
                borderDownColor: grey[800],
                borderUpColor: grey[800],
                wickDownColor: grey[800],
                wickUpColor: grey[800],
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newSeries.setMarkers(trending ? [...trending] : []);
            newSeries.setData(price);
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [price, trending]
    );

    return (
        <Box height={props.height} width={'100%'}>
            {price && (
                <div
                    ref={chartContainerRef}
                    style={{
                        height: '100%',
                    }}
                />
            )}
        </Box>
    );
};

const NewKline = (props: any) => {
    return (
        <ChartComponent {...props}/>
    );

}

export default NewKline;