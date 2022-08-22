import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import React from "react";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import KlineChart from "@/components/Chart/Kline";
import {Box, Grid, Paper, Stack, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const coins = [
    {name: 'BTCUSDT', displayName: 'BTC'},
    {name: 'ETHUSDT', displayName: 'ETH'}
]

const CoinSelect = [
    {title: 'BTC 比特币', name: 'BTCUSDT', subTitle: '30M - 空(5) 1H - 空(4)'},
    {title: 'ETH 以太坊', name: 'ETHUSDT', subTitle: '30M - 空(4) 1H - 空(2)'},
    {title: 'BNB 币安币', name: 'BNBUSDT', subTitle: '30M - 空(2) 1H - 空(2)'},
]

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

    return (
        <>
            <Stack spacing={1}>
                <Grid container spacing={2}>
                    {CoinSelect.map((item, index) => (
                        <Grid item xs={12} md={4} lg={3} key={index}>
                            <Paper variant={index === 0 ? 'elevation' : 'outlined'}>
                                <Box sx={{p: 2}}>
                                    <Typography variant={'h6'} component={Link} to={`/d/${item.name}`}
                                                sx={{textDecoration: 'none', color: 'inherit'}}>
                                        {item.title}
                                    </Typography>

                                    <Tooltip title={'可靠度'} arrow>
                                        <Typography variant={'subtitle1'}>
                                            {item.subTitle}
                                        </Typography>
                                    </Tooltip>
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