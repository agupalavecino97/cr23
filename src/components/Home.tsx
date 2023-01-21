import React, {useState} from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
import Autenticacion from './Autenticacion';


// MUI
import Grid from "@mui/material/Grid";


export default function Home() {
    const [openLogin, setopenLogin] = useState(false)


    const handleSetopenLogin = (value: boolean): void => {
        setopenLogin(value);
    }

    return (
        <React.Fragment>
            <Navigation handleSetopenLogin={handleSetopenLogin}/>

            <Grid container>
                <Autenticacion open={openLogin} handleSetopenLogin={handleSetopenLogin}/>
            </Grid>
            <Footer/>
        </React.Fragment>
    )
}
