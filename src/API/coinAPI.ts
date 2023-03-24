import {fetcher} from "../Network/Network";
import useSWR from "swr";

interface ILayout<T> {
    data: T
}


export interface ICoin {
    name: string;
    exchange: string;
    price: {
        open: number;
        name: string;
        volume: number;
        quoteVolume: number;
    };
    latestKline: {
        highest_bid: number;
        lowest_bid: number;
        open_bid: number;
        volume_bid: number;
    };
}


export const coinListAPI = (): ICoin[] | undefined => {
    const {data: coinList} = useSWR<ILayout<ICoin[]>>('/coin', fetcher, {
        refreshInterval: 1000 * 30
    })

    return coinList?.data
}

export type IKlineAPI = {
    name: string,
    timeframe: '30M' | '1H' | '4H' | '1D' | ''
}

interface IKlineList {
    open_at: Date,
    open_bid: number,
    highest_bid: number,
    lowest_bid: number,
    close_bid: number,
    volume_bid: number
}

export const klineAPI = (data: IKlineAPI) => {
    const {
        data: kline,
        isLoading
    } = useSWR<ILayout<IKlineList[]>>(`/kline?name=${data.name}&timeframe=${data.timeframe}`, fetcher, {
        refreshInterval: 1000 * 5
    })
    return {
        data: kline?.data,
        isLoading
    }
}


export const coinAPI = (data: IKlineAPI): ICoin | undefined => {
    const {data: coinList} = useSWR<ILayout<ICoin>>(`/coin?name=${data.name}&timeframe=${data.timeframe}`, fetcher, {
        refreshInterval: 1000 * 5
    })

    return coinList?.data
}

interface ISignal {
    id: string;
    created_at: string;
    name: string;
    timeframe: IKlineAPI['timeframe'];
    open_time: string;
    code: number;
    open_price: number;
    stop_price: number | null;
    profit_price: number | null;
    direction: number;
    risk: number;
}

export const signalAPI = (data: IKlineAPI): ISignal[] | undefined => {
    const {data: signalList} = useSWR<ILayout<ISignal[]>>(`/TradingSignal?name=${data?.name}&timeframe=${data?.timeframe}`, fetcher, {
        refreshInterval: 1000 * 5
    })

    return signalList?.data
}

interface ITrendChange {
    id: string;
    name: string;
    timeframe: IKlineAPI['timeframe'];
    open_price: number;
    open_time: Date;
    direction: number;
    risk: number;
    strategy_code: number;
    nameNavigation: any;
}

export const trendChangeAPI = (data: IKlineAPI): ITrendChange[] | undefined => {
    const {data: trendChangeList} = useSWR<ILayout<ITrendChange[]>>(`/TrendingChange?name=${data?.name}&timeframe=${data?.timeframe}`, fetcher, {
        refreshInterval: 1000 * 5
    })

    return trendChangeList?.data
}
