import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Skeleton, useMediaQuery } from '@mui/material';

import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import NewKline from '@/components/Chart/NewKline';
import { useAPIQuery } from '@/hooks/useAPIQuery';
import { useUser } from '@/hooks/useUser';
import KlineChartHeader from '@/components/Chart/KlineChartHeader';

interface IKline {
  name?: string;
  mode?: 'link' | 'switch';
  drawer?: boolean;
  height?: string;
}

interface IWatchCoin {
  coin_name: string;
}

const KlineChart: React.FC<IKline> = (props) => {
  const APIQuery = useAPIQuery();

  const name = props.name ?? 'BTCUSDT';

  useEffect(() => {
    APIQuery.setValue({
      ...APIQuery.value,
      name,
    });
  }, [name]);

  const conditions = {
    timeFrame: APIQuery.value.timeframe ?? '',
    name,
  };
  const sendUrl = new URLSearchParams(conditions).toString();

  const { data: klines } = useSWR<any>(`${domain}/Coin?${sendUrl}`, fetcher, {
    refreshInterval: 1000 * 60 * 5,
  });

  const { data: volatility } = useSWR<any>(`${domain}/Volatility?${sendUrl}`, fetcher, {
    refreshInterval: 1000 * 60,
  });

  // const EMACalc = (mRange: number) => {
  //     const k = 2 / (mRange + 1);
  //
  //     const mArray = klines?.data?.data?.coinKlines?.klines.map((item: { open_at: Date, open_bid: number; close_bid: number; highest_bid: number; lowest_bid: number; }) => [
  //         item.close_bid
  //     ])
  //     // first item is just the same as the first item in the input
  //     const emaArray = [...mArray[0]];
  //
  //     // for the rest of the items, they are computed with the previous one
  //     for (let i = 1; i < mArray.length; i++) {
  //         emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  //     }
  //
  //     return emaArray
  // }

  const mdBreakDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isWhale = props.name === 'BTCUSDSHORTS' || props.name === 'BTCUSDLONGS';

  const switchWhaleName = props.name === 'BTCUSDSHORTS' ? 'BTCUSDLONGS' : 'BTCUSDSHORTS';
  const nav = useNavigate();
  useEffect(() => {
    const timeframe = isWhale ? '5M' : APIQuery.value.timeframe;
    APIQuery.setValue({
      ...APIQuery.value,
      timeframe: timeframe,
    });
  }, [isWhale]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    APIQuery.setValue({
      ...APIQuery.value,
      timeframe: searchParams.get('timeframe') ?? '30M',
    });
  }, [searchParams]);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000);
    }
  }, [copied]);

  const isChartPage = useMatch('/chart/:name');

  const user = useUser();
  return (
    <>
      {!isChartPage ? <Box>
        <KlineChartHeader coin={props.name ?? ''}
                          trending={klines?.data?.data?.meta?.trending_change[0]?.current_trending} />
      </Box> : <></>}
      {klines ? (
        <Box>
          <NewKline klines={klines} name={name} height={props.height ?? `500px`} />
        </Box>
      ) : (
        <Skeleton sx={{ height: `${props.height ?? `500px`}` }}></Skeleton>
      )}
    </>
  );
};

export default KlineChart;