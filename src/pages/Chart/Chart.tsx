import React from 'react';
import Kline from '@/components/Chart/Kline';
import { Box } from '@mui/material';

const Chart = () => {
  return <Box sx={{ height: 'calc(100vh - 45px)' }}>
    <Kline height={'100vh'} />
  </Box>;
};

export default Chart;