import React, { useEffect } from 'react'
import { Banda } from '../models/Banda';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export interface Props {
  banda: Banda,
}

export default function BandaMiGrilla({ banda}: Props) {

    const obtenerFechaActual = ():Date => {
        return new Date()
    }

    useEffect(() => {
        let fechaActual = obtenerFechaActual();
        let fechaBanda = new Date(2023, 1, (obtenerDiaComienzo()), obtenerHoras(), obtenerMinutos());
        // let fechaBanda = new Date(`${(17 + dia).toString()}-02-2023`);
        let diff = (fechaBanda.getTime() - fechaActual.getTime())/(1000 * 60)
        banda.estado = '';
        if (diff >= 31 && diff < 90) {
            banda.estado = 'Comienza en un rato';
        }
        if (diff > 5 && diff < 30) {
            banda.estado = 'Comienza Pronto';
        }
        if (diff <= 0 && diff > -90) {
            banda.estado = 'Estan tocando';
        }
        if (diff <= -181) {
            banda.estado = 'Ya tocaron';
        }
    }, [obtenerFechaActual])
    
    
    const obtenerDiaComienzo = ():number => {
        // el 5 cambiarlo a 17
        return 5 + (banda.horaInicio.split(':')[0] === '0' ? 2 : 1)
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
            {
                banda.estado !== ''
                &&
                <Chip label={banda.estado} sx={{mt: 2, background: '#ff8f00', color: '#000'}}/>
            }
        </div>
    </CardContent>
  )
}
