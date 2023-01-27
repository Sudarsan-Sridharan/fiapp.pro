import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import { useCoinList } from '@/hooks/useCoinList';
import { Avatar, Chip, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { messageType } from '@/pages/Detail/Detail';
import { useNavigate } from 'react-router-dom';
import { useAPIQuery } from '@/hooks/useAPIQuery';

interface ICoinListTable {
  checkboxSelection?: boolean;
}

const CoinListTable: React.FC<ICoinListTable> = (props) => {
  const coinList = useCoinList();
  const nav = useNavigate();
  const APIQuery = useAPIQuery();

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '名称',
      width: 150,
      renderCell: (params) => <Typography
        sx={{ cursor: 'pointer' }}
        onClick={() => nav(`/d/${params.value.name}?timeframe=${APIQuery.value.timeframe}`)}> {params.value} </Typography>,
    },
    {
      field: 'coin_realtime_price',
      headerName: '实时价格',
      type: 'number',
      width: 150,
    },
    {
      field: 'trending_change',
      headerName: '方向',
      width: 150,
      renderCell: (params) => <Typography
        sx={{ color: params.value[0]?.current_trending === 1 ? green[500] : params.value[0]?.current_trending === 0 ? '' : red[500] }}>
        {params.value[0]?.current_trending === 1 ? '多' : params.value[0]?.current_trending === 0 ? '' : '空'}
      </Typography>,
    },
    {
      field: 'risk_warning',
      headerName: '风险（六小时内）',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${(params.value && params.value.length > 0) ? messageType[params.value[0]?.description_type as keyof typeof messageType] : ''}`,
    },
    {
      field: 'exchange',
      headerName: '交易所',
      width: 150,
      renderCell: (params) => <Chip
        size={'small'}
        onClick={() => window.open(`https://www.binance.com/zh-CN/trade/${params.row.name.split('USDT')[0]}_USDT?ref=167714863`, '_blank')}
        avatar={<Avatar alt='Natacha'
                        src={params.row.exchange === 'binance' ? 'https://s3-symbol-logo.tradingview.com/provider/binance.svg' : 'https://s3-symbol-logo.tradingview.com/provider/bitfinex.svg'} />}
        label={params.row.exchange.toUpperCase()}
        variant='outlined'
      />,
    },
  ];

  return (
    <DataGrid
      rows={coinList?.value ?? []}
      columns={columns}
      getRowId={(row) => row.name}
      checkboxSelection={props.checkboxSelection}
      experimentalFeatures={{ newEditingApi: true }}
      components={{ Toolbar: GridToolbar }}
    />
  );
};

export default CoinListTable;