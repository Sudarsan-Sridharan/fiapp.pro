import {Coordinate} from "klinecharts";
import React, {useEffect, useState} from "react";
import TrendingChangeTable, {ITrendingChange, timeframes} from "@/components/Table/TrendingChange";
import {List} from "linqts";
import {blue, green, grey, red} from "@mui/material/colors";
import RiskWarningTable, {IRiskWarning} from "@/components/Table/RiskWarning";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Paper,
    Skeleton,
    Stack,
    useMediaQuery
} from "@mui/material";
import Asynchronous from "@/components/Search/Asynchronous";
import AllTabTable from "@/components/Table/AllTab";
import {useNavigate} from "react-router-dom";
import EChartsReact from "echarts-for-react";
import {messageType} from "@/pages/Detail/Detail";

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

    const chartTrendingChange = new List<ITrendingChange>(trendingChangeData)
        .Select(x => ({
            name: `${x.current_trending === 1 ? '趋势转多' : x.current_trending === 0 ? '趋势中立' : '趋势转空'} \n 可靠度${x.risk}`,
            coord: [x.open_time?.toLocaleString(), x.open_price],
            value: x.open_price,
            itemStyle: {
                color: x.current_trending === 1 ? green[500] : x.current_trending === 0 ? '#fff' : red[500],
            }
        }))
        .ToArray()

    const chartRiskWarning = new List<IRiskWarning>(riskWarningData)
        .Select((x, index) => ({
            name: `${messageType[x.description_type as keyof typeof messageType]} \n 反转度${x.risk}`,
            coord: [x.open_time?.toLocaleString(), x.open_price],
            value: x.open_price,
            itemStyle: {
                color: red[500],
            }
        }))
        .ToArray()

    const options = klines ? {
        grid: {top: 8, right: 8, bottom: 24, left: 45},
        xAxis: {
            data: klines?.data?.coinKlines?.klines?.map((item: { open_at: { toLocaleString: () => any; }; }) => [item.open_at.toLocaleString()]),
        },
        yAxis: {
            type: 'value',
            scale: true,
        },
        tooltip: {
            show: false
        },
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //         type: 'cross'
        //     }
        // },
        series: [
            {
                name: `${name} - ${APIQuery.value.timeframe}`,
                data: klines?.data?.coinKlines?.klines.map((item: { open_at: Date, open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; }) => [
                    item.open_bid, item.close_bid, item.lowest_bid, item.highest_bid
                ]),
                type: 'candlestick',
                itemStyle: {
                    color: grey[200],
                    color0: grey[800],
                    borderWidth: 1,
                    borderColor: grey[800],
                    borderColor0: grey[800],
                },
                markPoint: {
                    symbolSize: 10,
                    symbolOffset: [0, '-100%'],
                    label: {
                        formatter: function (param: any) {
                            return param.name;
                        },
                        position: 'top',
                        fontSize: 14,
                        color: '#fff',
                        borderWidth: 0,
                        backgroundColor: blue[500],
                        padding: 2
                    },
                    data: [
                        ...chartTrendingChange,
                    ],
                },
            },
            {
                name: `${name} - ${APIQuery.value.timeframe}`,
                data: klines?.data?.coinKlines?.klines.map((item: { open_at: Date, open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; }) => [
                    item.open_bid, item.close_bid, item.lowest_bid, item.highest_bid
                ]),
                type: 'candlestick',
                itemStyle: {
                    color: grey[200],
                    color0: grey[800],
                    borderWidth: 1,
                    borderColor: grey[800],
                    borderColor0: grey[800],
                },
                markPoint: {
                    symbolSize: 10,
                    symbolOffset: [0, '100%'],
                    label: {
                        formatter: function (param: any) {
                            return param.name;
                        },
                        position: 'bottom',
                        fontSize: 14,
                        borderWidth: 1,
                        borderColor: '#000',
                        padding: 2
                    },
                    data: [
                        ...chartRiskWarning,
                    ],
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
                start: 80,
                end: 100
            }
        ],
    } : {};

    const [tcDialogOpen, setTcDialogOpen] = useState(false)
    const [rwDialogOpen, setRwDialogOpen] = useState(false)

    const mdBreakDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    const isWhale = props.name === "BTCUSDSHORTS" || props.name === "BTCUSDLONGS"

    const switchWhaleName = props.name === "BTCUSDSHORTS" ? "BTCUSDLONGS" : "BTCUSDSHORTS"

    useEffect(() => {
        APIQuery.setValue({
            ...APIQuery.value,
            timeframe: isWhale ? '5M' : '30M'
        })
    }, [isWhale])

    const nav = useNavigate()

    return (
        <Paper variant={"outlined"} sx={{px: 1}}>
            <Box sx={{pt: 1}}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Asynchronous label={name}/>
                    {isWhale && (
                        <Button variant={'text'} onClick={() => nav(`/d/${switchWhaleName}`)}>
                            {switchWhaleName === 'BTCUSDSHORTS' ? '空头仓位' : '多头仓位'}
                        </Button>
                    )}
                    {volatility ? (
                        <Chip size={"small"}
                              label={`波动率：${volatility.length > 0 ? (volatility[0].value * 100).toFixed(3) : null}%`}/>
                    ) : <Skeleton>
                        <Chip size={"small"} label={'波动率'}/>
                    </Skeleton>
                    }
                    <Box>
                        {isWhale ? (['5M', '30M', '1H'].map((item, index) => {
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
                            })) :
                            timeframes.map((item, index) => {
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
                            })
                        }
                    </Box>

                    <Stack spacing={1} direction={"row"} alignItems={"center"} sx={{
                        '& .MuiButtonBase-root': {
                            color: 'inherit',
                        }
                    }}>


                        {(props.drawer && !mdBreakDown) && (
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
                    <EChartsReact option={options} style={{height: props.height ?? 600}}/>
                </Box>
            ) : <Skeleton sx={{height: `${props.height ?? `600px`}`}}></Skeleton>}
        </Paper>
    );
}

export default KlineChart;