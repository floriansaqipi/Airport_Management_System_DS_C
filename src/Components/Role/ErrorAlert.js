import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

export default function BasicAlerts({errorMessage}) {
  return (
    <Box display={'flex'} justifyContent={'center'}>

        <Box mt={5} width={'50%'} >
            <Alert severity="error">{errorMessage}</Alert>
        </Box>
    </Box>
  );
}