import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ShareOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  useMediaQuery,
} from '@mui/material';

import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import NewKline from '@/components/Chart/NewKline';
import Asynchronous from '@/components/Search/Asynchronous';
import { timeframes } from '@/components/Table/TrendingChange';
import { useAPIQuery } from '@/hooks/useAPIQuery';
import { useUser } from '@/hooks/useUser';

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

  // const watchCoin = useWatchCoin()
  // const [isWatchCoin, setIsWatchCoin] = useState(false)
  //
  // const watchCoinData = new List<IWatchCoin>(watchCoin.data?.data)
  //     .Select(x => x.coin_name)
  //     .ToArray()

  const user = useUser();

  return (
    <Paper variant={'outlined'} sx={{ px: 1 }}>
      <Box sx={{ pt: 1 }}>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Asynchronous label={name} />
          {isWhale && (
            <Button variant={'text'} onClick={() => nav(`/d/${switchWhaleName}`)}>
              {switchWhaleName === 'BTCUSDSHORTS' ? '空头仓位' : '多头仓位'}
            </Button>
          )}

          {/*<Tooltip arrow title={user.value.token ? (isWatchCoin ? '取消自选' : '自选') : '登录后添加自选'}>*/}
          {/*    <IconButton onClick={() => {*/}
          {/*        user.value.token ?*/}
          {/*            (isWatchCoin ? watchCoin.remove(name) : watchCoin.add(name))*/}
          {/*            : nav('/login')*/}
          {/*    }}>*/}
          {/*        {user.value.token ?*/}
          {/*            (isWatchCoin ? <BookmarkOutlined color={'secondary'}/> : <BookmarkBorderOutlined/>)*/}
          {/*            : <BookmarkBorderOutlined/>}*/}
          {/*    </IconButton>*/}
          {/*</Tooltip>*/}

          {volatility ? (
            <Chip
              size={'small'}
              label={`波动率：${
                volatility.data.length > 0 ? (volatility.data[0].value * 100).toFixed(3) : null
              }%`}
            />
          ) : (
            <Skeleton>
              <Chip size={'small'} label={'波动率'} />
            </Skeleton>
          )}
          <Box>
            {isWhale
              ? ['5M', '30M', '1H'].map((item, index) => {
                  return (
                    <Button
                      size={'small'}
                      key={index}
                      onClick={() =>
                        APIQuery.setValue({
                          ...APIQuery.value,
                          timeframe: item,
                        })
                      }
                      variant={item === APIQuery.value.timeframe ? 'contained' : 'text'}
                    >
                      {item}
                    </Button>
                  );
                })
              : timeframes.map((item, index) => {
                  return (
                    <Button
                      size={'small'}
                      key={index}
                      onClick={() =>
                        APIQuery.setValue({
                          ...APIQuery.value,
                          timeframe: item,
                        })
                      }
                      variant={item === APIQuery.value.timeframe ? 'contained' : 'text'}
                    >
                      {item}
                    </Button>
                  );
                })}
          </Box>

          <Box>
            <CopyToClipboard
              onCopy={() => setCopied(true)}
              text={`${window.location.href.split('?')[0]}?timeframe=${APIQuery.value.timeframe}`}
            >
              <Tooltip title={copied ? '链接已复制' : '分享链接'}>
                <IconButton size={'small'}>
                  <ShareOutlined fontSize={'small'} />
                </IconButton>
              </Tooltip>
            </CopyToClipboard>
          </Box>
        </Stack>
      </Box>
      <Divider sx={{ my: 1 }} />
      {klines ? (
        <Box>
          <NewKline name={name} height={props.height ?? `500px`} />
        </Box>
      ) : (
        <Skeleton sx={{ height: `${props.height ?? `500px`}` }}></Skeleton>
      )}
    </Paper>
  );
};

export default KlineChart;