import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface Props {
    when: boolean;
}

const Loader = ({ when }: Props) => {
  if (when) {
    return (
        <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(5px)',
                position: 'absolute',
                top: '93px',
                width: '100%',
                height: '100%',
            }}>
            <CircularProgress />
            <Typography variant="h5" component="h5">
                Cargando datos...
            </Typography>
            <Typography variant="h5" component="h5">
                puede de tardar unos minutos...
            </Typography>
        </Box>
    );
  }

  return null;
};

export default Loader;