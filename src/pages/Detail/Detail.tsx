import React from 'react';
import { useParams } from 'react-router-dom';
import { SymbolOverview } from 'react-ts-tradingview-widgets';

import { Box, Container, Rating, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import Meta from '@/components/Meta';
import { trendingChangeColumns } from '@/pages/Welcome/Welcome';

const tColumns: GridColDef[] = [
  { field: 'name', headerName: '名称', width: 200 },
  { field: 'consistentTime', headerName: '持续时间' },
  { field: 'forwardConsistentTime', headerName: '之前趋势持续时间', width: 200 },
  { field: 'tradeChange', headerName: '转换', width: 200 },
  { field: 'lastupdatedTime', headerName: '触发时间', width: 200 },
  {
    field: 'risk',
    headerName: '风险',
    width: 200,
    renderCell: (params) => <Rating value={params.row.risk} readOnly />,
  },
];

const tRows: GridRowsProp = [
  {
    id: 1,
    name: 'BTC-USDT',
    consistentTime: '4天',
    forwardConsistentTime: '67天',
    tradeChange: '空头 -> 多头',
    lastUpdatedTime: '2022/5/28 15:31',
    risk: 1,
  },
];

const Detail = () => {
  const { name } = useParams();
  const symbol = `${name?.split('-')[0]}${name?.split('-')[1]}${
    name && name?.split('-')?.length > 1 && name?.split('-')[2] === 'SWAP' && 'PERP'
  }`;

  const { data: trendingChane } = useSWR(`${domain}/trending-change/detail?name=${name}`, fetcher);

  return (
    <>
      <Meta title={name} />

      <Box maxHeight={'100%'}>
        {symbol && (
          <SymbolOverview
            chartOnly
            lineColor={'rgba(0,0,0,255)'}
            topColor={'rgba(0,0,0,0)'}
            bottomColor={'rgba(0,0,0,0)'}
            symbols={[[`${symbol}`]]}
            scaleMode={'Logarithmic'}
            chartType={'candlesticks'}
            width={'100%'}
            locale={'zh_CN'}
          />
        )}
      </Box>

      <Container maxWidth={'lg'}>
        <Box>
          <Typography variant={'h2'}>趋势转换 </Typography>

          <Typography variant={'body1'}>实时跟踪趋势反转</Typography>
        </Box>

        {trendingChane && (
          <DataGrid
            rows={trendingChane}
            columns={trendingChangeColumns}
            autoHeight
            localeText={{}}
          />
        )}
      </Container>
    </>
  );
};

export default Detail;
