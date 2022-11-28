import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material';

import { getHashesByBatch } from '../../services/notarizationService';
import { reduceString } from '../../utils/strings';

const TipContent = {
  COPY: 'Copy to clipboard',
  DONE: 'Copied!',
};

export function Batch({ batchId }) {
  const [hashes, setHashes] = useState([]);
  const [tipContent, setTipContent] = useState(TipContent.COPY);

  useEffect(() => {
    const getHashes = async () => {
      const res = await getHashesByBatch(batchId);
      if (res.error) console.error(res.error.message); // extra feature => skip errors
      else setHashes(res.data);
    };
    getHashes();
  }, [batchId]);

  const handleCopyToClipboard = val => {
    navigator.clipboard.writeText(val);
    setTipContent(TipContent.DONE);
  };

  return (
    <>
      <Box padding={'10px 50px'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
        <Typography mb={'1rem'} variant={'h5'}>
          Batch n° {reduceString({ value: batchId, left: 14, right: 2 })}
        </Typography>
        <List dense={true}>
          {hashes.map((h, i) => (
            <ListItem key={i} sx={{ display: 'flex', columnGap: '2rem', paddingLeft: '0.2rem' }}>
              <Typography sx={{ fontFamily: "'Inconsolata', monospace", fontSize: '1rem', wordWrap: 'break-word' }}>
                {reduceString({ value: h, left: 16, right: 5 })}
              </Typography>
              <Tooltip title={tipContent} placement={'left'} onMouseOut={() => setTipContent(TipContent.COPY)}>
                <IconButton
                  sx={{ color: 'darkGreen.main', marginTop: '-5px', marginRight: '-5px' }}
                  onClick={() => handleCopyToClipboard(h)}>
                  <ContentCopyIcon sx={{ fontSize: '22px' }} />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

Batch.propTypes = { batchId: PropTypes.string.isRequired };
