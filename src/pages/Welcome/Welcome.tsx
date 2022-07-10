import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowRightOutlined } from "@mui/icons-material";
import { Badge, Box, Chip, Container, Rating, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { green, red } from "@mui/material/colors";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import Meta from "@/components/Meta";
import InventStart from "@/pages/Welcome/_inventStart";

export const trendingChangeColumns: GridColDef[] = [
  {
    field: 'currentTrending',
    headerName: '方向',
    renderCell: (params) => (
      <Chip
        size={'small'}
        color={params.value === '1' ? 'success' : params.value === '0' ? 'default' : 'error'}
        label={params.value === '1' ? '多' : params.value === '0' ? '中立' : '空'}
      />
    ),
  },
  {
    field: 'name',
    headerName: '名称',
    width: 200,
    renderCell: (params) => (
      <Button
        component={Link}
        to={`/d/${params.value}`}
        sx={{ paddingLeft: 0, minWidth: 0 }}
        endIcon={<ArrowRightOutlined />}
      >
        {params.value}
      </Button>
    ),
  },
  {
    field: 'timeFrame',
    headerName: '周期',
  },
  {
    field: 'forwardTimeDuration',
    headerName: '之前趋势持续时间',
    width: 200,
    renderCell: (params) => (
      <>
        <Chip
          size={'small'}
          sx={{ mr: 1 }}
          color={
            params.row.forwardTrending === '1'
              ? 'success'
              : params.row.forwardTrending === '0'
              ? 'default'
              : 'error'
          }
          label={
            params.row.forwardTrending === '1'
              ? '多'
              : params.row.forwardTrending === '0'
              ? '中立'
              : '空'
          }
        />
        {params.value.split(' ')[0] !== '0' && `${params.value.split(' ')[0]}天`}
        {params.value.split(' ')[2].split(':')[0] !== '00' &&
          `${params.value.split(' ')[2].split(':')[0]}小时`}
        {params.value.split(' ')[2].split(':')[1] !== '00' &&
          `${params.value.split(' ')[2].split(':')[1]}分`}
        {params.value.split(' ')[2].split(':')[2] !== '00' &&
          `${params.value.split(' ')[2].split(':')[2]}秒`}
      </>
    ),
  },
  {
    field: 'openPrice',
    headerName: '触发价格',
    renderCell: (params) => `$${new BigNumber(params.value).toFixed()}`,
    width: 150,
  },
  {
    field: 'openTime',
    headerName: '触发时间',
    renderCell: (params) => new Date(params.value).toLocaleString(),
    width: 200,
  },
  {
    field: 'risk',
    headerName: '风险',
    width: 150,
    renderCell: (params) => <Rating value={params.row.risk} readOnly />,
  },
  {
    field: 'actions',
    headerName: '',
    width: 200,
    renderCell: (params) => {
      const name = params.row.name;
      const symbol = `${name?.split('-')[0]}${name?.split('-')[1]}${
        name && name?.split('-')?.length > 1 && name?.split('-')[2] === 'SWAP' && 'PERP'
      }`;

      return (
        <>
          <Button
            color={'inherit'}
            target={'_blank'}
            href={`https://cn.tradingview.com/chart/?symbol=${symbol}`}
          >
            图表
          </Button>
          <Button target={'_blank'} href={`https://www.okx.com/trade-swap/${name.toLowerCase()}`}>
            交易
          </Button>
        </>
      );
    },
  },
];

const desc = [
  { number: '10+', desc: '个交易策略' },
  { number: '5+', desc: '个风险预警' },
  { number: '3+', desc: '个选币系统' },
  { number: '200+', desc: '个监控标的' },
];

function Welcome() {
  const { data: trendingChane } = useSWR(`${domain}/trending-change/all`, fetcher, {
    refreshInterval: 1000 * 60 * 1,
  });

  return (
    <>
      <Meta title="智能交易系统" />

      <Box py={10} sx={{ background: 'linear-gradient(#f5f9fe, #fff)' }}>
        <Container maxWidth={'xl'}>
          <Stack spacing={1}>
            <Typography variant="h1">智能交易系统</Typography>
            <Typography variant="subtitle1">
              轻松抓住市场上
              <Typography variant="subtitle1" component={'span'} color={red[500]}>
                所有标的
              </Typography>
              交易机会
            </Typography>
          </Stack>

          <Box mt={10} display={'flex'} justifyContent={'space-between'}>
            {desc.map((item, index) => (
              <Typography variant="h3" key={index}>
                {item.number}
                <Typography component={'span'} variant={'body1'}>
                  {item.desc}
                </Typography>
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth={'xl'} sx={{ mt: 2, pb: 10 }}>
        <Stack
          spacing={2}
          sx={{
            '& .hot': {
              color: red[500],
            },
            '& .cold': {
              color: green[500],
            },
          }}
        >
          <Box>
            <Badge badgeContent={'alpha'}>
              <Typography variant={'h2'}>趋势转换 </Typography>
            </Badge>

            <Typography variant={'body1'}>实时跟踪趋势反转</Typography>
          </Box>

          {trendingChane && (
            <Box height={'500px'}>
              <DataGrid
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                disableColumnFilter
                components={{ Toolbar: GridToolbar }}
                rows={trendingChane}
                columns={trendingChangeColumns}
              />
            </Box>
          )}

          <InventStart />
        </Stack>
      </Container>
    </>
  );
}

export default Welcome;
