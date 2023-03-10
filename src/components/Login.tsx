import React from 'react'
import { useState, useEffect } from 'react';
import { Usuario } from '../models/Usuario'

import '../styles/custom-styles.css';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


export interface Props {
    handleChangeView: (value: boolean) => void,
    handleLogin: (data: Usuario) => void,
    loading: boolean,
}

const initialData = {
    email: "",
    password: ""
};

const severity: AlertColor = "warning";

const styles = {
    btn: {
      mt: 3, mb: 2,
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      color: '#EEE',
      backgroundColor: '#ff8f00',
      borderColor: '#ff8f00',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#ff8f00',
        borderColor: '#ff8f00',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#ff8f00',
        borderColor: '#ff8f00',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      }  
    },
    btn2: {
        cursor: 'pointer',       
    }
  }


export default function Login({handleChangeView, handleLogin, loading}: Props) {
    const [form, setForm ] = useState(initialData);
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [typeAlert, setTypeAlert] = useState(severity);

    useEffect(() => {
        setForm(initialData)
    }, [])

    const handleOpenAlert = (type: AlertColor, message: string) => {
        setTypeAlert(type);
        setMessage(message);
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleChange = (e: any) => { 
        setForm({ 
            ...form,
            [e.target.name]:e.target.value 
        });
    };

    const handleSubmit = () => {
        if (form.email === '' || form.password === '') {
            handleOpenAlert('error', 'Datos incompletos');
            return;
        }
        let user = Usuario.parseItem(form)
        handleLogin(user)
    }

    return (
        <Box
            sx={{
            marginTop: '4em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: '#ff8f00' }}>
                <LoginIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" sx={{color:'#263238'}}>
                Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contrase??a"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
            />
            <Button
                type="button"
                fullWidth
                variant="contained"
                // className='autenticationButton'
                sx={styles.btn}
                onClick={handleSubmit}
            >
                {   !loading
                    ?
                    <span> INGRESAR</span>
                    :
                    <CircularProgress color="inherit"/>
                }
            </Button>

            <Button
                // type="button"
                fullWidth
                variant="text"
                sx={styles.btn2}
                onClick={() => handleChangeView(false)}
            >
                <span><u> No tengo una cuenta </u> </span>
            </Button>

            
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeAlert} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
            </Snackbar>

            </Box>
        </Box>
    )
}
