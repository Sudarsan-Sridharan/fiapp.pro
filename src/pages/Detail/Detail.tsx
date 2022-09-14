import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Meta from '@/components/Meta';
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {
    Divider,
    Grid,
    List as MList,
    ListItem,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {domain, fetcher} from "@/ network/fether";
import useSWR from "swr";
import Kline from "@/components/Chart/Kline";

interface IKline {
    open_bid: number;
    close_bid: number;
    highest_bid: number;
    lowest_bid: number;
    open_at: Date
}

export const messageType = {
    4000: "到达前高关口位",

    5000: "RiskWarning",
    5010: "到达 ema 关口位",
    5011: "ema50",
    5012: "ema100",
    5013: "ema200",
    5020: "布林带突破",
    5021: "布林带上突破",
    5022: "布林带下突破",
    5030: "高低点预警",
    5031: "前高",
    5032: "前低",

    8000: "TrendingChange",
    8010: "ema 完全多空头排列",
    8020: "ema50 + ema100 多空头排列，并且价格在 ema200 徘徊一段时间，中风险趋势检测",
    8030: "价格只突破 ema200 且徘徊一段时间，高风险快速趋势转换检测",
}


const Detail = () => {
    let {name} = useParams();
    const APIQuery = useAPIQuery()
    name = name as string

    const conditions = {
        risk: APIQuery.value.risk !== 0 ? (APIQuery.value.risk?.toString() ?? '') : '',
        timeframe: APIQuery.value.timeframe ?? '',
        currentTrending: APIQuery.value.currentTrending ?? '',
        name: name ?? ''
    };

    const sendUrl = new URLSearchParams(conditions).toString();

    const {data: coinList} = useSWR(`${domain}/Coin`, fetcher, {
        refreshInterval: 1000 * 60,
    })

    //
    // const watchCoin = useWatchCoin()
    const nav = useNavigate()

    useEffect(() => {
        nav({
            search: `?timeframe=${APIQuery.value.timeframe}`
        })
    }, [APIQuery.value.timeframe, name])

    return (
        <>
            <Meta title={name}/>

            <Grid container sx={{pt: 2}}>
                <Grid item xs={12} md={8} xl={10}>
                    <Kline name={name}
                           height={'calc(100vh - 180px)'}/>
                </Grid>

                <Grid item xs={12} md={4} xl={2}>
                    <Paper variant={"outlined"} sx={{height: 'calc(100vh - 180px)', overflow: 'auto'}}>
                        <MList dense>
                            {/*<ListItem>*/}
                            {/*    <ListItemText>*/}
                            {/*        自选*/}
                            {/*    </ListItemText>*/}
                            {/*</ListItem>*/}
                            {/*<Divider/>*/}
                            {/*<TableContainer>*/}
                            {/*    <Table size="small">*/}
                            {/*        <TableHead>*/}
                            {/*            <TableRow>*/}
                            {/*                <TableCell>商品代码</TableCell>*/}
                            {/*                /!*<TableCell>30M</TableCell>*!/*/}
                            {/*                /!*<TableCell>1H</TableCell>*!/*/}
                            {/*            </TableRow>*/}
                            {/*        </TableHead>*/}
                            {/*        <TableBody sx={{*/}
                            {/*            '& .MuiTableRow-root:hover': {*/}
                            {/*                backgroundColor: '#f5f5f5',*/}
                            {/*            },*/}
                            {/*        }}>*/}
                            {/*            {watchCoin && watchCoin?.data?.data.map((item: { coin_name: string }, i: number) => (*/}
                            {/*                <>*/}
                            {/*                    <TableRow key={i} sx={{*/}
                            {/*                        borderLeft: item.coin_name === name ? '1px solid blue' : 'none',*/}
                            {/*                        backgroundColor: item.coin_name === name ? '#f5f5f5' : 'none',*/}
                            {/*                    }}>*/}
                            {/*                        <TableCell component="th" scope="row">*/}
                            {/*                            <Typography variant={'body2'} component={Link}*/}
                            {/*                                        to={`/d/${item.coin_name}`}*/}
                            {/*                                        sx={{textDecoration: 'none', color: 'inherit'}}>*/}
                            {/*                                {item.coin_name}*/}
                            {/*                            </Typography>*/}
                            {/*                        </TableCell>*/}
                            {/*                    </TableRow>*/}
                            {/*                    <Divider/>*/}
                            {/*                </>*/}
                            {/*            ))}*/}
                            {/*        </TableBody>*/}
                            {/*    </Table>*/}
                            {/*</TableContainer>*/}
                            {/*<Divider/>*/}

                            <ListItem>
                                <ListItemText>
                                    市场一览
                                </ListItemText>
                            </ListItem>
                            <Divider/>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>商品代码</TableCell>
                                            {/*<TableCell>30M</TableCell>*/}
                                            {/*<TableCell>1H</TableCell>*/}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{
                                        '& .MuiTableRow-root:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}>
                                        {coinList && coinList?.data.data.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; trending_change: any[]; }, i: React.Key | null | undefined) => (
                                            <>
                                                <TableRow key={i} sx={{
                                                    borderLeft: item.name === name ? '1px solid blue' : 'none',
                                                    backgroundColor: item.name === name ? '#f5f5f5' : 'none',
                                                }}>
                                                    <TableCell component="th" scope="row">
                                                        <Typography variant={'body2'} component={Link}
                                                                    to={`/d/${item.name}`}
                                                                    sx={{textDecoration: 'none', color: 'inherit'}}>
                                                            {item.name}
                                                        </Typography>
                                                    </TableCell>
                                                    {/*<TableCell>*/}
                                                    {/*    {*/}
                                                    {/*        item.trending_change.sort((item) => item.open_time).map((trending: { time_frame: string; current_trending: number; risk: any; }, i: any) => (*/}
                                                    {/*            trending.time_frame === '30M' && `${trending.current_trending === 1 ? '多' : trending.current_trending === -1 ? '空' : '中立'}(${6 - trending.risk})`*/}
                                                    {/*        ))*/}
                                                    {/*    }*/}
                                                    {/*</TableCell>*/}
                                                    {/*<TableCell>*/}
                                                    {/*    {*/}
                                                    {/*        item.trending_change.sort((item) => item.open_time).map((trending: { time_frame: string; current_trending: number; risk: any; }, i: any) => (*/}
                                                    {/*            trending.time_frame === '1H' && `${trending.current_trending === 1 ? '多' : trending.current_trending === -1 ? '空' : '中立'}(${6 - trending.risk})`*/}
                                                    {/*        ))*/}
                                                    {/*    }*/}
                                                    {/*</TableCell>*/}
                                                </TableRow>
                                                <Divider/>
                                            </>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MList>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};


export default Detail;

