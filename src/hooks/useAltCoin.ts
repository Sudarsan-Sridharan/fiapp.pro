import { useEffect, useState } from 'react';

import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import { timejs } from '@/utils/time';

interface IAltCoin {
  current_trending: number;
  open_time: Date;
}

const useAltCoin = () => {
  const [data, setData] = useState<IAltCoin>();

  const { data: altCoinData } = useSWR<any>(
    `${domain}/TrendingChange?name=ALT-PERP&timeframe=4H&risk=1`,
    fetcher,
    {
      refreshInterval: 1000 * 60,
    },
  );

  useEffect(() => {
    if (altCoinData) {
      setData(altCoinData?.data[0]);
    }
  }, [altCoinData]);

  return {
    data,
    currentTrending: data?.current_trending,
    fromNow: timejs(new Date(data?.open_time ?? '').toLocaleString()).fromNow(),
  };
};

export default useAltCoin;