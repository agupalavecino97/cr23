import * as React from "react";
import { useState } from "react";

import { Usuario } from '../models/Usuario'


import Login from './Login';
import Registro from './Registro';

import { styled } from '@mui/material/styles';

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Container from "@mui/material/Container";
// import axios from 'axios';
// import { APIs } from '../../helpers/apis';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export interface loginForm {
    email: "",
    password: "",
}

export interface registroForm {
    email: "",
    password: "",
}

export interface Props {
    open: boolean,
    handleSetopenLogin: (value: boolean) => void;
}


export default function Autenticacion({open, handleSetopenLogin}: Props) {

    const [showLogin, setShowLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleDrawerClose = () => {
        handleSetopenLogin(false)
    }


    const handleLogin = (data: Usuario) => {
        setLoading(true);

    }


    const handleRegistro = (data: Usuario) => {
        setLoading(true);

    }

    return (
        <Drawer
        className="drawer"
        sx={{
            width: "24em",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
            width: "22em",
            boxSizng: "border-box",
            border: "#0070FF",
            color: "#EEE",
            },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        >
            <DrawerHeader sx={{  backgroundColor: "#0070FF", display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4}}>
                <h1>
                    {
                        showLogin 
                        ?
                        'Login'
                        :
                        'Registro'
                    }
                </h1>
                <IconButton onClick={handleDrawerClose} size="large" sx={{color: '#eee'}}>
                    <ChevronRightIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
                <Container>
                    {
                    showLogin 
                    ?
                    <Login handleChangeView={setShowLogin} handleLogin={handleLogin} loading={loading}/>
                    :
                    <Registro handleChangeView={setShowLogin} handleRegistro={handleRegistro} loading={loading}/>
                    }
                </Container>
                 {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity={typeAlert} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                </Snackbar> */}
        </Drawer>
    );
}
