import React, { useState, useEffect, useCallback } from 'react';

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
import Fab from '@mui/material/Fab';

const styles = {
    btnGuardar: {
      border: '1px solid',
      color: '#eee',
      backgroundColor: '#0070FF',
      borderColor: '#0070FF',
      zIndex: 1,
      position: 'absolute',
      bottom: '15px',
      right: '15px',
      '&:hover': {
        backgroundColor: '#0070FF',
        borderColor: '#0070FF',
        boxShadow: 'none',
        color: '#eee',
      },
      '&:click': {
        boxShadow: 'none',
        backgroundColor: '#0070FF',
        borderColor: '#0070FF',
        color: '#eee',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0070FF',
        borderColor: '#0070FF',
        color: '#eee',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.1rem #0070FF',
        color: '#eee',
      }       
    },
  }

export default function Home() {
    const [openLogin, setOpenLogin] = useState(false);
    const [showMiGrilla, setShowMiGrilla] = useState(true);
    const [userLogged, setUserLogged] = useState(new Usuario());
    
    const [dia, setDia] = useState(1);
    const [filtro, setFiltro] = useState('0');
    const [bandas, setBandas] = useState(Banda.parseArray(data.bandas))
    const [bandasNoFiltered, setBandasNoFiltered] = useState(Banda.parseArray(data.bandas))
    // const [lineUp, setLineUp] = useState<LineUp[]>([])
    const [bandasToAdd, setBandasToAdd] = useState<string[]>([]);
    const [token, setToken] = useState('')

    const getLineUp = useCallback( async () => {
        try {
          axios.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem('token');
          const res = await axios.get(`${APIs.LINEUP}/${userLogged.id}`);
          LineUp.parseArray(res.data.data).forEach( 
            (elem) => {
              let b = bandas.find((banda) => Number(banda.id) === Number(elem.bandaId));
              if (b !== undefined) {
                b.seleccionado = true;
              }
              setBandas([...bandas]);
              setBandasNoFiltered([...bandas])
            }
          )
      } catch (error){
          console.log(error)
      // setLoading(false)
      }
    }, [bandas, userLogged]);

    // const getLineUp = async () => {
    //     try {
    //       axios.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem('token');
    //       const res = await axios.get(`${APIs.LINEUP}/${userLogged.id}`);
    //       LineUp.parseArray(res.data.data).forEach( 
    //         (elem) => {
    //           let b = bandas.find((banda) => Number(banda.id) === Number(elem.bandaId));
    //           if (b !== undefined) {
    //             b.seleccionado = true;
    //           }
    //           setBandas([...bandas]);
    //           setBandasNoFiltered([...bandas])
    //         }
    //       )
    //   } catch (error){
    //       console.log(error)
    //   // setLoading(false)
    //     }
    // }

    useEffect(() => {
        bandas.forEach( b => {
            
        })
        // getLineUp();
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
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
        }
    }, [token])

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
        // setLoading(true)
        try {
        axios.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem('token');
        const res = await axios.post(APIs.LINEUP, {bandas: bandasToAdd, id: userLogged.id});
            console.log(res)  
        // if (res.data) {
                // data.map( (elem: string) => (

                // ))
                // setLoading(false)
            // }
        } catch (error){
            console.log(error)
        // setLoading(false)
            }
    }

    const handleChangeBandas = (bandas: Array<Banda>, bandaId: number) => {
        setBandas([...bandas])
        setBandasNoFiltered([...bandas]);
        bandasToAdd.push(bandaId.toString());
        setBandasToAdd([...bandasToAdd]);
    }

    const HandleSetToken = (data: string) => {
        setToken(data)
    }

    return (
        <React.Fragment>
            <Navigation handleSetopenLogin={handleSetopenLogin} user={userLogged} setShowMiGrilla={setShowMiGrilla} handleLogOut={handleLogOut}/>
            <Grid container>
                {
                    showMiGrilla 
                    ?
                    <MiGrilla 
                        bandas={bandas.filter((b: Banda) => b.seleccionado)} 
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
                    bandasToAdd.length > 0 
                    &&
                    <Fab  
                    variant="extended"
                    sx={styles.btnGuardar}          
                    onClick={handleSaveBands}>
                    Guardar datos 
                    <SaveIcon sx={{ml: 2}}/>
                    </Fab>
                }
                <Autenticacion open={openLogin} handleSetopenLogin={handleSetopenLogin} handleSetUserLogged={handleSetUserLogged} setToken={HandleSetToken}/>
            </Grid>
            <Footer/>
        </React.Fragment>
    )
}
