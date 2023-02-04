import React, { useCallback, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Meta from '@/components/Meta';
import Price from '@/pages/Welcome/_price';
import ProductInfo from '@/pages/Welcome/_productInfo';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { KeyboardArrowRightOutlined } from '@mui/icons-material';
import Chart from '@/pages/Welcome/_chart';
import AllTabTable from '@/components/Table/AllTab';

const desc = [
  { number: '8+', desc: '个交易策略' },
  { number: '5+', desc: '个风险预警' },
  { number: '3+', desc: '个选币系统' },
  { number: '200+', desc: '个监控标的' },
];

function Welcome() {
  const user = useUser();
  const mdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const [email, setEmail] = useState('');

  const handleEmail = useCallback((e: string) => {
    setEmail(e);
  }, [email]);
  const nav = useNavigate();
  return (
    <>
      <Meta title='量化交易系统' />
      <Alert severity={'info'} sx={{
        '& .MuiAlert-icon': {
          display: 'flex',
          alignSelf: 'center',
        },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant={'body1'}>
            重磅，买卖信号已推出！
          </Typography>
          <Button variant={'contained'} size={'small'} onClick={() => nav('/signal')}>立即免费体验</Button>
        </Box>

      </Alert>
      <Box py={10} sx={{ background: 'linear-gradient(#f5f9fe, #fff)' }}>
        <Container maxWidth={'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={5}>
              <Stack spacing={1}>
                <Typography variant='h2'>
                  轻松抓住市场上 <br />
                  <Typography variant='h1' component={'span'} color={'secondary'}>
                    所有标的
                  </Typography>
                  交易机会的 <br /> 量化交易系统
                </Typography>

                {!user.value.token ? (<Stack spacing={1}>
                  <Typography variant={'body1'} color={'secondary'} mt={2} alignItems={'center'}
                              display={'flex'}>
                    立即免费使用量化交易 <KeyboardArrowRightOutlined />
                  </Typography>

                  <Stack direction={'row'} spacing={1}>
                    <OutlinedInput placeholder={'邮件地址'} size={'small'} fullWidth
                                   value={email}
                                   onChange={(e) => handleEmail(e.target.value)}
                                   sx={{ maxWidth: 'calc(100% - 164px)' }} />
                    <Button
                      component={Link}
                      to={`/signup?email=${email}`}
                      size={'large'}
                      color={'secondary'}
                      variant={'contained'}
                    >
                      开始使用
                    </Button>
                  </Stack>
                </Stack>) : (
                  <>
                    <Button fullWidth size={'large'}
                            component={Link}
                            to={`/d/BTCUSDT`}
                            color={'secondary'} variant={'contained'}
                            sx={{ maxWidth: 'calc(100% - 164px)' }}>
                      开启专业版量化图表
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>

            <Grid item xs md lg={6} hidden={mdDown}>
              <Box sx={{ alignSelf: 'end', textAlign: 'right' }}>
                <img src={'/13.png'} style={{ maxWidth: '450px' }} />
              </Box>
            </Grid>
          </Grid>

          {/*<Box mt={8}>*/}
          {/*    <KlineChartHeader/>*/}
          {/*</Box>*/}
        </Container>
      </Box>


      <Box sx={{ bgcolor: '#fff' }}>
        <Alert severity={'info'} sx={{
          '& .MuiAlert-icon': {
            display: 'flex',
            alignSelf: 'center',
          },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant={'body1'}>
              加入官方的通知频道获取实时的信号推送
            </Typography>
            <Button sx={{ mx: 2 }} variant='outlined' color='primary' href='https://kook.top/14JUwd'
                    target={'_blank'}>Kookapp（大陆用户推荐）</Button>
            <Button variant='outlined' color='primary' href='https://discord.gg/HZD7uw5Hp9'
                    target={'_blank'}>Discord（海外用户推荐）</Button>
          </Box>

        </Alert>

        <Chart />

        <Divider sx={{ my: 5 }} />

        <Container maxWidth={'xl'}>
          <Box>
            <AllTabTable />
          </Box>
        </Container>
      </Box>

      <Box sx={{ background: 'linear-gradient(to top, #f5f9fe, #fff)' }}>
        <Container maxWidth={'xl'} sx={{ py: 10 }}>
          <Stack spacing={5}>
            <ProductInfo />

            <Divider />

            <Price />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Welcome;
