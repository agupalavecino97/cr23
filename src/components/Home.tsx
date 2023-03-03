import React, { useState, useEffect, SyntheticEvent } from 'react';

import { data } from '../data/data';
import axios from 'axios';
import { APIs } from '../helpers/apis';

// models
import { Usuario } from '../models/Usuario'
import { LineUp } from '../models/LineUp';
import { Banda } from '../models/Banda';
// components
import Navigation from './Navigation';
import Footer from './Footer';
import Autenticacion from './Autenticacion';
import Grilla from './Grilla';
import MiGrilla from './MiGrilla';
// MUI
import Grid from "@mui/material/Grid";
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Loader from './Loader';

const styles = {
    btnGuardar: {
      border: '1px solid',
      color: '#eee',
      backgroundColor: '#9c27b0',
      borderColor: '#9c27b0',
      zIndex: 1,
      position: 'fixed',
      bottom: '6em',
      right: '25%',
      '&:hover': {
        backgroundColor: '#9c27b0',
        borderColor: '#9c27b0',
        boxShadow: 'none',
        color: '#eee',
      },
      '&:click': {
        boxShadow: 'none',
        backgroundColor: '#9c27b0',
        borderColor: '#9c27b0',
        color: '#eee',
      },
    },
  }

export default function Home() {
    const [openLogin, setOpenLogin] = useState(false);
    const [showMiGrilla, setShowMiGrilla] = useState(true);
    const [userLogged, setUserLogged] = useState(new Usuario());
    
    const [dia, setDia] = useState(1);
    const [filtro, setFiltro] = useState('0');
    const [bandas, setBandas] = useState(Banda.parseArray(data.bandas).reverse())
    const [bandasNoFiltered, setBandasNoFiltered] = useState(Banda.parseArray(data.bandas).reverse())
    // const [lineUp, setLineUp] = useState<LineUp[]>([])
    const [bandasToAdd, setBandasToAdd] = useState<string[]>([]);
    const [bandasToRemove, setBandasToRemove] = useState<string[]>([]);
    const [token, setToken] = useState('')

    const [openMsg, setOpenMsg] = useState(false);
    const [typeAlert, setTypeAlert] = useState(undefined);
    const [message, setMessage] = useState("");
  
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(false);
        if (localStorage.getItem('token') && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
            setToken(localStorage.getItem('token') || '')
        }
        if(token !== null) {
            let obj = {
                id: localStorage.getItem('userId'),
                name: localStorage.getItem('userName')
            };
            setUserLogged(Usuario.parseItem(obj));
            getLineUp();        
        } else {
            setDia(1);
            setFiltro('0');
            setBandas(Banda.parseArray(data.bandas))
            setBandasNoFiltered(Banda.parseArray(data.bandas))
            setBandasToAdd([]);
            setBandasToRemove([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const getLineUp = async () => {
        try {
          setLoading(true);
          let grilla = []
          if (localStorage.getItem('grilla')) {
            grilla = localStorage.getItem('grilla')!.split(',');
          } else {
            axios.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem('token');
            const res = await axios.get(`${APIs.LINEUP}/${userLogged.id}`);
            grilla = res.data.data; 
          }
          
          LineUp.parseArray(grilla).forEach( 
            (elem) => {
              let b = bandas.find((banda) => Number(banda.id) === Number(elem.bandaId));
              if (b !== undefined) {
                b.seleccionado = true;
              }
              setBandas([...bandas]);
              setBandasNoFiltered([...bandas])
            }
          );
          setLoading(false);
      } catch (error){
            setLoading(false);
            console.log('error', error);
      }
    }

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

    const handleChangeDía = (newValue: number) => {
        setFiltro('0');
        setDia(newValue);
    };

    const handleChangeShowMiGrilla = (newValue: boolean) => {
        setShowMiGrilla(newValue);
    };
    
    const handleChangeFiltro = (newValue: string) => {
    setFiltro(newValue);
    let bandasToFilter = [...bandasNoFiltered] 
    switch(newValue) {
        case '0':
        setBandas([...bandasToFilter]);
        break;
        case 'g':
        setBandas([...bandasToFilter.filter( (b) => b.seleccionado === true)]);
        break;
        case '1':
        setBandas([...bandasToFilter.filter( (b) => b.escenario === 'Escenario Norte')]);
        break;
        case '2':
        setBandas([...bandasToFilter.filter( (b) => b.escenario === 'Escenario Sur')]);
        break;
        case '3':
        setBandas([...bandasToFilter.filter( (b) => b.escenario === 'La Casita del Blues')]);
        break;
        case '4':
        setBandas([...bandasToFilter.filter( (b) => b.escenario === 'Escenario Boomerang')]);
        break;
        case '5':
        setBandas([...bandasToFilter.filter( (b) => b.escenario === 'Escenario Montaña')]);
            break;
        case '6':
        setBandas([...bandasToFilter.filter( (b) => b.escenario === 'Escenario Paraguay')]);
        break;
    }
    };

     
    const handleSaveBands = async () => {
        setLoading(true);
        guardarLocal();
        try {
        axios.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem('token');
        const res = await axios.post(APIs.LINEUP, {bandasToAdd: bandasToAdd, bandasToRemove: bandasToRemove, id: userLogged.id});
        if (res.data.msg) {
            handleOpenAlert('success', res.data.msg);
        } 
        if (res.data.error) {
            handleOpenAlert('error', res.data.msg);
        } 
        setLoading(false);
        setBandasToAdd([]);
        setBandasToRemove([]);
        } catch (error){
            console.log('error', error);
            setLoading(false);
        }
    }

    const guardarLocal = () => {
        console.log(bandasToAdd)
        let grilla = localStorage.getItem('grilla')?.split(',')
        if (bandasToRemove.length > 0) {
            bandasToRemove.map( (b) => (
                grilla = grilla?.filter( g => g === b.toString()) 
            ));
        }
        if (grilla) {
            bandasToAdd.concat(grilla)
        }
        let ids = ''
        if (bandasToAdd.length > 0) {
            bandasToAdd.map( b => ids = ids + ','+ b );
        }
        console.log(ids);
        localStorage.setItem('grilla', localStorage.getItem('grilla') ? localStorage.getItem('grilla') + ids : ids);

    }

    const handleChangeBandas = (bandas: Array<Banda>, banda: Banda) => {
        setBandas([...bandas])
        setBandasNoFiltered([...bandas]);
        if (banda.seleccionado) {
            deleteFromRemove(banda.id.toString());
            bandasToAdd.push(banda.id.toString());
        } else {
            deleteFromAdd(banda.id.toString());
            bandasToRemove.push(banda.id.toString());
        }
        setBandasToAdd([...bandasToAdd]);
        setBandasToRemove([...bandasToRemove]);
    }

    const HandleSetToken = (data: string) => {
        setToken(data)
    }

    const deleteFromRemove = (id: string) => {
        let index = bandasToRemove.findIndex( (b) => b === id);
        if (index !== -1) {
            bandasToRemove.splice(index, 1);
        }
        setBandasToRemove([...bandasToRemove])
    }

    const deleteFromAdd = (id: string) => {
        let index = bandasToAdd.findIndex( (b) => b === id);
        if (index !== -1) {
            bandasToAdd.splice(index, 1);
        }
        setBandasToAdd([...bandasToAdd])
    }

    const handleOpenAlert = (type: any, message: string) => {
        setTypeAlert(type);
        setMessage(message);
        setOpenMsg(true);
    };

    const handleCloseSnackbar = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
        setOpenMsg(false);
    };

    const handleCloseAlert = (event: Event | SyntheticEvent<any, Event>) => {
        setOpenMsg(false);
    };

    return (
        <React.Fragment>
            <Navigation handleSetopenLogin={handleSetopenLogin} user={userLogged} setShowMiGrilla={setShowMiGrilla} handleLogOut={handleLogOut}/>
            <Grid container>
            {
                showMiGrilla 
                ?
                <MiGrilla 
                    bandas={bandas.reverse().filter((b: Banda) => b.seleccionado)} 
                    dia={dia} 
                    handleChangeDía={handleChangeDía} 
                    filtro={filtro} 
                    handleChangeFiltro={handleChangeFiltro}
                    showMiGrilla={showMiGrilla}
                    handleChangeShowMiGrilla={handleChangeShowMiGrilla}
                />
                :
                <Grilla 
                    bandas={bandas} 
                    handleChangeBandas={handleChangeBandas} 
                    dia={dia} 
                    handleChangeDía={handleChangeDía} 
                    filtro={filtro} 
                    handleChangeFiltro={handleChangeFiltro}
                    showMiGrilla={showMiGrilla}
                    handleChangeShowMiGrilla={handleChangeShowMiGrilla}
                />
            }
            {
                (bandasToAdd.length > 0 || bandasToRemove.length > 0) 
                &&
                <Button 
                    sx={styles.btnGuardar} 
                    variant="contained" 
                    onClick={handleSaveBands}
                    endIcon={<SaveIcon/>}>  
                    Guardar Cambios 
                </Button>
            }
                <Autenticacion open={openLogin} handleSetopenLogin={handleSetopenLogin} handleSetUserLogged={handleSetUserLogged} setToken={HandleSetToken}/>
                <Snackbar
                    open={openMsg}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    >
                    <Alert
                        onClose={handleCloseAlert}
                        severity={typeAlert}
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </Grid>
            <Loader when={loading} />
            <Footer/>
        </React.Fragment>
    )
}
