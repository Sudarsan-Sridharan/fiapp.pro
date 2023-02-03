import React from 'react';
import useSignal, { ISignal } from '@/hooks/useSignal';
import { DataGrid, GridColDef, GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { timejs } from '@/utils/time';
import { atom } from 'recoil';
import { useUserAssert } from '@/hooks/useUserAssert';

export const TradingSignalAtom = atom<ISignal | undefined>({
  key: 'TradingSignalAtom',
});
const TradingSignalTable = () => {
  const { data: signalData } = useSignal();
  const nav = useNavigate();
  const { userAssert } = useUserAssert();
  const userAssertInitOpen = parseInt(userAssert?.futureUsdtAsset?.balance ?? '0');

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '名称',
      width: 150,
      renderCell: (params) => <Typography
        sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => nav(`/d/${params.value}?timeframe=${params.row.timeframe}`)}>
        {params.value}

        <Typography sx={{
          color: params.row.direction === 1 ? 'green' : 'red',
        }}>{params.row.direction === 1 ? '↑' : '↓'}</Typography>
      </Typography>,
    },
    {
      field: 'open_price',
      headerName: '开仓价格',
      width: 150,
    },
    {
      field: 'stop_price',
      headerName: '止损价格',
      width: 150,
    },
    {
      field: 'stop_ratio',
      headerName: '持仓大小（合约）',
      width: userAssertInitOpen ? 150 : 200,
      renderCell: (params) =>
        <>
          {userAssertInitOpen ?
            <Typography>
              ${((userAssertInitOpen) / ((Math.abs(params.row.open_price - params.row.stop_price) / params.row.open_price) * 100))
              .toFixed()}
            </Typography>
            : <Typography>请在后台绑定币安接口</Typography>}
        </>
      ,
    },
    {
      field: 'direction',
      headerName: '方向',
      width: 150,
      renderCell: (params) => <Typography
        sx={{ color: params.value === 1 ? 'green' : 'red' }}>
        {params.value === 1 ? '多' : '空'}
      </Typography>,
    },
    {
      field: 'timeframe',
      headerName: '周期',
      width: 150,
    },
    {
      field: 'open_time',
      headerName: '时间',
      width: 150,
      renderCell: (params) => <Typography>
        {timejs(params.value).add(params.row.timeframe.match(/[a-z]+|[^a-z]+/gi)[0],
          params.row.timeframe.match(/[a-z]+|[^a-z]+/gi)[1].toLowerCase()).fromNow()}
      </Typography>,
    },
    {
      field: 'trading',
      headerName: '交易',
      width: 150,
      renderCell: (params) =>
        <Stack spacing={1} direction={'row'}>
          <Chip
            size={'small'}
            onClick={() => window.open(`https://www.binance.com/zh-CN/trade/${params.row.name.split('USDT')[0]}_USDT?ref=167714863`, '_blank')}
            label={'现货'}
            variant='outlined'
          />
          <Chip
            size={'small'}
            onClick={() => window.open(`https://www.binance.com/zh-CN/futures/${params.row.name.split('USDT')[0]}_USDT?ref=167714863`, '_blank')}
            label={'合约'}
            variant='outlined'
          />
        </Stack>,
    },
  ];


  // const [selectedRow, setSelectedRow] = useRecoilState(TradingSignalAtom);
  const onRowsSelectionHandler = (ids: GridSelectionModel) => {
    const selectedRowsData = ids.map((id) => signalData?.find((row: { name: GridRowId; }) => row.name === id));
    // setSelectedRow(selectedRowsData[0]);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 88px)' }}>
      {signalData && (
        <DataGrid
          rows={signalData ?? []}
          columns={columns}
          getRowId={(row) => row.name}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      )}

    </Box>
  );
};

export default TradingSignalTable;