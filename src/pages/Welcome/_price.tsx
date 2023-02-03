import React from 'react';

import { Box, Button, Card, Grid, Stack, Tooltip, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export const okxInventLink = 'https://www.ouyicn.art/join/5083273';

const price = [
  {
    title: '基础会员',
    subtitle: `使用我们的邀请码 5083273 注册 okx 并激活账户即可`,
    price: '0',
    items: ['1个交易信号', '趋势预警', '风险预警'],
  },
  {
    title: '高级会员（内测中，全部免费）',
    subtitle: '解锁 fiapp.pro 所有功能',
    price: (
      <>
        100
      </>
    ),
    items: ['8+个短中长线交易信号', '5个预警系统', '3个选币系统', '优先定制信号', '独家k线教学', 'VIP频道推送'],
  },
];

const Price = () => {
  const nav = useNavigate();
  return (
    <Stack spacing={2}>
      <Box textAlign={'center'}>
        <Typography variant={'h2'}>现在开始智能管理你的财富</Typography>
      </Box>
      <Grid container spacing={1} justifyContent={'center'}>
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '100%', p: 2, py: 4 }}>
            <Grid2 container>
              <Grid2 xs={12} md={6}>
                <Box sx={{ textAlign: 'center', borderRight: 'solid 1px #e0e0e0' }}>
                  <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant={'h2'}>
                      基础方案
                    </Typography>
                  </Stack>
                  <Typography variant={'subtitle2'} sx={{ my: 1 }}>
                    普通会员，解锁部分常用功能
                  </Typography>

                  <Box my={2}>
                    <Box display={'flex'} justifyContent={'center'}>
                      <Typography variant={'h2'} alignSelf={'end'} color={'secondary'}>$0</Typography>
                      <Typography variant={'subtitle1'} alignSelf={'end'}>/月</Typography>
                    </Box>

                    <Button variant={'contained'} size={'small'} sx={{ mt: 2 }} onClick={() => nav('/signup')}>
                      立即开始，免费获得七天高级会员
                    </Button>
                  </Box>

                  <Typography variant={'caption'} sx={{ color: grey[500] }}>
                    包含：部分（买卖信号，趋势信号，风险预警）功能
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant={'h2'}>
                      高级方案
                    </Typography>
                    <Tooltip title={'以优惠的价格抢先体验 Fiapp 所有功能'} placement={'top'} arrow>
                      <Typography variant={'caption'} color={'secondary'}>
                        早鸟价
                      </Typography>
                    </Tooltip>
                  </Stack>
                  <Typography variant={'subtitle2'} sx={{ my: 1 }}>
                    全功能会员，解锁 Fiapp.pro 所有功能
                  </Typography>

                  <Box display={'flex'} justifyContent={'center'} my={2}>
                    <Typography variant={'h2'} alignSelf={'end'} color={'secondary'}>$100</Typography>
                    <Typography variant={'subtitle1'} alignSelf={'end'}>/月</Typography>
                  </Box>

                  <Typography variant={'caption'} sx={{ color: grey[500] }}>
                    包含：买卖信号，趋势信号，风险预警，消息推送等所有功能
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Price;
