import React from 'react';
import { Box } from '@mui/material';
import { TimeframeQuery } from '@/components/Table/Query';
import CoinListTable from '@/components/Table/CoinList';

const Monitor = () => {
  return (
    <>
      <TimeframeQuery />

      <Box height={'500px'}>
        <CoinListTable />
      </Box>
    </>
  );
};

export default Monitor;