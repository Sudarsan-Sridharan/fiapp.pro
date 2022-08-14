import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import React from "react";
import {useAPIQuery} from "@/hooks/useAPIQuery";
import KlineChart from "@/components/Chart/Kline";
import {Stack} from "@mui/material";

const coins = [
    {name: 'BTCUSDT', displayName: 'BTC'},
    {name: 'ETHUSDT', displayName: 'ETH'}
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
                {/*<ButtonGroup variant="outlined" color="primary" size="small">*/}
                {/*    {coins.map(item => (*/}
                {/*        <Button variant={item.name === name ? 'contained' : 'outlined'} key={item.name}*/}
                {/*                onClick={() => setName(item.name)}>{item.displayName}</Button>*/}
                {/*    ))}*/}
                {/*</ButtonGroup>*/}

                <KlineChart name={name} trendingChangeData={trendingChange} riskWarningData={riskWarning}/>
            </Stack>
        </>
    )
}

export default Chart;