import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  AssuredWorkload as AssuredWorkloadIcon,
  BarChart as BarChartIcon,
  ChevronLeft as ChevronLeftIcon,
  FactCheck as FactCheckIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  QueryStats as QueryStatsIcon,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from '@mui/material';

import { AppBar } from '../shared/AppBar';
import { Drawer } from '../shared/Drawer';

export function DashboardLayout() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => setOpen(!open);
  const nav = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open} drawerWidth={240}>
        {/* keep right padding when drawer closed */}
        <Toolbar
          sx={{
            pr: '24px',
            backgroundColor: 'light.main',
            color: 'darkGreen.main',
          }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1}>
            <Box component={'img'} src={'./assets/img/selfbar-logo-wide-h60.png'} height={'40px'} />
          </Box>
          <Link
            color="inherit"
            target="_blank"
            href="https://mumbai.polygonscan.com/token/0x0cC868f1c9FF604F6Af627264197d073ec8Ca86f">
            <Tooltip title="SBAR Market">
              <IconButton color="inherit">
                <QueryStatsIcon sx={{ fontSize: '32px' }} />
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} drawerWidth={240} background={'darkGreen'}>
        <Toolbar
          sx={{
            backgroundColor: 'darkGreen.main',
            color: 'light.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}>
          <IconButton onClick={toggleDrawer} color="inherit">
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <List component="nav" sx={{ color: 'light.main', paddingTop: '2rem' }}>
          <ListItemButton onClick={() => nav('/notarize')}>
            <ListItemIcon sx={{ color: 'light.main' }}>
              <AssuredWorkloadIcon />
            </ListItemIcon>
            <ListItemText primary="Notarize" />
          </ListItemButton>

          <ListItemButton onClick={() => nav('/verify')}>
            <ListItemIcon sx={{ color: 'light.main' }}>
              <FactCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Verify" />
          </ListItemButton>

          <Divider sx={{ my: '2rem', mx: 'auto', backgroundColor: 'light.main', width: '80%' }} />

          <ListItemButton onClick={() => nav('/stakeholders')}>
            <ListItemIcon sx={{ color: 'light.main' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Stakeholders" />
          </ListItemButton>

          <ListItemButton onClick={() => nav('/reports')}>
            <ListItemIcon sx={{ color: 'light.main' }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>

          <Divider sx={{ mt: '2rem', mx: 'auto', backgroundColor: 'light.main', width: '80%' }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme => theme.palette.grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
