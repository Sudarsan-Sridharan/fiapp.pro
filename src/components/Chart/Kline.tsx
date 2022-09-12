import React, {useEffect, useState} from "react";
import TrendingChangeTable, {ITrendingChange, timeframes} from "@/components/Table/TrendingChange";
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
import {useNavigate} from "react-router-dom";
import {useUser} from "@/hooks/useUser";
import NewKline from "@/components/Chart/NewKline";

interface IKline {
    name?: string;
    trendingChangeData?: ITrendingChange[];
    riskWarningData?: IRiskWarning[];
    mode?: 'link' | 'switch';
    drawer?: boolean;
    height?: string;
}

interface IWatchCoin {
    coin_name: string
}

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

    const EMACalc = (mRange: number) => {
        const k = 2 / (mRange + 1);

        const mArray = klines?.data?.data?.coinKlines?.klines.map((item: { open_at: Date, open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; }) => [
            item.close_bid
        ])
        // first item is just the same as the first item in the input
        const emaArray = [...mArray[0]];

        // for the rest of the items, they are computed with the previous one
        for (let i = 1; i < mArray.length; i++) {
            emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
        }

        return emaArray
    }


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

    // const watchCoin = useWatchCoin()
    // const [isWatchCoin, setIsWatchCoin] = useState(false)
    //
    // const watchCoinData = new List<IWatchCoin>(watchCoin.data?.data)
    //     .Select(x => x.coin_name)
    //     .ToArray()


    const user = useUser()
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

                    {/*<Tooltip arrow title={user.value.token ? (isWatchCoin ? '取消自选' : '自选') : '登录后添加自选'}>*/}
                    {/*    <IconButton onClick={() => {*/}
                    {/*        user.value.token ?*/}
                    {/*            (isWatchCoin ? watchCoin.remove(name) : watchCoin.add(name))*/}
                    {/*            : nav('/login')*/}
                    {/*    }}>*/}
                    {/*        {user.value.token ?*/}
                    {/*            (isWatchCoin ? <BookmarkOutlined color={'secondary'}/> : <BookmarkBorderOutlined/>)*/}
                    {/*            : <BookmarkBorderOutlined/>}*/}
                    {/*    </IconButton>*/}
                    {/*</Tooltip>*/}

                    {volatility ? (
                        <Chip size={"small"}
                              label={`波动率：${volatility.data.length > 0 ? (volatility.data[0].value * 100).toFixed(3) : null}%`}/>
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
                </Stack>
            </Box>
            <Divider sx={{my: 1}}/>
            {klines ? (
                <Box>
                    <NewKline name={name}
                              height={props.height ?? `500px`}/>
                </Box>
            ) : <Skeleton sx={{height: `${props.height ?? `500px`}`}}></Skeleton>}
        </Paper>
    );
}

export default KlineChart;