import useSWR from "swr";
import {domain, fetcher} from "@/ network/fether";

export const useWhaleWarningAPI = (take: number) => {
    const {data: whaleWarningData} = useSWR(`${domain}/WhaleWarning?take=${take}`, fetcher, {
        refreshInterval: 60 * 1000,
    })

    return {whaleWarningData}
}