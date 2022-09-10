import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";

export const useWatchCoin = () => {
    const {data} = useSWR(`${domain}/WatchCoin`, fetcher, {
        refreshInterval: 1000
    })

    return {data}
}