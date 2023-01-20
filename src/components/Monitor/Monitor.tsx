import React from 'react';
import useSWR from 'swr';
import { domain, fetcher } from '@/ network/fether';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { messageType } from '@/pages/Detail/Detail';
import { green } from '@mui/material/colors';
import { useAPIQuery } from '@/hooks/useAPIQuery';
import { timejs } from '@/utils/time';
import { TimeframeQuery } from '@/components/Table/Query';

const Monitor = () => {
  const APIQuery = useAPIQuery();

  const { data: coin } = useSWR<any>(`${domain}/Coin?timeframe=${APIQuery.value.timeframe}`, fetcher, {
    refreshInterval: 1000 * 60,
  });
  const coinData = coin?.data.data;
  const nav = useNavigate();

  return (
    <>
      <TimeframeQuery />
      <Box sx={{ overflowY: 'scroll', maxHeight: '500px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>标的名称</TableCell>
                <TableCell align='left'>方向</TableCell>
                <TableCell align='left'>风险（六小时内）</TableCell>
                <TableCell align='left'>交易所</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{
              '& .MuiTableCell-root': { borderBottom: 'solid 1px #e0e0e0' },
              '& .MuiTableRow-root:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}>
              {coinData ? coinData.map((row: any) => (
                <TableRow
                  key={row.name}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='left' sx={{
                    zIndex: 2,
                    color: 'white',
                    bgcolor: row.trending_change[0]?.current_trending.current_trending === 1 ? green[500] : '',
                  }}>{row.trending_change[0]?.current_trending.current_trending === 1 ? '多' : row.trending_change[0]?.current_trending.current_trending === 0 ? '' : '空'}
                    - {timejs(row.trending_change[0]?.open_time).fromNow()}
                  </TableCell>
                  <TableCell
                    align='left'>{messageType[row.risk_warning[0]?.description_type as keyof typeof messageType]}</TableCell>
                  <TableCell align='left'>
                    <Chip
                      size={'small'}
                      onClick={() => window.open(`https://www.binance.com/zh-CN/trade/${row.name.split('USDT')[0]}_USDT?ref=167714863`, '_blank')}
                      avatar={<Avatar alt='Natacha'
                                      src={row.exchange === 'binance' ? 'https://s3-symbol-logo.tradingview.com/provider/binance.svg' : 'https://s3-symbol-logo.tradingview.com/provider/bitfinex.svg'} />}
                      label={row.exchange.toUpperCase()}
                      variant='outlined'
                    />
                    <Button sx={{ ml: 1 }}
                            onClick={() => nav(`/d/${row.name}?timeframe=${APIQuery.value.timeframe}`)}>图表</Button>
                  </TableCell>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Monitor;