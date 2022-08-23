import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Meta from '@/components/Meta';
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {ITrendingChange, trendingChangeAtom} from "@/components/Table/TrendingChange";
import KlineChart from "@/components/Chart/Kline";
import {riskWarningAtom} from "@/components/Table/RiskWarning";
import {useRecoilState} from "recoil";
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
    5011: "到达均线 ema50 关口位",
    5012: "到达均线 ema100 关口位",
    5013: "到达均线 ema200 关口位",
    5020: "布林带突破",
    5021: "布林带上突破",
    5022: "布林带下突破",
    5030: "高低点预警",
    5031: "达到前高",
    5032: "达到前低",

    8000: "TrendingChange",
    8010: "ema 完全多空头排列",
    8020: "ema50 + ema100 多空头排列，并且价格在 ema200 徘徊一段时间，中风险趋势检测",
    8030: "价格只突破 ema200 且徘徊一段时间，高风险快速趋势转换检测",
}


const Detail = () => {
    let {name} = useParams();
    const APIQuery = useAPIQuery()
    name = name as string

    const [trendingChange, setTrendingChange] = useRecoilState<ITrendingChange[]>(trendingChangeAtom);
    const [riskWarning, setRiskWarning] = useRecoilState(riskWarningAtom);
    const {data: coinList} = useSWR(`${domain}/Coin`, fetcher, {
        refreshInterval: 1000 * 60,
    })

    return (
        <>
            <Meta title={name}/>

            <Grid container>
                <Grid item xs={12} md={8} xl={9}>
                    <KlineChart name={name} trendingChangeData={trendingChange} riskWarningData={riskWarning}
                                drawer={true}
                                height={'calc(100vh - 160px)'}/>
                </Grid>

                <Grid item xs={12} md={4} xl={3}>
                    <Paper variant={"outlined"} sx={{height: 'calc(100vh - 160px)', overflow: 'auto'}}>
                        <MList dense>
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
                                            <TableCell>30M</TableCell>
                                            <TableCell>1H</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{
                                        '& .MuiTableRow-root:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}>
                                        {coinList && coinList.data.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; trending_change: any[]; }, i: React.Key | null | undefined) => (
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
                                                    <TableCell>
                                                        {
                                                            item.trending_change.sort((item) => item.open_time).map((trending: { time_frame: string; current_trending: number; risk: any; }, i: any) => (
                                                                trending.time_frame === '30M' && `${trending.current_trending === 1 ? '多' : trending.current_trending === -1 ? '空' : '中立'}(${6 - trending.risk})`
                                                            ))
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            item.trending_change.sort((item) => item.open_time).map((trending: { time_frame: string; current_trending: number; risk: any; }, i: any) => (
                                                                trending.time_frame === '1H' && `${trending.current_trending === 1 ? '多' : trending.current_trending === -1 ? '空' : '中立'}(${6 - trending.risk})`
                                                            ))
                                                        }
                                                    </TableCell>
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

