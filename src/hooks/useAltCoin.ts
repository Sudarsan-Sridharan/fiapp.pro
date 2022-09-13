import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";
import {useEffect, useState} from "react";

interface IAltCoin {
    current_trending: number,
    open_time: Date
}

const useAltCoin = () => {
    const [data, setData] = useState<IAltCoin>()

    const {data: altCoinData} = useSWR(`${domain}/TrendingChange?name=ALT-PERP&timeframe=4H&risk=1`, fetcher, {
        refreshInterval: 1000 * 60 * 1,
    });

    useEffect(() => {
        if (altCoinData) {
            setData(altCoinData?.data[0])
        }
    }, [altCoinData])

    return {
        data,
        currentTrending: data?.current_trending
    }
}

export default useAltCoin