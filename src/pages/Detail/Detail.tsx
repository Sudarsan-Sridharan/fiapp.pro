import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Box, ButtonGroup, Chip, Container, Stack, Toolbar} from '@mui/material';

import useSWR from 'swr';

import {domain, fetcher} from '@/ network/fether';
import Meta from '@/components/Meta';
import Button from "@mui/material/Button";
import Asynchronous from "@/components/Search/Asynchronous";
import {green, red} from "@mui/material/colors";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {ITrendingChange, timeframes, trendingChangeAtom} from "@/components/Table/TrendingChange";
import TradeButton from "@/components/Market/TradeButton";
import {List} from "linqts";
import {useRecoilState} from "recoil";
import AllTabTable from "@/components/Table/AllTab";
import {Coordinate, dispose, init} from "klinecharts";

interface IKline {
    open_bid: number;
    close_bid: number;
    highest_bid: number;
    lowest_bid: number;
    open_at: Date
}

const Detail = () => {
    let {name} = useParams();
    const symbol = `${name?.split('-')[0]}${name?.split('-')[1]}${
        name && name?.split('-')?.length > 1 && name?.split('-')[2] === 'SWAP' && 'PERP'
    }`;

    const APIQuery = useAPIQuery()

    name = name as string

    const conditions = {
        timeFrame: APIQuery.value.timeframe ?? '',
        name
    };
    const sendUrl = new URLSearchParams(conditions).toString();


    const {data: klines} = useSWR(`${domain}/Coin?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 5,
    });

    const [trendingChangeData, setTrendingChangeData] = useRecoilState<ITrendingChange[]>(trendingChangeAtom);

    const chartTrendingChange = new List<ITrendingChange>(trendingChangeData)
        .Select(x => ({
            name: `${x.current_trending === 1 ? '趋势多' : x.current_trending === 0 ? '趋势中立' : '趋势空'} \n 风险${x.risk}`,
            coord: [x.open_time?.toLocaleString(), x.open_price],
            value: x.open_price,
            itemStyle: {
                color: x.current_trending === 1 ? green[500] : x.current_trending === 0 ? '#fff' : red[500],
            }
        }))
        .ToArray()

    const options = {
        grid: {top: 8, right: 8, bottom: 24, left: 45},
        xAxis: {
            type: 'category',
            data: klines?.data?.coinKlines?.klines?.map((item: { open_at: { toLocaleString: () => any; }; }) => item.open_at.toLocaleString()),
        },
        yAxis: {
            type: 'value',
            scale: true,
        },
        series: [
            {
                name: `${name} - ${APIQuery.value.timeframe}`,
                data: klines?.data?.coinKlines?.klines.map((item: { open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; }) => [item.open_bid, item.close_bid, item.lowest_bid, item.highest_bid]),
                type: 'candlestick',
                smooth: true,
                itemStyle: {
                    color: green[500],
                    color0: red[500],
                    borderWidth: 0
                },
                markPoint: {
                    symbolSize: 100,
                    label: {
                        formatter: function (param: any) {
                            return param.name;
                        }
                    },
                    data: [
                        ...chartTrendingChange
                    ],
                    tooltip: {
                        formatter: function (param: { name: string; data: { coord: any; }; }) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
            },
        ],
        dataZoom: [
            {
                type: 'inside',
                start: 90,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                top: '90%',
                start: 90,
                end: 100
            }
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    function annotationDrawExtend(ctx: CanvasRenderingContext2D, coordinate: Coordinate | any, text: string) {
        ctx.font = '12px Roboto'
        ctx.fillStyle = '#2d6187'
        ctx.strokeStyle = '#2d6187'

        const textWidth = ctx.measureText(text).width
        const startX = coordinate.x
        let startY = coordinate.y + 6
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        startY += 5
        ctx.lineTo(startX - 4, startY)
        ctx.lineTo(startX + 4, startY)
        ctx.closePath()
        ctx.fill()

        const rectX = startX - textWidth / 2 - 6
        const rectY = startY
        const rectWidth = textWidth + 12
        const rectHeight = 28
        const r = 2
        ctx.beginPath()
        ctx.moveTo(rectX + r, rectY)
        ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, r)
        ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, r)
        ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, r)
        ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, r)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = '#fff'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(text, startX, startY + 14)
    }


    useEffect(() => {
        if (klines) {
            // Init chart
            const chart = init('simple_chart');

            chart.overrideTechnicalIndicator({
                name: 'EMA',
                shortName: 'EMA',
                calcParams: [50, 100, 200],
            })

            chart.createTechnicalIndicator('EMA', true, {id: 'candle_pane'});

            const newChartData = klines?.data?.coinKlines?.klines.map((item: { open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; open_at: Date }) =>
                (
                    {
                        open: item.open_bid,
                        close: item.close_bid,
                        low: item.lowest_bid,
                        high: item.highest_bid,
                        time: new Date(item.open_at).getTime(),
                    }
                )
            )


            // Fill data
            chart.applyNewData(newChartData);

            // chart.createAnnotation([{
            //     point: {timestamp: 1657587600000, value: 0.4271},
            //     drawExtend: (params) => {
            //         const {ctx, coordinate} = params
            //         annotationDrawExtend(ctx, coordinate, '这是一个固定显示标记')
            //     },
            // }])

            chart.createAnnotation([{
                point: {timestamp: newChartData[newChartData.length - 10].timestamp},
                styles: {
                    offset: [0, 20],
                    position: 'top',
                    symbol: {
                        type: 'circle',
                    }
                },
            }])

            return () => {
                dispose('simple_chart');
            }
        }
    }, [klines]);


    return (
        <>
            <Meta title={name}/>

            <Toolbar/>

            <Box px={2}>
                <Stack spacing={2}>
                    <Chip label={name} sx={{width: '250px'}}/>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Asynchronous/>

                        <TradeButton name={name}/>
                    </Box>

                    <ButtonGroup variant="outlined">
                        {timeframes.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    onClick={() => APIQuery.setValue({
                                        timeframe: item
                                    })}
                                    variant={item === APIQuery.value.timeframe ? 'contained' : 'outlined'}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                    </ButtonGroup>

                    {klines ? (
                        <>
                            <div id="simple_chart" style={{height: 600}}/>
                        </>
                    ) : <></>}

                    {/*<EChartsReact option={options} style={{height: '300px'}}/>*/}
                </Stack>
            </Box>

            <Container maxWidth={'xl'} sx={{mt: 2}}>
                <AllTabTable/>
            </Container>
        </>
    );
};

export default Detail;

