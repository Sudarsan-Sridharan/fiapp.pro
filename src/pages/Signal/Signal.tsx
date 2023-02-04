import React from 'react';
import { Alert, Box, Container } from '@mui/material';
import NeedLogin from '@/components/Login/NeedLogin';
import TradingSignalTable from '@/components/Table/TradingSignal';
import Meta from '@/components/Meta';

const Signal = () => {
  return (
    <Box bgcolor={'#fff'}>
      <Meta title={'买卖信号'} />
      <Container maxWidth={'xl'}>
        <Alert severity={'error'} variant={'outlined'}>
          买卖信号（测试版）不对任何亏损负责，仅供参考
        </Alert>

        <NeedLogin>
          <TradingSignalTable />
        </NeedLogin>
      </Container>
    </Box>
  );
};

export default Signal;