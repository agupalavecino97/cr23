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
  btn: {
    border: '1px solid',
    color: '#EEE',
    backgroundColor: '#FF1D1E',
    borderColor: '#FF1D1E',
    zIndex: 0,
  },
  btnOutline: {
    border: '1px solid',
    color: '#FF1D1E',
    backgroundColor: '#eee',
    borderColor: '#eee',
    zIndex: 0,  
  },   
}
export interface Props {
  bandas: Array<Banda>,
  handleChangeBandas: (value: Array<Banda>, value2: Banda) => void
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
                <Fab size="small" aria-label="add" sx={banda.seleccionado ? styles.btn : styles.btnOutline} 
                    onClick={() => { 
                          banda.seleccionado = !banda.seleccionado;
                          handleChangeBandas(bandas, banda);
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
