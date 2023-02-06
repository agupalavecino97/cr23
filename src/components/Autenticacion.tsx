import * as React from "react";
import { useState } from "react";
import axios from 'axios';
import { APIs } from '../helpers/apis';
// models
import { Usuario } from '../models/Usuario'
// components
import Login from './Login';
import Registro from './Registro';
// styles
import { styled } from '@mui/material/styles';
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Container from "@mui/material/Container";

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
    handleSetUserLogged: (value: Usuario) => void;
    setToken: (value: string) => void;
}


export default function Autenticacion({open, handleSetopenLogin, handleSetUserLogged, setToken}: Props) {

    const [showLogin, setShowLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleDrawerClose = () => {
        handleSetopenLogin(false)
    }

    const handleLogin = async (user: Usuario) => {
        setLoading(true);
        if (!user.email || !user.password) {
        //   handleOpenAlert('error', 'Datos incompletos');
          setLoading(false);
          return;
        }
        try {
          const res = await axios.post(APIs.LOGIN, user);
          if (res.data.msg) {
            console.log(res.data.msg)
            setLoading(false);
            // handleOpenAlert('error', res.data.msg);
          }
          if (res.data) {
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("userName", res.data.user.name);
            let obj = {
                id: localStorage.getItem('userId'),
                name: localStorage.getItem('userName')
            };
            handleSetUserLogged(Usuario.parseItem(obj));
            setLoading(false);
            handleDrawerClose();
          } 
        } catch (err) {
            console.error(err);
            // handleOpenAlert('error', err);
            // navigate('/');
        }
    }


    const handleRegistro = async (user: Usuario) => {
        setLoading(true);
        if (!user.email || !user.password || !user.name) {
        //   handleOpenAlert('error', 'Datos incompletos');
          setLoading(false);
          return;
        }
        try {
          const res = await axios.post(APIs.REGISTRO, user);
          if (res.data.msg) {
            console.log(res.data.msg)
            // handleOpenAlert('error', res.data.msg);
          }
          if (res.data) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.user);
            handleSetopenLogin(false)
          } 
          setLoading(false);
          
        } catch (err) {
            console.error(err);
            // handleOpenAlert('error', err);
            // navigate('/');
        }
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
