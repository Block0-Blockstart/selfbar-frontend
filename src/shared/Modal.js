import PropTypes from 'prop-types';

import { Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton, Modal as MUIModal, styled } from '@mui/material';

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 4px;
  padding: 0;
  overflow: auto;
  outline: none;
`;

export const Modal = ({
  backgroundColor = 'light.main',
  width = 'fit-content',
  height = 'auto',
  minWidth = 'auto',
  maxWidth = 'auto',
  minHeight = 'auto',
  maxHeight = 'auto',
  border = 0,
  borderColor = 'black',
  closeButton = true,
  ...props
}) => {
  return (
    <MUIModal {...props}>
      <ModalBox
        backgroundColor={backgroundColor}
        width={width}
        height={height}
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        sx={{ boxShadow: 24, border: border, borderColor: borderColor }}>
        <Box display={'flex'} flexDirection={'column'} height={'100%'} width={'100%'} justifyContent={'space-between'}>
          {closeButton && (
            <Box width={'100%'} height={'32px'} display={'flex'} justifyContent={'flex-end'} padding={'12px 12px 0 0'}>
              <IconButton
                onClick={props.onClose}
                sx={{
                  color: theme => theme.palette.grey[700],
                  height: '24px',
                  width: '24px',
                }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Box flex={1}>{props.children}</Box>
        </Box>
      </ModalBox>
    </MUIModal>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  height: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.number,
  borderColor: PropTypes.string,
  closeButton: PropTypes.bool,
};
