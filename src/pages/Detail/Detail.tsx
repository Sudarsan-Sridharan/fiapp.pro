import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Divider,
  Grid,
  List as MList,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import Kline from '@/components/Chart/Kline';
import Meta from '@/components/Meta';
import { useAPIQuery } from '@/hooks/useAPIQuery';
import { green, lightGreen } from '@mui/material/colors';

interface IKline {
  open_bid: number;
  close_bid: number;
  highest_bid: number;
  lowest_bid: number;
  open_at: Date;
}

export const messageType = {
  // 4000: '到达前高关口位',

  // 5000: 'RiskWarning',
  // 5010: '到达 ema 关口位',
  5011: 'ema50',
  5012: 'ema100',
  5013: 'ema200',
  // 5020: '布林带突破',
  5021: '布林带上突破',
  5022: '布林带下突破',
  // 5030: '高低点预警',
  5031: '前高',
  5032: '前低',

  // 8000: 'TrendingChange',
  // 8010: 'ema 完全多空头排列',
  // 8020: 'ema50 + ema100 多空头排列，并且价格在 ema200 徘徊一段时间，中风险趋势检测',
  // 8030: '价格只突破 ema200 且徘徊一段时间，高风险快速趋势转换检测',
};

const Detail = () => {
  let { name } = useParams();
  const APIQuery = useAPIQuery();
  name = name as string;

  const conditions = {
    risk: APIQuery.value.risk !== 0 ? APIQuery.value.risk?.toString() ?? '' : '',
    timeframe: APIQuery.value.timeframe ?? '',
    currentTrending: APIQuery.value.currentTrending ?? '',
    name: name ?? '',
  };

  const sendUrl = new URLSearchParams(conditions).toString();

  const { data: coinList } = useSWR<any>(`${domain}/Coin?timeframe=${APIQuery.value.timeframe}`, fetcher, {
    refreshInterval: 1000 * 60,
  });

  const viewportHeight = window.innerHeight;

  // const watchCoin = useWatchCoin()
  const nav = useNavigate();

  useEffect(() => {
    nav({
      search: `?timeframe=${APIQuery.value.timeframe}`,
    });
  }, [APIQuery.value.timeframe, name]);

  return (
    <>
      <Meta title={name} description={`${name} 的最新量化数据`} />

      <Grid container spacing={0}>
        <Grid item xs={12} md={8} xl={10}>
          <Kline name={name} height={`${(viewportHeight - 50).toString()}px`} />
        </Grid>

        <Grid item xs={12} md={4} xl={2}>
          <Paper variant={'outlined'} sx={{ height: '100vh', overflow: 'auto', borderRadius: 0 }}>
            <MList dense sx={{ pt: 0 }}>
              <ListItem sx={{ height: '32px' }}>
                <ListItemText>市场一览</ListItemText>
              </ListItem>
              <Divider />
              <TableContainer>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>商品代码</TableCell>
                      <TableCell>方向</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      '& .MuiTableRow-root:hover': {
                        backgroundColor: lightGreen[100],
                      },
                    }}
                  >
                    {coinList &&
                      coinList?.data.data.map(
                        (
                          item: {
                            name:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                              | React.ReactFragment
                              | null
                              | undefined;
                            trending_change: any[];
                          },
                          i: React.Key | null | undefined,
                        ) => (
                          <>
                            <TableRow
                              key={i}
                              sx={{
                                borderLeft: item.name === name ? '1px solid blue' : 'none',
                                backgroundColor: item.name === name ? '#f5f5f5' : 'none',
                                bgcolor: item?.trending_change[0]?.current_trending == 1 ? green[500] : '',
                              }}
                            >
                              <TableCell component='th' scope='row'>
                                <Typography
                                  variant={'body2'}
                                  component={Link}
                                  to={`/d/${item.name}?timeframe=${APIQuery.value.timeframe}`}
                                  sx={{
                                    textDecoration: 'none',
                                    color: item?.trending_change[0]?.current_trending == 1 ? 'white' : 'inherit',
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </TableCell>
                              <TableCell component='th' scope='row'>
                                <Typography
                                  variant={'body2'}
                                  sx={{
                                    textDecoration: 'none',
                                    color: item?.trending_change[0]?.current_trending == 1 ? 'white' : 'inherit',
                                  }}
                                >
                                  {
                                    item?.trending_change[0]?.current_trending === -1 ? '空' : '多'
                                  }
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <Divider />
                          </>
                        ),
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </MList>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Detail;