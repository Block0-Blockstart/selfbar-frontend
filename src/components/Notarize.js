import { useState } from 'react';

import { Backdrop, Box, Button, CircularProgress, List, ListItem, Typography } from '@mui/material';

import { notarize, transferRandom } from '../services/notarizationService';
import { AnimCheck } from '../shared/AnimCheck';
import { ArrowDown } from '../shared/ArrowDown';
import { Modal } from '../shared/Modal';
import { createRandomHash } from '../utils/hash';

import { HashFile } from './notarize/HashFile';

export function Notarize() {
  const [hashes, setHashes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleGenerateHash = () => {
    setError('');
    setHashes(v => [...v, createRandomHash()]);
  };

  const handleAddHash = h => {
    setError('');
    setHashes(v => [...v, h]);
    setOpenModal(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (hashes.length === 0) {
      setError('There is no hash to send.');
      setLoading(false);
      return;
    }

    const notRes = await notarize({ hashes });

    if (notRes.error) {
      setError(notRes.error.message);
      setLoading(false);
      return;
    }

    const transRes = await transferRandom();
    if (transRes.error) {
      // this is an extra feature that is not required in proto demonstration, we can skip error
      console.error(transRes.error.message);
    }

    setLoading(false);
    setHashes([]);
    setSuccess(true);
  };

  const handleReset = async e => {
    e.preventDefault();
    setLoading(false);
    setError('');
    setHashes([]);
    setSuccess(false);
  };

  return (
    <>
      {!success && (
        <Box component={'form'} onSubmit={handleSubmit} display={'flex'} flexDirection={'column'}>
          <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <Box display={'grid'} gridTemplateColumns={'1fr 3fr'} columnGap={'50px'} pt={'50px'}>
            <Box display={'flex'} flexDirection={'column'} pt={'1rem'}>
              <Button
                variant={'contained'}
                sx={{ '&.MuiButton-contained': { backgroundColor: theme => theme.palette.grey[700] } }}
                size={'large'}
                onClick={() => setOpenModal(true)}
                fullWidth>
                Add a file hash
              </Button>

              <Typography textAlign={'center'} my={'1rem'}>
                Or
              </Typography>

              <Button
                variant={'contained'}
                sx={{ '&.MuiButton-contained': { backgroundColor: theme => theme.palette.grey[600] } }}
                size={'large'}
                onClick={handleGenerateHash}
                fullWidth>
                Add a simulated hash
              </Button>

              <Box display={'flex'} justifyContent={'center'} my={'1rem'}>
                <ArrowDown color="#9e9e9e" width="64px" height="64px" />
              </Box>

              <Button variant={'contained'} color={'darkGreen'} fullWidth type="submit" sx={{ mb: '2rem' }}>
                Notarize
              </Button>

              <Button variant={'contained'} color={'error'} onClick={handleReset} fullWidth>
                Reset All
              </Button>

              <Box height={'35px'}>
                <Typography color={'error'}>{error} </Typography>
              </Box>
            </Box>

            <Box backgroundColor={'white'} borderRadius={'5px'}>
              <List>
                {hashes.map((h, i) => (
                  <ListItem key={i}>
                    <Typography fontFamily={"'Inconsolata', monospace"}>{h}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      )}

      {success && (
        <Box width={'50%'} mx={'auto'} pt={'10%'}>
          <AnimCheck size={96} color={'#59bb9a'} />
          <Button variant={'contained'} color={'darkGreen'} onClick={handleReset} size={'large'} fullWidth>
            Add another batch
          </Button>
        </Box>
      )}

      <Modal width={'100%'} maxWidth={'460px'} height={'480px'} open={openModal} onClose={() => setOpenModal(false)}>
        <HashFile onFinish={handleAddHash} />
      </Modal>
    </>
  );
}
