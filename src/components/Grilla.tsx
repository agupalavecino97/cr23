import React, { useState, useEffect, useCallback } from 'react'
import { data } from '../data/data';
import { Banda } from '../models/Banda';
import { LineUp } from '../models/LineUp';
import Filtros from './Filtros';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

import CheckIcon from '@mui/icons-material/Check';


import axios from 'axios';
import { APIs } from '../helpers/apis';
import { Usuario } from '../models/Usuario'
import '../styles/custom-styles.css';

const styles = {
  btn1: {
    border: '1px solid',
    color: '#EEE',
    backgroundColor: '#f06292',
    borderColor: '#f06292',
    zIndex: 0,
    '&:hover': {
      backgroundColor: '#f06292',
      borderColor: '#f06292',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#f06292',
      borderColor: '#f06292',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.1rem #f06292',
    }  
  },
  btn2: {
    border: '1px solid',
    color: '#EEE',
    backgroundColor: '#FF1D1E',
    borderColor: '#FF1D1E',
    zIndex: 0,
    '&:hover': {
      backgroundColor: '#FF1D1E',
      borderColor: '#FF1D1E',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#FF1D1E',
      borderColor: '#FF1D1E',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.1rem #FF1D1E',
    }       
  },
  btn1Outline: {
    border: '1px solid',
    color: '#f06292',
    backgroundColor: '#eee',
    borderColor: '#eee',
    zIndex: 0,
    '&:hover': {
      backgroundColor: '#f06292',
      borderColor: '#f06292',
      boxShadow: 'none',
      color: '#eee',
    },
    '&:click': {
      backgroundColor: '#f06292',
      borderColor: '#f06292',
      boxShadow: 'none',
      color: '#eee',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#f06292',
      borderColor: '#f06292',
      color: '#eee',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.1rem #f06292',
      color: '#eee',
    }  
  },
  btn2Outline: {
    border: '1px solid',
    color: '#FF1D1E',
    backgroundColor: '#eee',
    borderColor: '#eee',
    zIndex: 0,
    '&:hover': {
      backgroundColor: '#FF1D1E',
      borderColor: '#FF1D1E',
      boxShadow: 'none',
      color: '#eee',
    },
    '&:click': {
      boxShadow: 'none',
      backgroundColor: '#FF1D1E',
      borderColor: '#FF1D1E',
      color: '#eee',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#FF1D1E',
      borderColor: '#FF1D1E',
      color: '#eee',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.1rem #FF1D1E',
      color: '#eee',
    }       
  },
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
export interface Props {
  user: Usuario,
  // handleSetopenLogin: (value: boolean) => void;
}

export default function Grilla({user}: Props) {
  // const bandas = Banda.parseArray(data.bandas);

  const [dia, setDía] = React.useState('Día 1');
  const [filtro, setFiltro] = React.useState('0');
  const [bandas, setBandas] = useState(Banda.parseArray(data.bandas))
  const [bandasNoFiltered, setBandasNoFiltered] = useState(Banda.parseArray(data.bandas))
  const [lineUp, setLineUp] = useState<LineUp[]>([])
  const [bandasToAdd, setBandasToAdd] = useState<string[]>([]);
   
 
  const getLineUp = useCallback( async () => {
    try {
      axios.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem('token');
      const res = await axios.get(`${APIs.LINEUP}/${user.id}`);
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
  }, [bandas, lineUp, user.id]);

  useEffect(() => {
    if(user.id !== undefined) {
      getLineUp();
    } else {
      setDía('Día 1');
      setFiltro('0');
      setBandas(Banda.parseArray(data.bandas))
      setBandasNoFiltered(Banda.parseArray(data.bandas))
      setBandasToAdd([]);
    }
  }, [user])


  
  const handleSaveBands = async () => {
      // setLoading(true)
      try {
        axios.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem('token');
        const res = await axios.post(APIs.LINEUP, {bandas: bandasToAdd, id: user.id});
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


  const handleChangeDía = (newValue: string) => {
    setFiltro('0');
    setDía(newValue);
  };

  const handleChangeFiltro = (newValue: string) => {
    setFiltro(newValue);
    console.log(newValue);
    let bandasToFilter = [...bandasNoFiltered] 
    switch(newValue) {
      case '0':
        setBandas(bandasToFilter);
        break;
      case 'g':
        setBandas(bandasToFilter.filter( (b) => b.seleccionado === true));
        break;
      case '1':
        setBandas(bandasToFilter.filter( (b) => b.escenario === 'Escenario Norte'));
        break;
      case '2':
        setBandas(bandasToFilter.filter( (b) => b.escenario === 'Escenario Sur'));
        break;
      case '3':
        setBandas(bandasToFilter.filter( (b) => b.escenario === 'Casita del Blues'));
        break;
      case '4':
        setBandas(bandasToFilter.filter( (b) => b.escenario === 'Escenario Boomerang'));
        break;
      case '5':
        setBandas(bandasToFilter.filter( (b) => b.escenario === 'Escenario Montaña'));
          break;
      case '6':
        setBandas(bandasToFilter.filter( (b) => b.escenario === 'Escenario Paraguay'));
        break;
  }
  };

  return (
    <Stack spacing={2} sx={{mb: 6 }}>
      <Filtros dia={dia} handleChangeDía={handleChangeDía} filtro={filtro} handleChangeFiltro={handleChangeFiltro}/>
      {
        bandas.map( (banda, index) => (
          <Card key={banda.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {banda.nombre}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {banda.horaInicio}
              </Typography>
              <Chip label={banda.escenario} sx={{background: '#0070FF', color: '#eee'}}/>
            </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', mr: 1 }}>
              <Fab size="small" aria-label="add" sx={banda.seleccionado ? styles.btn2 : styles.btn2Outline} 
                  onClick={() => {
                        banda.seleccionado = true;
                        setBandas([...bandas]);
                        setBandasNoFiltered([...bandas]);
                        bandasToAdd.push(banda.id);
                        setBandasToAdd([...bandasToAdd]);
                      }
                    }>
                    {
                      banda.seleccionado 
                      ?
                      <CheckIcon />
                      :
                      <AddIcon />
                    }
              </Fab>
            </Box>
          </Card>
        ))
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
    </Stack>
  )
}
