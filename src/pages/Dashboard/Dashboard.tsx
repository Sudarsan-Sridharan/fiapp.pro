import { useUser } from '@/hooks/useUser';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Dialog, Divider, Icon, Stack, TextField, Typography } from '@mui/material';
import { CurrencyBitcoin } from '@mui/icons-material';
import Meta from '@/components/Meta';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { useCoinList } from '@/hooks/useCoinList';
import { green, red } from '@mui/material/colors';
import { messageType } from '@/pages/Detail/Detail';

interface IFCard {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const FCard: React.FC<IFCard> = (props) => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant={'h6'}>
        {props.title}
      </Typography>
      <Typography variant={'subtitle2'}>
        {props.subtitle}
      </Typography>
      <Divider />
      <Box sx={{ pt: 2 }}>
        <Stack direction={'row'} spacing={1}>
          {props.children}
        </Stack>
      </Box>
    </Card>
  );
};

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: '名称',
    width: 150,
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
    headerName: '风险',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${(params.value && params.value.length > 0) && messageType[params.value[0]?.description_type as keyof typeof messageType]}`,
  },
];

const Dashboard = () => {
  const user = useUser();
  const token = user.value.token;
  const nav = useNavigate();
  const coinList = useCoinList();
  const [bindBinanceDialog, setBindBinanceDialog] = useState(false);
  const [apiKey, setApiKey] = useState({
    key: '',
    secret: '',
  });

  const bindBinance = () => {
    localStorage.setItem('binance_api_key', apiKey.key);
    localStorage.setItem('binance_api_secret', apiKey.secret);
  };

  useEffect(() => {
    if (!token) {
      nav('/login');
    }
  }, [nav, token]);

  return (
    <div>
      <Meta title={'用户中心'} />
      <Container maxWidth={'lg'} sx={{ my: 4 }}>
        <Typography variant={'h2'}>用户中心 - 内测中</Typography>
        <Typography variant={'subtitle1'}>{user.value.info?.email}</Typography>

        <Box mt={2}>
          <Grid2 container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid2 xs={12}>
              <FCard title={`订阅`} subtitle={`查看和管理 Fiapp.pro 产品和订阅`}>
                <Icon sx={{ fontSize: '100%', height: 'auto', width: 'auto' }}>
                  <CurrencyBitcoin />
                </Icon>

                <Box>
                  <Typography variant={'subtitle1'}>高级会员</Typography>
                  <Typography variant={'subtitle2'}>免费使用 1 个月</Typography>
                </Box>
              </FCard>
            </Grid2>

            <Grid2 xs={12}>
              <FCard title={`交易所绑定`}
                     subtitle={`实时查看交易所账户余额和计算仓位`}>
                <Button variant={'outlined'} onClick={() => setBindBinanceDialog(true)}>绑定币安</Button>

                <Dialog open={bindBinanceDialog}>
                  <Box p={2}>
                    <Stack spacing={2}>
                      <TextField label={'API Key'} size={'small'}
                                 onChange={(e) => setApiKey({ ...apiKey, key: e.target.value })} />
                      <TextField label={'API Secret'} size={'small'}
                                 onChange={(e) => setApiKey({ ...apiKey, secret: e.target.value })} />
                    </Stack>
                  </Box>
                  <Button onClick={bindBinance}>绑定币安</Button>
                </Dialog>
                <Button variant={'outlined'} disabled>绑定 OKX</Button>
                <Button onClick={() => window.open('https://github.com/0xSP4C3/fiapp.pro', '_black')}>审阅代码</Button>
              </FCard>
            </Grid2>

            <Grid2 xs={12}>
              <FCard title={`消息通知`} subtitle={`订阅想要的币种，获得实时全平台信号推送`}>
                <Box sx={{ height: '500px', width: '100%' }}>
                  <DataGrid
                    rows={coinList?.value ?? []}
                    columns={columns}
                    getRowId={(row) => row.name}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box>
              </FCard>
            </Grid2>
          </Grid2>
        </Box>

      </Container>
    </div>
  );
};

export default Dashboard;