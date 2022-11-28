/* eslint-disable no-unused-vars */
import { Drawer as MuiDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => !['open', 'drawerWidth', 'background'].includes(prop),
})(({ theme, open, drawerWidth, background }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: theme.palette[background].main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
