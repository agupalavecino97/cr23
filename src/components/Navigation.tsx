import * as React from 'react';
import '../styles/custom-styles.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Usuario } from '../models/Usuario'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
export interface Props {
  handleSetopenLogin: (value: boolean) => void;
  user: Usuario;
  setShowMiGrilla: (value: boolean) => void;
  handleLogOut: () => void;
}

export default function Navigation({handleSetopenLogin, user, setShowMiGrilla, handleLogOut}: Props) {
  
  const handleLogIn = () => { 
    handleSetopenLogin(true);
  }

  const handleClickLogOut = () => {
    handleLogOut();
  }

  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="nav">
          <h1>
            CR23
          </h1>
          {
            user.name === undefined 
            ?
            <Button variant="contained" endIcon={<LoginIcon />} onClick={handleLogIn}>Armar mi grilla</Button>
            :
            <Button variant="contained" endIcon={<LogoutIcon />} onClick={handleClickLogOut}>Salir</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
