import React from 'react';

import { Box, Container, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: '名称',
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
  },
  {
    field: 'description',
    headerName: '描述',
  },
  {
    field: 'actions',
    headerName: '',
    width: 200,
    renderCell: (params) => {
      const name = params.row.name;
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
            href={`https://cn.tradingview.com/chart/?symbol=binance:${name}&interval=${time}`}
          >
            图表
          </Button>
        </>
      );
    },
  },
];

const RiskWarning = () => {
  const { data } = useSWR(`${domain}/risk-warning/all`, fetcher, {
    refreshInterval: 1000 * 60 * 1,
  });

  return (
    <Container maxWidth={'xl'}>
      <Toolbar />
      <Typography variant={'h4'}>风险预警</Typography>

      <Box height={'90vh'}>
        {data && <DataGrid disableColumnFilter rows={data} columns={columns} />}
      </Box>
    </Container>
  );
};

export default RiskWarning;
