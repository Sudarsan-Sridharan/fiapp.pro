import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Card, CardContent, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useUserAssert } from '@/hooks/useUserAssert';
import { useUser } from '@/hooks/useUser';
import NeedLogin from '@/components/Login/NeedLogin';
import { useRecoilState } from 'recoil';
import { TradingSignalAtom } from '@/components/Table/TradingSignal';

interface priceState {
  open: number;
  close: number;
  stop: number;
  initOpen: number;
  initLeverage: number;
  initStop: number;
}

const PositionCalculator = () => {
  const { userAssert } = useUserAssert();
  const userAssertInitOpen = parseInt(userAssert?.futureUsdtAsset?.balance ?? '0');
  const [selectedRow, setSelectedRow] = useRecoilState(TradingSignalAtom);
  const [price, setPrice] = useState<priceState>({
    open: 0,
    close: 0,
    stop: 0,
    initOpen: 0,
    initLeverage: 0,
    initStop: 0,
  });

  useEffect(() => {
    setPrice({
      ...price,
      initOpen: userAssertInitOpen,
      open: selectedRow?.open_price ?? 0,
      stop: selectedRow?.stop_price ?? 0,
    });
  }, [userAssertInitOpen, selectedRow]);

  const [position, setPosition] = useState({
    hold: 0,
    stop: 0,
  });

  const handleChange = (prop: keyof priceState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrice({ ...price, [prop]: value });

    if (prop === 'initOpen') localStorage.setItem('initOpen', String(value));
    if (prop === 'initLeverage') localStorage.setItem('initLeverage', String(value));
  };


  const user = useUser();
  return (
    <>
      {user.value.token ? (
        <Box>
          <Typography
            variant={'subtitle2'}>
            {userAssert ? '你已绑定交易所账户，程序将为你自动计算开仓大小' : '仓位计算器将会根据买卖信号自动做出判断，请在后台绑定交易所账户以便自动计算。'}
          </Typography>

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
                          {position.hold.toFixed()}
                        </Typography>
                      </Box>
                      <Box>
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
      ) : (
        <NeedLogin />
      )}
    </>
  );
};

export default PositionCalculator;