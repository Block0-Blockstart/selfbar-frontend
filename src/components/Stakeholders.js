import { Grid, Paper } from '@mui/material';

import { StakeholdersTable } from './stakeholders/StakeholdersTable';

export const Stakeholders = () => {
  return (
    <>
      <Grid container spacing={3}>
        {/* Stakeholders table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <StakeholdersTable />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
