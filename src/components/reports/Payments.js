import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { getTransferSumFrom } from '../../services/notarizationService';
import { Title } from '../../shared/Title';
import { bnToFloatString } from '../../utils/strings';

export function Payments() {
  const [movements, setMovements] = useState('');

  useEffect(() => {
    const getSum = async () => {
      const start = Math.round(Date.now() / 1000) - 3 * 24 * 60 * 60; // 72 hours
      const res = await getTransferSumFrom(start);
      if (res.error) console.error(res.error.message); // extra feature => skip errors
      else setMovements(bnToFloatString({ value: res.data + '', proportion: 18, precision: 4 }));
    };
    getSum();
  }, []);

  return (
    <>
      <Title>Payments</Title>
      <Typography component="p" variant="h6">
        SBAR {movements}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on last 72 hours
      </Typography>
    </>
  );
}
