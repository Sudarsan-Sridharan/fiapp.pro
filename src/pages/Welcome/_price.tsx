import React from 'react';

import { Card, Grid, List, ListItemText, Stack, Typography } from '@mui/material';

export const okxInventLink = 'https://www.ouyicn.art/join/5083273';

const price = [
  {
    title: '基础会员',
    subtitle: `使用我们的邀请码 5083273 注册 okx 并激活账户即可`,
    price: '',
    items: ['1个交易信号', '趋势预警', '风险预警'],
  },
  {
    title: '高级会员',
    subtitle: '解锁 fiapp.pro 所有功能',
    price: (
      <>
        <Typography variant={'body2'}>$100 USDT/月</Typography>
        <Typography variant={'body2'}>$1000 USDT/年（省 20%） </Typography>
      </>
    ),
    items: ['8+个短中长线交易信号', '5个预警系统', '3个选币系统'],
  },
];

const Price = () => {
  return (
    <Stack spacing={2}>
      <Typography variant={'h2'}>会员价格</Typography>

      <Grid container spacing={2}>
        {price.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card variant={'outlined'} sx={{ p: 2, height: '100%' }}>
              <Stack spacing={1}>
                <Typography variant={'h6'}>{item.title}</Typography>

                <Typography variant={'body2'}>{item.subtitle}</Typography>

                {item.price}
                <List dense>
                  {item.items.map((t, k) => (
                    <ListItemText key={k}>* {t}</ListItemText>
                  ))}
                </List>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Price;
