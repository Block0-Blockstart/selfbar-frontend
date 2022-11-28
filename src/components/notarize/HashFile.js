import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { keccak256 } from '@ethersproject/keccak256';
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { betterSizeToString } from '../../utils/file';
import { reduceString } from '../../utils/strings';

export const HashFile = ({ onFinish }) => {
  const [hash, setHash] = useState([]);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const reset = () => {
    setErrorMessage('');
    setHash([]);
    setFile(null);
  };

  const onDrop = useCallback(acceptedFiles => {
    setErrorMessage('');
    const reader = new FileReader();

    reader.onload = () => {
      if (acceptedFiles.length > 1) {
        setErrorMessage('You have selected more than one file.');
        return;
      }
      try {
        const hashRes = keccak256(new Uint8Array(reader.result));
        setHash(hashRes);
        setFile(acceptedFiles[0]);
      } catch (e) {
        console.error(e);
        setErrorMessage('Error while computing file hash.');
      }
    };

    reader.onerror = err => {
      console.error(err);
      setErrorMessage('Error while computing file hash.');
    };

    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async e => {
    e.preventDefault();
    onFinish(hash);
  };

  return (
    <Box padding={'10px 50px'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} height={'100%'}>
      <Typography mb={'2rem'} variant={'h5'}>
        Add a file hash
      </Typography>

      <Box
        component={'form'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        height={'100%'}
        onSubmit={handleSubmit}>
        {!file && (
          <Box display={'flex'} flex={1} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Box
              {...getRootProps()}
              sx={{ cursor: 'pointer' }}
              display={'flex'}
              width={'100%'}
              padding={'2rem'}
              margin={'0 auto 1rem auto'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              bgcolor={'#f6f6f6'}
              border={'2px dashed'}
              borderColor={'#b0b0b0'}
              borderRadius={'15px'}>
              <input {...getInputProps()} />
              <CloudUpload sx={{ fontSize: '120px', color: '#444' }} />
              <Typography textAlign={'center'} color={'drakGreen.main'} mb={'1rem'}>
                Drop your file here
                <br />
                or click to browse your computer
              </Typography>
            </Box>
            <Typography width={'100%'} textAlign={'center'} height={'30px'} color={'error.main'} variant={'body2'}>
              {errorMessage}
            </Typography>
          </Box>
        )}

        {file && (
          <>
            <Box
              display={'grid'}
              gridTemplateColumns={'2fr 3fr'}
              rowGap={'0.5rem'}
              mb={'2rem'}
              border={'1px solid'}
              borderRadius={'15px'}
              borderColor={'darkGreen.main'}
              padding={'15px'}
              backgroundColor={'#edf8f4'}>
              <Typography variant={'body2'}>File:</Typography>
              <Typography variant={'body2'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>
                {file.name}
              </Typography>

              <Typography variant={'body2'}>File size:</Typography>
              <Typography variant={'body2'}>{betterSizeToString(file.size)}</Typography>

              <Typography variant={'body2'}>File type:</Typography>
              <Typography variant={'body2'}>{file.type}</Typography>

              <Typography variant={'body2'}>File last modified:</Typography>
              <Typography variant={'body2'}>{new Date(file.lastModified).toLocaleString()}</Typography>

              <Typography variant={'body2'}>File hash:</Typography>
              <Typography variant={'body2'} fontWeight={'700'} fontFamily={"'Inconsolata', monospace"}>
                {reduceString({ value: hash, left: 16, right: 2 })}
              </Typography>
            </Box>
            <Typography width={'100%'} textAlign={'center'} height={'30px'} color={'error.main'} variant={'body2'}>
              {errorMessage}
            </Typography>

            <Box width={'100%'} display={'flex'} justifyContent={'space-between'} columnGap={'20px'}>
              <Button type="submit" fullWidth color={'darkGreen'} variant={'contained'}>
                Add this file hash
              </Button>
              <Button type="button" fullWidth color={'error'} variant={'contained'} onClick={reset}>
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

HashFile.propTypes = { onFinish: PropTypes.func.isRequired };
