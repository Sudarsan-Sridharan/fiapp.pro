import {fetcher} from "../Network/Network";
import useSWR from "swr";

interface ICoinListLayout {
    data: ICoinList[]
}

interface ICoinList {
    name: string,
    price: string,
}


export const coinListAPI = (): ICoinList[] => {
    const {data: coinList} = useSWR<ICoinListLayout>('/coin', fetcher, {
        refreshInterval: 1000 * 30
    })

    return coinList?.data
}

export type IKlineAPI = {
    name: string,
    timeframe: '30M' | '1H' | '4H' | '1D'
}

interface IKlineList {
    open_at: Date,
    open_bid: number,
    highest_bid: number,
    lowest_bid: number,
    close_bid: number,
    volume_bid: number
}

interface IKlineAPiLayout {
    data: IKlineList[]
}

export const klineAPI = (data: IKlineAPI) => {
    const {data: kline} = useSWR<IKlineAPiLayout>(`/kline?name=${data.name}&timeframe=${data.timeframe}`, fetcher, {
        refreshInterval: 1000 * 5
    })
    return kline?.data
}

interface ICoinLayout {
    data: ICoin
}

interface ICoin {
    name: string;
    exchange: string;
    price: string;
    latestKline: {
        highest_bid: number;
        lowest_bid: number;
        open_bid: number;
        volume_bid: number;
    };
}


export const coinAPI = (data: IKlineAPI): ICoin => {
    const {data: coinList} = useSWR<ICoinLayout>(`/coin?name=${data.name}&timeframe=${data.timeframe}`, fetcher, {
        refreshInterval: 1000 * 30
    })

    return coinList?.data
}