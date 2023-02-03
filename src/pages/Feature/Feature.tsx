import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Feature = () => {
  return (
    <Box>
      <Container>
        <Box textAlign={'center'}>
          <Typography variant={'h1'}>
            超级
          </Typography>
          <Typography variant={'h1'} sx={{
            bgcolor: 'linear-gradient(#eee, #333)',
            backgroundClip: 'text',
          }}>
            无敌量化
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Feature;