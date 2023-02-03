import useSWR from 'swr';
import { fetcher } from '@/ network/fether';

export interface ISignal {
  id: string;
  created_at: Date;
  name: string;
  timeframe: string;
  open_time: Date;
  open_price: number;
  stop_price: number;
  direction: boolean;
  risk: number;
  code: string;
}

const useSignal = () => {
  const { data } = useSWR<any>('/TradingSignal', fetcher, {
    refreshInterval: 1000 * 2,
  });

  const signal = data?.data as ISignal[];
  return {
    data: signal,
  };
};

export default useSignal;