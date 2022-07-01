import React from 'react';

import { Notifications } from '@mui/icons-material';
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import Meta from '@/components/Meta';
import { PlainDivider } from '@/components/styled';

const rows: GridRowsProp = [
  {
    id: 1,
    name: 'BTC',
    price: '$31652.79',
    '30min': '做多',
    '1hour': '做多',
    '4hour': '做空',
    lastupdatedTime: '2022/5/31 14:11',
    trend: '做空',
  },
  {
    id: 2,
    name: 'ETH',
    price: '$1980.97',
    '30min': '做多',
    '1hour': '做多',
    '4hour': '做空',
    lastupdatedTime: '2022/5/30 3:48',
    trend: '做空',
  },
  {
    id: 3,
    name: 'BNB',
    price: '$319.80',
    '30min': '做多',
    '1hour': '做多',
    '4hour': '做空',
    lastupdatedTime: '2022/5/31 16:56',
    trend: '做空',
  },
  {
    id: 4,
    name: 'ADA',
    price: '$0.6443',
    '30min': '做多',
    '1hour': '做空',
    '4hour': '做空',
    lastupdatedTime: '2022/5/28 19:22',
    trend: '做空',
  },
];

const columns: GridColDef[] = [
  { field: 'name', headerName: '名称' },
  { field: 'price', headerName: '价格' },
  { field: '30min', headerName: '30min' },
  { field: '1hour', headerName: '1hour' },
  { field: '4hour', headerName: '4hour' },
  { field: 'lastupdatedTime', headerName: '更新日期', width: 200 },
  { field: 'trend', headerName: '大趋势' },
];

const dRows: GridRowsProp = [
  {
    id: 1,
    name: 'BTC',
    price: '$31652.79',
    '30min': '做多',
    '1hour': '做多',
    '4hour': '做空',
    lastupdatedTime: '2022/5/31 14:11',
    trend: '做空',
  },
];

const dColumns: GridColDef[] = [
  { field: 'name', headerName: '名称' },
  { field: 'price', headerName: '价格' },
  { field: '30min', headerName: '30min' },
  { field: '1hour', headerName: '1hour' },
  { field: '4hour', headerName: '4hour' },
  { field: 'lastupdatedTime', headerName: '更新日期', width: 200 },
  { field: 'trend', headerName: '大趋势' },
];

const tColumns: GridColDef[] = [
  { field: 'name', headerName: '名称', width: 200 },
  { field: 'consistentTime', headerName: '持续时间' },
  { field: 'forwardConsistentTime', headerName: '之前趋势持续时间', width: 200 },
  { field: 'tradeChange', headerName: '转换', width: 200 },
  { field: 'lastupdatedTime', headerName: '更新日期', width: 200 },
];

const tRows: GridRowsProp = [
  {
    id: 1,
    name: 'STORJ-USDT-SWAP',
    consistentTime: '4天',
    forwardConsistentTime: '67天',
    tradeChange: '空头 -> 多头',
    lastupdatedTime: '2022/5/28 15:31',
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

function Welcome() {
  return (
    <>
      <Meta title="主页" />

      <Grid container>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Typography variant={'h2'}>交易大师每日推荐</Typography>

            <DataGrid rows={rows} columns={columns} autoHeight hideFooter />

            <PlainDivider />

            <Typography variant={'h2'}>趋势转换</Typography>
            <DataGrid rows={tRows} columns={tColumns} autoHeight hideFooter />

            <PlainDivider />

            <Typography variant={'h2'}>详情</Typography>
            <DataGrid rows={dRows} columns={dColumns} autoHeight hideFooter />
            <DataGrid rows={nRows} columns={nColumns} autoHeight hideFooter />
          </Stack>
        </Grid>

        <Grid>
          <Box>
            <List dense>
              <ListItemButton>
                <ListItemIcon>
                  <Notifications sx={{ color: green[100] }} />
                </ListItemIcon>
                <ListItemText>30min: *BTC* 做多 X1 at 2022/5/28 15:31</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Notifications sx={{ color: green[300] }} />
                </ListItemIcon>
                <ListItemText>1hour: *ETH* 做多 X3 at 2022/5/31 14:11</ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Notifications sx={{ color: red[400] }} />
                </ListItemIcon>
                <ListItemText>4hour: *ADA* 做空 X4 at 2022/5/31 19:48</ListItemText>
              </ListItemButton>
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Welcome;
