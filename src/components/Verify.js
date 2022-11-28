import { useState } from 'react';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';

import { verify } from '../services/notarizationService';

export function Verify() {
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validHash = new RegExp(`^0x[a-fA-F0-9]{64}$`);

    if (!validHash.test(hash)) {
      setError('Invalid hash format.');
      setLoading(false);
      return;
    }

    const res = await verify({ hash });
    if (res.error) setError(res.error.message);
    else setResult(res.data);

    setLoading(false);
  };

  const handleReset = e => {
    e.preventDefault();
    setLoading(false);
    setError('');
    setHash('');
    setResult({});
  };

  const handleDownload = e => {
    e.preventDefault();
    const content = JSON.stringify(result, undefined, 2);
    const fileBlob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = `${hash} - full-proof.txt`;
    link.href = window.URL.createObjectURL(fileBlob);
    link.click();
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit} display={'flex'} flexDirection={'column'}>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box display={'flex'} flexDirection={'column'} pt={'50px'}>
        <FormControl sx={{ mb: '0.6rem' }}>
          <FormLabel sx={{ mb: '0.4rem' }} required={true} color={'darkGreen'}>
            Hash to verify
          </FormLabel>
          <OutlinedInput
            multiline={true}
            rows={2}
            value={hash}
            onChange={e => setHash(e.target.value)}
            sx={{
              wordBreak: 'break-all',
              padding: '12px',
              borderRadius: '5px',
              backgroundColor: 'light.main',
              fontSize: '1.05rem',
              fontFamily: "'Inconsolata', monospace",
            }}
          />
        </FormControl>

        <Box display={'flex'} justifyContent={'space-between'} maxWidth={'540px'} columnGap={'40px'}>
          <Button variant={'contained'} color={'darkGreen'} type="submit" sx={{ width: '100%', maxWidth: '250px' }}>
            Verify
          </Button>
          <Button variant={'contained'} color={'error'} onClick={handleReset} sx={{ width: '100%', maxWidth: '250px' }}>
            Reset
          </Button>
        </Box>

        <Box height={'35px'} pt={'1rem'}>
          <Typography color={'error'}>{error}</Typography>
        </Box>

        {result.verified && (
          <Box
            minHeight={'120px'}
            border={'1px solid'}
            borderColor={'darkGreen.main'}
            borderRadius={'5px'}
            padding={'8px 12px'}
            display={'flex'}
            flexDirection={'column'}>
            <Typography color={'darkGreen.main'} variant={'h6'} pb={'0.5rem'}>
              Verified !
            </Typography>
            <Typography mb={'0.5rem'}>This hash is recognized by the system. The full proof includes:</Typography>
            <Box display={'grid'} gridTemplateColumns={'1fr 3fr'} columnGap={'2rem'} ml={'2.5rem'}>
              <Typography>Merkle Root</Typography>
              <Typography fontFamily={"'Inconsolata', monospace"}>{result.merkleRoot}</Typography>
              <Typography>Chain Transaction</Typography>
              <Typography fontFamily={"'Inconsolata', monospace"}>{result.txHash}</Typography>
              <Typography>Merkle Proof Length</Typography>
              <Typography fontFamily={"'Inconsolata', monospace"}>{result.hexProof.length}</Typography>
            </Box>
            {result.hexProof.length === 0 && (
              <Typography variant={'body2'} ml={'2.5rem'} fontStyle={'italic'} pt={'0.5rem'}>
                * the Merkle proof length is 0 because the hash was recorded alone, not in a batch with other hashes.
              </Typography>
            )}
            <Button
              onClick={handleDownload}
              variant={'contained'}
              color={'darkGreen'}
              type="button"
              sx={{ width: '100%', maxWidth: '250px', marginTop: '1rem' }}>
              Download full proof
            </Button>
          </Box>
        )}

        {result.verified !== undefined && result.verified === false && (
          <Box
            border={'1px solid'}
            borderColor={'error.main'}
            borderRadius={'5px'}
            padding={'8px 12px'}
            display={'flex'}
            flexDirection={'column'}>
            <Typography color={'error'} variant={'h6'} pb={'0.5rem'}>
              Failed !
            </Typography>
            <Typography>This hash does not match any of the notarized hashes.</Typography>
            <Typography>Data having this hash should be rejected.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
