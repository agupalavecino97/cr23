import React, { useState, useEffect} from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
import Autenticacion from './Autenticacion';
import Grilla from './Grilla';
import MiGrilla from './MiGrilla';
// MUI
import Grid from "@mui/material/Grid";
import { Usuario } from '../models/Usuario'


export default function Home() {
    const [openLogin, setOpenLogin] = useState(false);
    const [showMiGrilla, setShowMiGrilla] = useState(false);
    const [userLogged, setUserLogged] = useState(new Usuario());
    
    useEffect(() => {
        if(localStorage.getItem("token")) {
            let obj = {
                id: localStorage.getItem('userId'),
                name: localStorage.getItem('userName')
            };
            setUserLogged(Usuario.parseItem(obj));        }
    }, [setUserLogged])

    const handleSetopenLogin = (value: boolean): void => {
        setOpenLogin(value);
    }

    const handleSetUserLogged = (value: Usuario): void => {
        setUserLogged(value);
    }

    const handleLogOut = () => {
        // this.props.history.push(this.props.match.url)
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        setUserLogged(new Usuario());
        window.location.reload()
        
      }

    return (
        <React.Fragment>
            <Navigation handleSetopenLogin={handleSetopenLogin} user={userLogged} setShowMiGrilla={setShowMiGrilla} handleLogOut={handleLogOut}/>
            <Grid container>
                {
                    showMiGrilla 
                    ?
                    <MiGrilla/>
                    :
                    <Grilla user={userLogged}/>
                }
                <Autenticacion open={openLogin} handleSetopenLogin={handleSetopenLogin} handleSetUserLogged={handleSetUserLogged}/>
            </Grid>
            <Footer/>
        </React.Fragment>
    )
}
