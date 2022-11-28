import { Grid, Paper } from '@mui/material';

import { HashChart } from './reports/HashChart';
import { Payments } from './reports/Payments';
import { RecentNotarizations } from './reports/RecentNotarizations';

export const Reports = () => {
  return (
    <>
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <RecentNotarizations />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <HashChart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Payments />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
