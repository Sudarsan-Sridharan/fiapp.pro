import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowCircleRightOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Box, Chip, Container, Grid, IconButton, Rating, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { green, red } from '@mui/material/colors';
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import Meta from '@/components/Meta';

const actionColor = (params: GridCellParams): string => {
  if (params.value === '多') {
    return 'cold';
  }

  return 'hot';
};

const rows: GridRowsProp = [
  {
    id: 1,
    action: '多',
    name: 'BTC',
    price: '$31652.79',
    time: '30min',
    createdTime: '2022/5/31 14:11',
    risk: '1',
  },
  {
    id: 2,
    action: '多',
    name: 'ETH',
    price: '$1980.97',
    time: '30min',
    createdTime: '2022/5/30 3:48',
    risk: '2',
  },
  {
    id: 3,
    action: '多',
    name: 'BNB',
    price: '$319.80',
    time: '30min',
    createdTime: '2022/5/31 16:56',
    risk: '1',
  },
  {
    id: 4,
    action: '空',
    name: 'ADA',
    price: '$0.6443',
    time: '30min',
    createdTime: '2022/5/28 19:22',
    risk: '3',
  },
];

const columns: GridColDef[] = [
  {
    field: 'action',
    headerName: '方向',
    renderCell: (params) => (
      <Chip
        size={'small'}
        color={params.value === '多' ? 'success' : 'error'}
        label={params.value}
      />
    ),
  },
  {
    field: 'name',
    headerName: '名称',
    width: 100,
    renderCell: (params) => (
      <Button
        component={Link}
        to={`/d/${params.value}USDT`}
        sx={{ paddingLeft: 0, minWidth: 0 }}
        endIcon={<ArrowRightOutlined />}
      >
        {params.value}
      </Button>
    ),
  },
  { field: 'time', headerName: '周期' },
  { field: 'price', headerName: '触发价格' },
  {
    field: 'createdTime',
    headerName: '触发时间',
    width: 200,
  },
  { field: 'lastUpdatedTime', headerName: '平仓时间', width: 200 },
  { field: 'profit', headerName: '利润' },
  {
    field: 'risk',
    headerName: '风险',
    width: 200,
    renderCell: (params) => <Rating value={params.row.risk} readOnly />,
  },
  // { field: 'trend', headerName: '大趋势' },
];

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
        {params.value.split(' ')[0]}天{params.value.split(' ')[2].split(':')[0]}小时
        {params.value.split(' ')[2].split(':')[1] !== '00' &&
          `${params.value.split(' ')[2].split(':')[1]}分钟`}
        {params.value.split(' ')[2].split(':')[1] !== '00' &&
          `${params.value.split(' ')[2].split(':')[2]}秒`}
      </>
    ),
  },
  {
    field: 'openPrice',
    headerName: '触发价格',
    renderCell: (params) => `$${params.value}`,
  },
  {
    field: 'openTime',
    headerName: '触发时间',
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'risk',
    headerName: '风险',
    width: 200,
    renderCell: (params) => <Rating value={params.row.risk} readOnly />,
  },
];

const desc = [
  { number: '10+', desc: '个交易策略' },
  { number: '5+', desc: '个风险预警' },
  { number: '3+', desc: '个选币系统' },
  { number: '200+', desc: '个监控标的' },
];

function Welcome() {
  const { data: trendingChane } = useSWR(`${domain}/trending-change/all`, fetcher);

  return (
    <>
      <Meta title="智能交易系统" />

      <Box py={10} sx={{ background: 'linear-gradient(#f5f9fe, #fff)' }}>
        <Container maxWidth={'lg'}>
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

      <Container maxWidth={'lg'} sx={{ mt: 2, pb: 10 }}>
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
          {/*<Box>*/}
          {/*  <Typography variant={'h2'}>*/}
          {/*    智能策略{' '}*/}
          {/*    <IconButton>*/}
          {/*      <ArrowCircleRightOutlined />*/}
          {/*    </IconButton>*/}
          {/*  </Typography>*/}
          {/*  <Typography variant={'body1'}>全自动多空信号</Typography>*/}
          {/*</Box>*/}

          {/*<DataGrid rows={rows} columns={columns} autoHeight hideFooter />*/}

          {/*<PlainDivider />*/}

          <Box>
            <Typography variant={'h2'}>
              趋势转换{' '}
              <IconButton>
                <ArrowCircleRightOutlined />
              </IconButton>
            </Typography>

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

          {/*<Typography variant={'h2'}>详情</Typography>*/}
          {/*<DataGrid rows={dRows} columns={dColumns} autoHeight hideFooter />*/}
          {/*<DataGrid rows={nRows} columns={nColumns} autoHeight hideFooter />*/}
        </Stack>

        <Grid container>
          <Grid item xs={12} md={9}></Grid>

          {/*<Grid>*/}
          {/*  <Box>*/}
          {/*    <List dense>*/}
          {/*      <ListItemButton>*/}
          {/*        <ListItemIcon>*/}
          {/*          <Notifications sx={{ color: green[100] }} />*/}
          {/*        </ListItemIcon>*/}
          {/*        <ListItemText>30min: *BTC* 多 X1 at 2022/5/28 15:31</ListItemText>*/}
          {/*      </ListItemButton>*/}
          {/*      <ListItemButton>*/}
          {/*        <ListItemIcon>*/}
          {/*          <Notifications sx={{ color: green[300] }} />*/}
          {/*        </ListItemIcon>*/}
          {/*        <ListItemText>1hour: *ETH* 多 X3 at 2022/5/31 14:11</ListItemText>*/}
          {/*      </ListItemButton>*/}
          {/*      <ListItemButton>*/}
          {/*        <ListItemIcon>*/}
          {/*          <Notifications sx={{ color: red[400] }} />*/}
          {/*        </ListItemIcon>*/}
          {/*        <ListItemText>4hour: *ADA* 空 X4 at 2022/5/31 19:48</ListItemText>*/}
          {/*      </ListItemButton>*/}
          {/*    </List>*/}
          {/*  </Box>*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    </>
  );
}

export default Welcome;
