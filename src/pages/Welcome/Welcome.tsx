import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ArrowRightOutlined, CancelOutlined } from '@mui/icons-material';
import {
  Badge,
  Box,
  ButtonGroup,
  Chip,
  Container,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { green, red } from '@mui/material/colors';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import Meta from '@/components/Meta';
import InventStart from '@/pages/Welcome/_inventStart';
import Price from '@/pages/Welcome/_price';
import ProductInfo from '@/pages/Welcome/_productInfo';

export const trendingChangeColumns: GridColDef[] = [
  {
    field: 'currentTrending',
    headerName: '趋势方向',
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
    field: 'openTime',
    headerName: '触发时间',
    renderCell: (params) => new Date(params.value).toLocaleString(),
    width: 200,
  },
  {
    field: 'risk',
    headerName: '风险',
    width: 200,
    renderCell: (params) => <Rating value={params.row.risk} readOnly />,
  },
  {
    field: 'openPrice',
    headerName: '触发价格',
    renderCell: (params) => `$${new BigNumber(params.value).toFixed()}`,
    width: 150,
  },
  {
    field: 'forwardTimeDuration',
    headerName: '之前趋势持续时间',
    width: 200,
    renderCell: (params) => (
      <>
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
    field: 'actions',
    headerName: '',
    width: 200,
    renderCell: (params) => {
      const name = params.row.name;
      const symbol = `${name?.split('-')[0]}${name?.split('-')[1]}${
        name && name?.split('-')?.length > 1 && name?.split('-')[2] === 'SWAP' && 'PERP'
      }`;
      let time = params.row.timeFrame.split('');
      if (time.length === 3 && time[2] === 'm') {
        time = time[0] * 10;
      } else if (time.length === 2 && time[1] === 'H') {
        time = time[0] * 60;
      } else {
        time = 60;
      }

      return (
        <>
          <Button
            color={'inherit'}
            target={'_blank'}
            href={`https://cn.tradingview.com/chart/?symbol=OKX:${symbol}&interval=${time}`}
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
  { number: '8+', desc: '个交易策略' },
  { number: '5+', desc: '个风险预警' },
  { number: '3+', desc: '个选币系统' },
  { number: '200+', desc: '个监控标的' },
];

const timeFrames = ['30m', '1H', '4H'];

function Welcome() {
  const [timeFrame, setTimeFrame] = useState<string>('');
  const [risk, setRisk] = useState<number>(0);

  const urlRisk = risk !== 0 ? risk.toString() : '';

  const conditions = {
    risk: urlRisk,
    timeFrame,
  };
  const sendUrl = new URLSearchParams(conditions).toString();

  const { data: trendingChane } = useSWR(`${domain}/trending-change/all?${sendUrl}`, fetcher, {
    refreshInterval: 1000 * 60 * 1,
  });

  const { data: trendingOverview } = useSWR(`${domain}/trending-change/overview`, fetcher, {
    refreshInterval: 1000 * 60 * 1,
  });

  return (
    <>
      <Meta title="智能交易系统" />

      <Box py={10} sx={{ background: 'linear-gradient(#f5f9fe, #fff)' }}>
        <Container maxWidth={'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography variant="h1">智能交易系统</Typography>
                <Typography variant="subtitle1">
                  轻松抓住市场上
                  <Typography variant="subtitle1" component={'span'} color={red[500]}>
                    所有标的
                  </Typography>
                  交易机会
                </Typography>

                <Stack spacing={1} direction={'row'}>
                  <Button
                    variant={'contained'}
                    color={'inherit'}
                    href={'https://jq.qq.com/?_wv=1027&k=ThQbfwPX'}
                    target={'_blank'}
                  >
                    QQ 群
                  </Button>
                  <Button
                    variant={'contained'}
                    color={'inherit'}
                    target={'_blank'}
                    href={'https://discord.gg/HZD7uw5Hp9'}
                  >
                    Discord 群
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {trendingOverview && (
              <Grid item xs={12} md={6}>
                <Box height={'300px'}>
                  {trendingOverview && (
                    <DataGrid
                      disableColumnFilter
                      rows={trendingOverview.btc.latest}
                      columns={trendingChangeColumns}
                      hideFooterPagination
                    />
                  )}
                </Box>
              </Grid>
            )}
          </Grid>

          <Box mt={1} display={'flex'} justifyContent={'space-between'}>
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

      <Container maxWidth={'xl'} sx={{ mt: 2, pb: 5 }}>
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
            <Stack spacing={1} direction={'row'} sx={{ alignItems: 'end' }}>
              <Badge badgeContent={'稳定版'}>
                <Typography variant={'h2'}>趋势转换 </Typography>
              </Badge>

              <Typography variant={'h6'}>今日</Typography>

              <Typography variant={'h6'} sx={{ color: green[500] }}>
                {trendingOverview && trendingOverview.full.long} 多头
              </Typography>
              <Typography variant={'h6'} sx={{ color: red[500] }}>
                {trendingOverview && trendingOverview.full.short} 空头
              </Typography>
            </Stack>

            <Typography variant={'body1'}>
              7 X 24小时跟踪趋势反转，持续监控中，监控周期：30m，1h，4h
            </Typography>

            <Typography variant={'body1'}>
              趋势追踪是环境信号，可以辅助观察标的当前趋势情况，不对任何交易做出任何投资决策。
            </Typography>
          </Box>

          <Stack spacing={2} direction={'row'}>
            <ButtonGroup variant="outlined">
              {timeFrames.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => setTimeFrame(item)}
                  variant={item === timeFrame ? 'contained' : 'outlined'}
                >
                  {item}
                </Button>
              ))}
              <Button
                onClick={() => setTimeFrame('')}
                variant={timeFrame === '' ? 'contained' : 'outlined'}
              >
                所有时间
              </Button>
            </ButtonGroup>

            <Stack direction={'row'} sx={{ alignItems: 'center' }}>
              <Typography variant={'body1'}>风险：</Typography>
              <Rating value={risk} onChange={(event, value) => setRisk(value ?? 0)} />

              {risk !== 0 && risk && (
                <IconButton size={'small'} onClick={() => setRisk(0)}>
                  <CancelOutlined />
                </IconButton>
              )}
            </Stack>
          </Stack>

          {trendingChane && (
            <Box>
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
            </Box>
          )}
        </Stack>
      </Container>

      <Container maxWidth={'xl'} sx={{ pb: 5 }}>
        <Stack spacing={2}>
          <InventStart />
        </Stack>
      </Container>

      <Box sx={{ background: 'linear-gradient(to top, #f5f9fe, #fff)' }}>
        <Container maxWidth={'xl'} sx={{ py: 10 }}>
          <Stack spacing={5}>
            <ProductInfo />

            <Price />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Welcome;
