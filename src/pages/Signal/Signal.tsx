import React from 'react';
import { Alert, Box, Container, Stack } from '@mui/material';
import NeedLogin from '@/components/Login/NeedLogin';
import TradingSignalTable from '@/components/Table/TradingSignal';
import Meta from '@/components/Meta';

const Signal = () => {
  return (
    <Box bgcolor={'#fff'}>
      <Meta title={'买卖信号'} />
      <Container maxWidth={'xl'}>
        <Stack spacing={1}>
          <Alert severity={'info'} variant={'outlined'}>
            买卖信号实时通知系统稍后推出
          </Alert>
          <Alert severity={'error'} variant={'outlined'}>
            买卖信号（测试版）不对任何亏损负责，仅供参考
          </Alert>
        </Stack>

        <NeedLogin>
          <TradingSignalTable />
        </NeedLogin>
      </Container>
    </Box>
  );
};

export default Signal;