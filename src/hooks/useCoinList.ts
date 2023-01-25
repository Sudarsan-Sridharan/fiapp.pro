import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';
import { domain, fetcher } from '@/ network/fether';
import { useAPIQuery } from '@/hooks/useAPIQuery';

export interface ICoinList {
  coin_realtime_price?: string;
  exchange?: string,
  name?: string,
  trending_change?: Array<{
    current_trending?: number,
    open_price?: number,
    open_time?: string,
    time_frame?: string,
  }>,
}

export const CoinListAtom = atom<ICoinList[]>({
  key: 'CoinListAtom',
  default: [
    {
      coin_realtime_price: '',
      exchange: '',
      name: '',
      trending_change: [],
    },
  ],
});
export const useCoinList = () => {
  const [value, setValue] = useRecoilState<ICoinList[]>(CoinListAtom);
  const APIQuery = useAPIQuery();

  const { data: coin } = useSWR<any>(`${domain}/Coin?timeframe=${APIQuery.value.timeframe}`, fetcher, {
    refreshInterval: 1000 * 10,
  });

  const coinData = coin?.data.data ?? [];

  if (coinData.length > 0) {
    setValue(coinData);
  }

  const realtimePrice = (name: string) => {
    const coin = value.find((coin) => coin.name === name);
    return coin?.coin_realtime_price ?? '';
  };

  return {
    value,
    setValue,
    realtimePrice,
  };
};