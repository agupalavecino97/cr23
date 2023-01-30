import React, {useState} from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
import Autenticacion from './Autenticacion';
import Grilla from './Grilla';
import MiGrilla from './MiGrilla';
// MUI
import Grid from "@mui/material/Grid";


export default function Home() {
    const [openLogin, setOpenLogin] = useState(false);
    const [showMiGrilla, setShowMiGrilla] = useState(false);

    const handleSetopenLogin = (value: boolean): void => {
        setOpenLogin(value);
    }

    return (
        <React.Fragment>
            <Navigation handleSetopenLogin={handleSetopenLogin}/>
            <Grid container>
                {
                    showMiGrilla 
                    ?
                    <MiGrilla/>
                    :
                    <Grilla/>
                }
                <Autenticacion open={openLogin} handleSetopenLogin={handleSetopenLogin}/>
            </Grid>
            <Footer/>
        </React.Fragment>
    )
}
