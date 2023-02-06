import React from 'react'
import { Banda } from '../models/Banda';
import Filtros from './Filtros';
import BandaMiGrilla from './BandaMiGrilla';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

export interface Props {
  bandas: Array<Banda>,
  dia: number,
  handleChangeDía: (value: number) => void,
  filtro: string,
  handleChangeFiltro: (value: string) => void
  showMiGrilla: boolean,
  handleChangeShowMiGrilla: (value: boolean) => void
}

export default function MiGrilla({ bandas, dia, handleChangeDía, filtro, handleChangeFiltro, showMiGrilla, handleChangeShowMiGrilla}: Props) {
  
  
  const obtenerEstado = (dia: number, horaInicio: string, horaFin: string):string => {
    let fechaActual = new Date();
    let fechaBanda = new Date(`${(17 + dia).toString()}-02-2023`);
    // let fechaBanda = new Date(`${(17 + dia).toString()}-02-2023`);
    console.log(fechaActual)
    console.log(fechaBanda)
    return('Esta por comenzar')
  }

  return (
    <Stack spacing={2} sx={{mb: 6, width: '100%'}}>
      <Filtros 
        dia={dia} 
        handleChangeDía={handleChangeDía} 
        filtro={filtro} 
        handleChangeFiltro={handleChangeFiltro}
        showMiGrilla={showMiGrilla}
        handleChangeShowMiGrilla={handleChangeShowMiGrilla}
      />
      {
        bandas.map( (banda) => (
            banda.dia === dia  
            &&
            <Card key={banda.id}>
              {/* sx={{ flex: '1 0 auto' }} */}
              <BandaMiGrilla banda={banda} />
            </Card>
        ))
      }
    </Stack>
  )
}
