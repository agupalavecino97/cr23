import React from 'react'
import Filtros from './Filtros';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';


import CheckIcon from '@mui/icons-material/Check';


import { Banda } from '../models/Banda';

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
  bandas: Array<Banda>,
  handleChangeBandas: (value: Array<Banda>, value2: number) => void
  dia: number,
  handleChangeDía: (value: number) => void,
  filtro: string,
  handleChangeFiltro: (value: string) => void,
  showMiGrilla: boolean,
  handleChangeShowMiGrilla: (value: boolean) => void,
}

export default function Grilla({ bandas, handleChangeBandas, dia, handleChangeDía, filtro, handleChangeFiltro, showMiGrilla, handleChangeShowMiGrilla}: Props) {
 
  return (
    <Stack spacing={2} sx={{mb: 6, width: '100%'}}>
      <Filtros dia={dia} handleChangeDía={handleChangeDía} filtro={filtro} handleChangeFiltro={handleChangeFiltro} showMiGrilla={showMiGrilla} handleChangeShowMiGrilla={handleChangeShowMiGrilla}/>
      {
        bandas.map( (banda) => (
            banda.dia === dia 
            &&
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
                          handleChangeBandas(bandas, banda.id);
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
    </Stack>
  )
}
