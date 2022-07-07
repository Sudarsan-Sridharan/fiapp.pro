import React from 'react';

import { ArrowCircleRightOutlined } from '@mui/icons-material';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import Meta from '@/components/Meta';
import { PlainDivider } from '@/components/styled';

const actionColor = (params: GridCellParams): string => {
  if (params.value === '做多') {
    return 'cold';
  }

  return 'hot';
};

const rows: GridRowsProp = [
  {
    id: 1,
    action: '做多',
    name: 'BTC',
    price: '$31652.79',
    time: '30min',
    createdTime: '2022/5/31 14:11',
    risk: '1',
  },
  {
    id: 2,
    action: '做多',
    name: 'ETH',
    price: '$1980.97',
    time: '30min',
    createdTime: '2022/5/30 3:48',
    risk: '2',
  },
  {
    id: 3,
    action: '做多',
    name: 'BNB',
    price: '$319.80',
    time: '30min',
    createdTime: '2022/5/31 16:56',
    risk: '1',
  },
  {
    id: 4,
    action: '做空',
    name: 'ADA',
    price: '$0.6443',
    time: '30min',
    createdTime: '2022/5/28 19:22',
    risk: '3',
  },
];

const columns: GridColDef[] = [
  { field: 'action', headerName: '方向', cellClassName: (params) => actionColor(params) },
  { field: 'name', headerName: '名称', width: 100 },
  { field: 'time', headerName: '周期' },
  { field: 'price', headerName: '触发价格' },
  {
    field: 'createdTime',
    headerName: '触发时间',
    width: 200,
  },
  { field: 'lastUpdatedTime', headerName: '平仓时间', width: 200 },
  { field: 'profit', headerName: '利润' },
  { field: 'risk', headerName: '风险' },
  // { field: 'trend', headerName: '大趋势' },
];

const dRows: GridRowsProp = [
  {
    id: 1,
    name: 'BTC',
    price: '$31652.79',
    time: '30min',
    '1hour': '做多',
    '4hour': '做空',
    lastUpdatedTime: '2022/5/31 14:11',
    trend: '做空',
  },
];

const dColumns: GridColDef[] = [
  { field: 'name', headerName: '名称' },
  { field: 'price', headerName: '价格' },
  { field: 'lastupdatedTime', headerName: '触发时间', width: 200 },
  // { field: 'trend', headerName: '大趋势' },
];

const tColumns: GridColDef[] = [
  { field: 'name', headerName: '名称', width: 200 },
  { field: 'consistentTime', headerName: '持续时间' },
  { field: 'forwardConsistentTime', headerName: '之前趋势持续时间', width: 200 },
  { field: 'tradeChange', headerName: '转换', width: 200 },
  { field: 'lastupdatedTime', headerName: '触发时间', width: 200 },
];

const tRows: GridRowsProp = [
  {
    id: 1,
    name: 'STORJ-USDT-SWAP',
    consistentTime: '4天',
    forwardConsistentTime: '67天',
    tradeChange: '空头 -> 多头',
    lastUpdatedTime: '2022/5/28 15:31',
  },
];

const nRows: GridRowsProp = [
  {
    id: 1,
    level: 'X1',
    price: '$28200.48',
    time: '30min',
    action: '做多',
    updatedTime: '2022/5/28 15:31',
  },
  {
    id: 2,
    level: 'X3',
    price: '$30200.96',
    time: '1hour',
    action: '做多',
    updatedTime: '2022/5/31 14:11',
  },
  {
    id: 3,
    level: 'X4',
    price: '$40797.31',
    time: '4hour',
    action: '做空',
    updatedTime: '2022/4/26 08:48',
  },
];

const nColumns: GridColDef[] = [
  { field: 'level', headerName: '等级' },
  { field: 'price', headerName: '价格' },
  { field: 'time', headerName: '时间周期' },
  { field: 'action', headerName: '方向' },
  { field: 'updatedTime', headerName: '更新时间', width: 200 },
];

const desc = [
  { number: '10+', desc: '个交易策略' },
  { number: '5+', desc: '个风险预警' },
  { number: '3+', desc: '个选币系统' },
  { number: '200+', desc: '个监控标的' },
];

function Welcome() {
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
          <Typography variant={'h2'}>交易大师每日推荐</Typography>

          <DataGrid rows={rows} columns={columns} autoHeight hideFooter />

          <PlainDivider />

          <Box>
            <Typography variant={'h2'}>
              趋势转换{' '}
              <IconButton>
                <ArrowCircleRightOutlined />
              </IconButton>{' '}
            </Typography>

            <Typography variant={'body1'}>实时跟踪趋势反转</Typography>
          </Box>

          <DataGrid rows={tRows} columns={tColumns} autoHeight hideFooter />

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
          {/*        <ListItemText>30min: *BTC* 做多 X1 at 2022/5/28 15:31</ListItemText>*/}
          {/*      </ListItemButton>*/}
          {/*      <ListItemButton>*/}
          {/*        <ListItemIcon>*/}
          {/*          <Notifications sx={{ color: green[300] }} />*/}
          {/*        </ListItemIcon>*/}
          {/*        <ListItemText>1hour: *ETH* 做多 X3 at 2022/5/31 14:11</ListItemText>*/}
          {/*      </ListItemButton>*/}
          {/*      <ListItemButton>*/}
          {/*        <ListItemIcon>*/}
          {/*          <Notifications sx={{ color: red[400] }} />*/}
          {/*        </ListItemIcon>*/}
          {/*        <ListItemText>4hour: *ADA* 做空 X4 at 2022/5/31 19:48</ListItemText>*/}
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
