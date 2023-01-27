import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Card, CardContent, InputAdornment, Stack, TextField, Typography } from '@mui/material';

interface priceState {
  open: number;
  close: number;
  stop: number;
  initOpen: number;
  initLeverage: number;
  initStop: number;
}

const PositionCalculator = () => {
  const [price, setPrice] = useState<priceState>({
    open: 0,
    close: 0,
    stop: 0,
    initOpen: 0,
    initLeverage: 0,
    initStop: 0,
  });

  const localInitOpen = localStorage.getItem('initOpen');

  const localInitLeverage = localStorage.getItem('initLeverage');

  useEffect(() => {
    setPrice({
      ...price,
      initOpen: parseInt(localInitOpen ? localInitOpen : '0'),
      initLeverage: parseInt(localInitLeverage ? localInitLeverage : '0'),
    });
  }, [price.initOpen, localInitOpen, localInitLeverage, price]);

  const handleChange = (prop: keyof priceState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrice({ ...price, [prop]: value });

    if (prop === 'initOpen') localStorage.setItem('initOpen', String(value));
    if (prop === 'initLeverage') localStorage.setItem('initLeverage', String(value));
  };

  const fractal = (num: number) => {
    if (num <= 1.01) {
      return num;
    }
    const res = num - Math.trunc(num);
    return 1 / (res * 100);
  };

  return (
    <Box>
      <Typography
        variant={'subtitle2'}>仓位计算器将会根据买卖信号自动做出判断，你可以在用户后台绑定交易所账户以便于自动计算。</Typography>

      <Card sx={{ width: '100%', maxWidth: '500px', mt: 2 }} variant={'outlined'}>
        <Box sx={{ p: 2 }}>
          <Box display={'flex'}>
            <Box width={'100%'}>
              <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography variant={'h6'}>持仓大小</Typography>
                    <Typography variant={'h2'} sx={{ ml: 2 }} fontWeight={'bolder'}>
                      $
                      {price.open / price.stop > 1
                        ? ((price.initOpen / price.initLeverage) / (price.open / price.stop)).toFixed()
                        : (price.initOpen / price.initLeverage).toFixed(0)}
                    </Typography>
                  </Box>
                  <Box>

                    <Typography variant={'h6'}>
                      止损({(price.open / price.stop).toFixed(2)}%):
                      ${((price.open / price.stop) * price.initOpen - price.initOpen).toFixed(2)}

                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Box>
                    <TextField
                      label={'现金'}
                      value={price.initOpen}
                      onChange={handleChange('initOpen')}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                      }}
                    />
                  </Box>

                  <Box my={2}>
                    <TextField
                      label={'杠杆'}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      value={price.initLeverage}
                      onChange={handleChange('initLeverage')}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>X</InputAdornment>,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <CardContent>
          <Stack spacing={2}>
            <TextField
              label={'开仓价格'}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              value={price.open}
              onChange={handleChange('open')}
            />
            <TextField
              label={'止损价格'}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              value={price.stop}
              onChange={handleChange('stop')}
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PositionCalculator;