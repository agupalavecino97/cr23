import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import '../styles/custom-styles.css';


export interface Props {
  handleSetopenLogin: (value: boolean) => void;
}

export default function Navigation({handleSetopenLogin}: Props) {
  
  const handleOpen = () => { 
    handleSetopenLogin(true);
  }
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="nav">
          <h1>
            CR23
          </h1>
          <Button variant="contained" endIcon={<RocketLaunchIcon />} onClick={handleOpen}>Armar mi grilla</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
