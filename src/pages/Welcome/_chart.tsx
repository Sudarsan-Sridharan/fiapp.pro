import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import React from "react";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import {Box, Button, Container, Grid, Stack, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {List} from "linqts";
import {timejs} from "@/utils/time";
import KlineChart from "@/components/Chart/Kline";
import {grey} from "@mui/material/colors";

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
    open_time: Date
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

    const {data: coinsTC} = useSWR(`${domain}/TrendingChange?names=BTCUSDT,ETHUSDT,BNBUSDT,ATOMUSDT`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const {data: alt} = useSWR(`${domain}/TrendingChange?name=ALT-PERP&timeframe=4H&risk=1`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    const BTC: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
        .Where(x => x?.name === 'BTCUSDT')
        .Where(x => x?.time_frame !== "5M").ToList();

    const ETH: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
        .Where(x => x?.name === 'ETHUSDT').ToList();

    const BNB: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
        .Where(x => x?.name === 'BNBUSDT').ToList();

    const ATOM: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
        .Where(x => x?.name === 'ATOMUSDT').ToList();

    const btc = BTC.Concat(BTC).Union(BTC).Take(2).ToArray();
    const eth = ETH.Concat(ETH).Union(ETH).Take(2).ToArray();
    const bnb = BNB.Concat(BNB).Union(BNB).Take(2).ToArray();
    const atom = ATOM.Concat(ATOM).Union(ATOM).Take(2).ToArray();

    const coinsTCData = [{
        coin: btc,
        color: '#f1f5fe'
    },
        {
            coin: eth,
            color: '#faf8f3'
        },
        {
            coin: bnb,
            color: '#fcf0e8'
        },
        {
            coin: atom,
            color: '#f1fcf0'
        }
    ]
    return (
        <>
            <Box sx={{bgcolor: grey[200]}}>
                <Container maxWidth={'xl'} sx={{py: 5}}>
                    <Grid container spacing={2}>
                        {coinsTCData.map((data, index) => (
                            <Grid item xs={12} md={4} lg={3} key={index}>
                                <Box>
                                    <Box sx={{
                                        p: 2,
                                        bgcolor: data.color,
                                        height: '100%',
                                        border: '2px solid #fff',
                                        borderRadius: 1
                                    }}>
                                        {data.coin.map((item, index) => (
                                            <>
                                                {index === 0 && (
                                                    <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                                                        <Typography variant={'h6'} component={Link}
                                                                    to={`/d/${item.name}`}
                                                                    sx={{textDecoration: 'none', color: 'inherit'}}>
                                                            {item.name.split('USDT')[0]}
                                                        </Typography>

                                                        <Stack direction={'row'}>
                                                            <Button size={'small'}
                                                                    target={'_blank'}
                                                                    href={`https://www.binance.com/zh-CN/trade/${item.name.split('USDT')[0]}_USDT`}>
                                                                交易
                                                            </Button>
                                                            <Button size={'small'} color={'secondary'}
                                                                    component={Link}
                                                                    to={`/d/${item.name}`}
                                                                    variant={'contained'}>
                                                                量化图表
                                                            </Button>
                                                        </Stack>
                                                    </Box>)}

                                                {item.time_frame !== '5M' && (
                                                    <Tooltip title={'可靠度'} arrow key={index}>
                                                        <Typography variant={'subtitle1'}>
                                                            <>
                                                                {item.time_frame} - {item.current_trending === 1 ? '多' : item.current_trending === -1 ? '空' : '中立'} ({6 - item.risk})
                                                                - {timejs(new Date(item.open_time).toLocaleString()).fromNow()}
                                                            </>
                                                        </Typography>
                                                    </Tooltip>)}
                                            </>
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth={'xl'} sx={{mt: 2}}>
                {alt && (<Box sx={{bgcolor: grey[100], textAlign: 'left', p: 1}}>
                    <Typography variant={'body1'}>
                        山寨季：{alt.data[0].current_trending === 1 ? '开始' : alt.data[0].current_trending === -1 ? '结束' : '中立'} - {timejs(alt.data[0].open_time).fromNow()}
                    </Typography>
                </Box>)}
                <KlineChart name={name} trendingChangeData={trendingChange?.data}
                            riskWarningData={riskWarning?.data}/>
            </Container>
        </>
    )
}

export default Chart;