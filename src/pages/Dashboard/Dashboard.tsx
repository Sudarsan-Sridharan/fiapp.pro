import { useUser } from '@/hooks/useUser';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Dialog, Divider, Icon, Stack, TextField, Typography } from '@mui/material';
import { ArrowRightRounded, CurrencyBitcoin } from '@mui/icons-material';
import Meta from '@/components/Meta';
import Grid2 from '@mui/material/Unstable_Grid2';
import CoinListTable from '@/components/Table/CoinList';
import { http } from '@/ network/fether';
import { useUserAssert } from '@/hooks/useUserAssert';

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

const Dashboard = () => {
  const user = useUser();
  const token = user.value.token;
  const nav = useNavigate();
  const [bindBinanceDialog, setBindBinanceDialog] = useState(false);
  const [apiKey, setApiKey] = useState({
    key: '',
    secret: '',
  });

  const { userAssert } = useUserAssert();

  const bindBinance = async () => {
    const params = `key=${apiKey.key}&secret=${apiKey.secret}`;
    await http.post(`/BinanceSpot/update-user-assert?${params}`).then(res => {
      setBindBinanceDialog(false);
    });
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

                {userAssert ?
                  (
                    <Box>
                      <Typography variant={'subtitle1'}>币安余额（只统计 USDT）</Typography>
                      <Typography variant={'subtitle2'}>现货：${userAssert.spotUsdtAsset?.free}</Typography>
                      <Typography
                        variant={'subtitle2'}>合约：${userAssert.futureUsdtAsset?.balance}</Typography>
                    </Box>
                  )
                  : null}
                <Button variant={userAssert ? 'contained' : 'outlined'} onClick={() => setBindBinanceDialog(true)}>
                  {userAssert ? '已' : ''}
                  绑定币安
                </Button>

                <Dialog onClose={() => setBindBinanceDialog(false)} open={bindBinanceDialog}>
                  <Box p={2}>

                    <Stack spacing={2}>
                      <Typography variant={'subtitle2'}>API 权限请只设置为 <b>允许读取</b>，只允许读取模式下，我们只可以检测到您的账户余额信息，无法发起交易，我们不为
                        API
                        导致的财产流失负责。</Typography>
                      <Typography variant={'subtitle2'}
                                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                  onClick={() => window.open('https://www.binance.com/zh-CN/my/settings/api-management')}
                      >前往币安申请
                        API <ArrowRightRounded /> </Typography>
                      <TextField label={'API Key'} size={'small'}
                                 onChange={(e) => setApiKey({ ...apiKey, key: e.target.value })} />
                      <TextField label={'API Secret'} size={'small'}
                                 onChange={(e) => setApiKey({ ...apiKey, secret: e.target.value })} />
                    </Stack>
                  </Box>
                  <Button onClick={bindBinance}>
                    {userAssert ? '重新' : ''}
                    绑定币安
                  </Button>
                </Dialog>
                <Button variant={'outlined'} disabled>绑定 OKX</Button>
              </FCard>
            </Grid2>

            <Grid2 xs={12}>
              <FCard title={`消息通知`} subtitle={`订阅想要的币种，获得实时全平台信号推送`}>
                <Box sx={{ height: '500px', width: '100%' }}>
                  <CoinListTable checkboxSelection={true} />
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