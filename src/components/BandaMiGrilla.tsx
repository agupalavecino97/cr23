import React from 'react'
import { Banda } from '../models/Banda';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export interface Props {
  banda: Banda,
}

export default function BandaMiGrilla({ banda}: Props) {

    const obtenerEstado = ():string => {
        let fechaActual =  new Date();
        let fechaBanda = new Date(2023, 1, (obtenerDiaComienzo()), obtenerHoras(), obtenerMinutos());
        // let fechaBanda = new Date(`${(17 + dia).toString()}-02-2023`);
        let diff = (fechaBanda.getTime() - fechaActual.getTime())/(1000 * 60)
        // banda.estado = '';
        if (diff > 1440) {
            return 'Mañana';
        }
        if (diff > 90) {
            return 'Comienza en unas horas';
        }
        if (diff >= 31 && diff <= 90) {
            return 'Comienza en un rato';
        }
        if (diff > 5 && diff < 30) {
            return 'Comienza Pronto';
        }
        if (diff <= 0 && diff > -90) {
            return 'Estan tocando';
        }
        if (diff <= -181) {
            return 'Ya tocaron';
        }
        return 'Próximamente';
    }
    
    const obtenerDiaComienzo = ():number => {
        // el 5 cambiarlo a 17
        return 17 + banda.dia + (Number(banda.horaInicio.split(':')[0]) <= 2 ? 1 : 0)
    }
    const obtenerHoras = ():number => {
        return Number(banda.horaInicio.split(':')[0])
    }

    const obtenerMinutos = ():number => {
        return Number(banda.horaInicio.split(':')[1])
    }

  return (
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
        <Typography component="div" variant="h5">
            {banda.nombre}
        </Typography>
        <Typography variant="subtitle1" component="div">
            {banda.horaInicio}
        </Typography>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Chip label={banda.escenario} sx={{background: '#0070FF', color: '#eee'}}/>
            <Chip label={obtenerEstado()} sx={{mt: 2, background: '#ff8f00', color: '#eee'}}/>
        </div>
    </CardContent>
  )
}
