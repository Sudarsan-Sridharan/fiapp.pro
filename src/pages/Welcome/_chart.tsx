import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Container, Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';

import { List } from 'linqts';
import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import KlineChart from '@/components/Chart/Kline';
import useAltCoin from '@/hooks/useAltCoin';
import { timejs } from '@/utils/time';

interface ITrendingChange {
  name: string;
  current_trending: number;
  risk: number;
  time_frame: string;
  open_time: Date;
}

const Chart = () => {
  const name = 'BTCUSDT';

  const { data: coinsTC } = useSWR<any>(
    `${domain}/TrendingChange?names=BTCUSDT,ETHUSDT,BNBUSDT,ATOMUSDT`,
    fetcher,
    {
      refreshInterval: 1000 * 60,
    },
  );

  const alt = useAltCoin();

  const BTC: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
    .Where((x) => x?.name === 'BTCUSDT')
    .Where((x) => x?.time_frame !== '5M')
    .ToList();

  const ETH: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
    .Where((x) => x?.name === 'ETHUSDT')
    .ToList();

  const BNB: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
    .Where((x) => x?.name === 'BNBUSDT')
    .ToList();

  const ATOM: List<ITrendingChange> = new List<ITrendingChange>(coinsTC?.data)
    .Where((x) => x?.name === 'ATOMUSDT')
    .ToList();

  const btc = BTC.Concat(BTC).Union(BTC).Take(2).ToArray();
  const eth = ETH.Concat(ETH).Union(ETH).Take(2).ToArray();
  const bnb = BNB.Concat(BNB).Union(BNB).Take(2).ToArray();
  const atom = ATOM.Concat(ATOM).Union(ATOM).Take(2).ToArray();

  const coinsTCData = [
    {
      coin: btc,
      color: '#f1f5fe',
    },
    {
      coin: eth,
      color: '#faf8f3',
    },
    {
      coin: bnb,
      color: '#fcf0e8',
    },
    {
      coin: atom,
      color: '#f1fcf0',
    },
  ];
  return (
    <>
      <Box sx={{ bgcolor: grey[200] }}>
        <Container maxWidth={'xl'} sx={{ py: 5 }}>
          <Grid container spacing={2}>
            {coinsTCData.map((data, index) => (
              <Grid item xs={12} md={4} lg={3} key={index}>
                <Box>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: data.color,
                      height: '100%',
                      border: '2px solid #fff',
                      borderRadius: 1,
                    }}
                  >
                    {data.coin.map((item, index) => (
                      <>
                        {index === 0 && (
                          <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                            <Typography
                              variant={'h6'}
                              component={Link}
                              to={`/d/${item.name}`}
                              sx={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {item.name.split('USDT')[0]}
                            </Typography>

                            <Stack direction={'row'}>
                              <Button
                                size={'small'}
                                target={'_blank'}
                                href={`https://www.binance.com/zh-CN/trade/${
                                  item.name.split('USDT')[0]
                                }_USDT`}
                              >
                                交易
                              </Button>
                              <Button
                                size={'small'}
                                color={'secondary'}
                                component={Link}
                                to={`/d/${item.name}`}
                                variant={'contained'}
                              >
                                量化图表
                              </Button>
                            </Stack>
                          </Box>
                        )}

                        {item.time_frame !== '5M' && (
                          <Tooltip title={'可靠度'} arrow key={index}>
                            <Typography variant={'subtitle1'}>
                              <>
                                {item.time_frame} -{' '}
                                {item.current_trending === 1
                                  ? '多'
                                  : item.current_trending === -1
                                  ? '空'
                                  : '中立'}{' '}
                                ({6 - item.risk}) -{' '}
                                {timejs(new Date(item.open_time).toLocaleString()).fromNow()}
                              </>
                            </Typography>
                          </Tooltip>
                        )}
                      </>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth={'xl'} sx={{ mt: 2 }}>
        {alt && (
          <Paper
            sx={{
              bgcolor: grey[100],
              color: alt.currentTrending === 1 ? green[800] : 'inherit',
              textAlign: 'left',
              p: 1,
            }}
            elevation={alt.currentTrending === 1 ? 1 : 0}
          >
            <Typography variant={'body1'}>
              山寨季：
              {alt.currentTrending === 1 ? '开始' : alt.currentTrending === -1 ? '结束' : '中立'} -{' '}
              {alt.fromNow}
            </Typography>
          </Paper>
        )}
        <KlineChart name={name} />
      </Container>
    </>
  );
};

export default Chart;