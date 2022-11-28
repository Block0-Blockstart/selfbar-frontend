import React from 'react';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Error404 = () => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Typography variant={'h1'} fontWeight={'900'} color={'darkGreen.main'}>
        404
      </Typography>
      <Typography variant={'h3'}>Nothing here</Typography>
    </Box>
  );
};
