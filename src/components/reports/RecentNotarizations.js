import React, { useEffect, useRef, useState } from 'react';

import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import { getLastBatches } from '../../services/notarizationService';
import { Modal } from '../../shared/Modal';
import { Title } from '../../shared/Title';
import { toLocaleDate } from '../../utils/date';
import { reduceString } from '../../utils/strings';

import { Batch } from './Batch';

export function RecentNotarizations() {
  const [openModal, setOpenModal] = useState(false);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const getRecentNotarizations = async () => {
      const res = await getLastBatches(5); // last 5 batches
      if (res.error) console.error(res.error.message); // extra feature => skip errors
      else setRecent(res.data.sort((a, b) => b.reqTimestamp - a.reqTimestamp));
    };
    getRecentNotarizations();
  }, []);

  const currentBatch = useRef('');

  return (
    <>
      <Title>Recently Notarized</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Batch Id</TableCell>
            <TableCell>Hashes</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Chain block</TableCell>
            <TableCell align="right">Merkle Root</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recent.map(not => (
            <TableRow key={not.batchId}>
              <TableCell>{not.batchId}</TableCell>
              <TableCell>
                <Button
                  color={'darkGreen'}
                  variant={'contained'}
                  size={'small'}
                  onClick={() => {
                    currentBatch.current = not.batchId;
                    setOpenModal(true);
                  }}>
                  {not.hashes}
                </Button>
              </TableCell>
              <TableCell>{toLocaleDate(not.reqTimestamp * 1000)}</TableCell>
              <TableCell>{not.txBlock}</TableCell>
              <TableCell align="right">
                <Typography sx={{ fontFamily: "'Inconsolata', monospace" }}>
                  {reduceString({ value: not.merkleRoot, left: 16, right: 5, separator: '...' })}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal width={'100%'} maxWidth={'460px'} height={'480px'} open={openModal} onClose={() => setOpenModal(false)}>
        <Batch batchId={currentBatch.current} />
      </Modal>
    </>
  );
}
