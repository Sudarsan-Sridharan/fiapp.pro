import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import React from "react";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import KlineChart from "@/components/Chart/Kline";
import {Box, Grid, Paper, Stack, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {List} from "linqts";

const coins = [
    {name: 'BTCUSDT', displayName: 'BTC'},
    {name: 'ETHUSDT', displayName: 'ETH'}
]

const CoinSelect = [
    {title: 'BTC 比特币', name: 'BTCUSDT', subTitle: '30M - 空(5) 1H - 空(4)'},
    {title: 'ETH 以太坊', name: 'ETHUSDT', subTitle: '30M - 空(4) 1H - 空(2)'},
    {title: 'BNB 币安币', name: 'BNBUSDT', subTitle: '30M - 空(2) 1H - 空(2)'},
]

interface ITrendingChange {
    name: string;
    current_trending: number,
    risk: number,
    time_frame: string,
}

const Chart = () => {
    const APIQuery = useAPIQuery()
    const [name, setName] = React.useState('BTCUSDT')

    const conditions = {
        risk: '',
        timeframe: APIQuery.value.timeframe ?? '',
        currentTrending: '',
        name: name
    };
    const sendUrl = new URLSearchParams(conditions).toString();


    const {data: trendingChange} = useSWR(`${domain}/TrendingChange?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const {data: riskWarning} = useSWR(`${domain}/RiskWarning?${sendUrl}`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const {data: coinsTC} = useSWR(`${domain}/TrendingChange?names=BTCUSDT,ETHUSDT,BNBUSDT`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const BTC: List<ITrendingChange> = new List<ITrendingChange>(coinsTC)
        .Where(x => x?.name === 'BTCUSDT').ToList();

    const ETH: List<ITrendingChange> = new List<ITrendingChange>(coinsTC)
        .Where(x => x?.name === 'ETHUSDT').ToList();

    const BNB: List<ITrendingChange> = new List<ITrendingChange>(coinsTC)
        .Where(x => x?.name === 'BNBUSDT').ToList();

    const btc = BTC.Concat(BTC).Union(BTC).ToArray();
    const eth = ETH.Concat(ETH).Union(ETH).ToArray();
    const bnb = BNB.Concat(BNB).Union(BNB).ToArray();

    const coinsTCData = [btc, eth, bnb]
    return (
        <>
            <Stack spacing={1}>
                <Grid container spacing={2}>
                    {coinsTCData.map((data, index) => (
                        <Grid item xs={12} md={4} lg={3} key={index}>
                            <Paper variant={index === 0 ? 'elevation' : 'outlined'} sx={{height: '100%'}}>
                                <Box sx={{p: 2}}>
                                    {data.map((item, index) => (
                                        <>
                                            <Typography variant={'h6'} component={Link} to={`/d/${item.name}`}
                                                        sx={{textDecoration: 'none', color: 'inherit'}}>
                                                {index === 0 && item.name}
                                            </Typography>

                                            <Tooltip title={'可靠度'} arrow key={index}>
                                                <Typography variant={'subtitle1'}>
                                                    {item.time_frame} - {item.current_trending === 1 ? '多' : item.current_trending === -1 ? '空' : '中立'} ({item.risk})
                                                </Typography>
                                            </Tooltip>
                                        </>
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <KlineChart name={name} trendingChangeData={trendingChange} riskWarningData={riskWarning}/>
            </Stack>
        </>
    )
}

export default Chart;