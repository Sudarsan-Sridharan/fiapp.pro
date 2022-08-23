import {Coordinate, dispose, init} from "klinecharts";
import React, {useCallback, useEffect, useState} from "react";
import TrendingChangeTable, {ITrendingChange, timeframes} from "@/components/Table/TrendingChange";
import {List} from "linqts";
import {green, red} from "@mui/material/colors";
import RiskWarningTable, {IRiskWarning} from "@/components/Table/RiskWarning";
import {messageType} from "@/pages/Detail/Detail";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {Box, Button, Chip, Dialog, DialogContent, DialogTitle, Divider, Paper, Skeleton, Stack} from "@mui/material";
import Asynchronous from "@/components/Search/Asynchronous";
import AllTabTable from "@/components/Table/AllTab";

function annotationDrawExtend(ctx: CanvasRenderingContext2D, coordinate: Coordinate | any, text: string, color = '#2d6187') {
    ctx.font = '12px Roboto'
    ctx.fillStyle = color
    ctx.strokeStyle = '#2d6187'

    const textWidth = ctx.measureText(text).width
    const startX = coordinate.x
    let startY = coordinate.y + 6
    ctx.beginPath()
    ctx.moveTo(startX, startY + 48)
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

interface IKline {
    name?: string;
    trendingChangeData?: ITrendingChange[];
    riskWarningData?: IRiskWarning[];
    mode?: 'link' | 'switch';
    drawer?: boolean;
    height?: string;
}

const countDecimals = function (value: number) {
    const text = value.toString()
    // verify if number 0.000005 is represented as "5e-6"
    if (text.indexOf('e-') > -1) {
        const [base, trail] = text.split('e-');
        return parseInt(trail, 10);
    }
    // count decimals for number in representation like "0.123456"
    if (Math.floor(value) !== value) {
        return value.toString().split(".")[1].length || 0;
    }
    return 0;
};

const KlineChart: React.FC<IKline> = (props) => {
    const {trendingChangeData, riskWarningData} = props
    const APIQuery = useAPIQuery()

    const name = props.name ?? 'BTCUSDT'

    useEffect(() => {
        APIQuery.setValue({
            ...APIQuery.value,
            name
        })
    }, [name])

    const conditions = {
        timeFrame: APIQuery.value.timeframe ?? '',
        name
    };
    const sendUrl = new URLSearchParams(conditions).toString();

    const {data: klines} = useSWR(`${domain}/Coin?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 5,
    });

    const {data: volatility} = useSWR(`${domain}/Volatility?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60,
    })

    const chartTrendingChange = useCallback(() => {
        return new List<ITrendingChange>(trendingChangeData)
            .Select((x, index) => ({
                styles: {
                    offset: [index % 2 === 0 ? 50 : 80, 0],
                    position: 'top',
                },
                point: {timestamp: new Date(x.open_time).getTime(), value: x.open_price},
                drawExtend: (params: any) => {
                    const {ctx, coordinate} = params
                    annotationDrawExtend(ctx, coordinate,
                        `${x.current_trending === 1 ? '趋势多' : x.current_trending === 0 ? '趋势中立' : '趋势空'} \n 可靠度${6 - x.risk}`,
                        x.current_trending === 1 ? green[500] : x.current_trending === 0 ? 'default' : red[500])
                },
            }))
            .ToArray()
    }, [trendingChangeData])

    const chartRiskWarning = useCallback(() => {
        return new List<IRiskWarning>(riskWarningData)
            .Select((x, index) => ({
                point: {timestamp: new Date(x.open_time).getTime(), value: x.open_price},
                styles: {
                    offset: [index % 2 === 0 ? -50 : -80, 0],
                    position: 'bottom',
                },
                drawExtend: (params: any) => {
                    const {ctx, point, coordinate, viewport, isActive, styles} = params
                    annotationDrawExtend(ctx, coordinate,
                        `${x.time_frame} - ${messageType[x.description_type as keyof typeof messageType]} \n 反转度${x.risk}`,
                        red[500])
                },
            }))
            .ToArray()
    }, [riskWarningData])

    useEffect(() => {
        if (klines && chartTrendingChange && chartRiskWarning) {
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
                        timestamp: new Date(item.open_at).getTime(),
                    }
                )
            )

            chart.setPriceVolumePrecision(countDecimals(newChartData.length > 0 ? newChartData[0].open : 0), 10)

            // Fill data
            chart.applyNewData(newChartData);

            // chart.createAnnotation([{
            //     point: {timestamp: 1657587600000, value: 0.4271},
            //     drawExtend: (params) => {
            //         const {ctx, coordinate} = params
            //         annotationDrawExtend(ctx, coordinate, '这是一个固定显示标记')
            //     },
            // }])

            chart.createAnnotation([...chartTrendingChange() ?? [], ...chartRiskWarning() ?? []])

            return () => {
                dispose('simple_chart');
            }
        }
    }, [klines, chartTrendingChange, chartRiskWarning]);

    const [tcDialogOpen, setTcDialogOpen] = useState(false)
    const [rwDialogOpen, setRwDialogOpen] = useState(false)
    return (
        <Paper variant={"outlined"} sx={{px: 1}}>
            <Box sx={{pt: 1}}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Asynchronous label={name}/>
                    {volatility ? (
                        <Chip size={"small"}
                              label={`波动率：${volatility.length > 0 ? (volatility[0].value * 100).toFixed(3) : null}%`}/>
                    ) : <Skeleton>
                        <Chip size={"small"} label={'波动率'}/>
                    </Skeleton>
                    }
                    <Box>
                        {timeframes.map((item, index) => {
                            return (
                                <Button
                                    size={'small'}
                                    key={index}
                                    onClick={() => APIQuery.setValue({
                                        ...APIQuery.value,
                                        timeframe: item,
                                    })}
                                    variant={item === APIQuery.value.timeframe ? 'contained' : 'text'}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                    </Box>

                    <Stack spacing={1} direction={"row"} alignItems={"center"} sx={{
                        '& .MuiButtonBase-root': {
                            color: 'inherit',
                        }
                    }}>


                        {props.drawer && (
                            <>
                                <Box>
                                    <Button onClick={() => setTcDialogOpen(true)}>
                                        趋势转换
                                    </Button>
                                    <Dialog open={tcDialogOpen} onClose={() => setTcDialogOpen(false)} maxWidth={"xl"}
                                            fullWidth>
                                        <DialogTitle>{name} 趋势转换 - {APIQuery.value.timeframe}</DialogTitle>
                                        <DialogContent>
                                            <TrendingChangeTable/>
                                        </DialogContent>
                                    </Dialog>
                                </Box>
                                <Box>
                                    <Button onClick={() => setRwDialogOpen(true)}>
                                        风险预警
                                    </Button>
                                    <Dialog open={rwDialogOpen} onClose={() => setRwDialogOpen(false)} maxWidth={"xl"}
                                            fullWidth>
                                        <DialogTitle>{name} 风险预警 - {APIQuery.value.timeframe}</DialogTitle>
                                        <DialogContent>
                                            <RiskWarningTable/>
                                        </DialogContent>
                                    </Dialog>
                                </Box>
                            </>
                        )}
                    </Stack>

                    <Box display={'none'}>
                        <AllTabTable/>
                    </Box>
                </Stack>
            </Box>
            <Divider sx={{my: 1}}/>
            {klines ? (
                <Box>
                    <div id="simple_chart" style={{height: props.height ?? 600}}/>
                </Box>
            ) : <Skeleton sx={{height: `${props.height ?? `600px`}`}}></Skeleton>}
        </Paper>
    );
}

export default KlineChart;