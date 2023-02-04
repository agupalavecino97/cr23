import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface Props {
    dia: string,
    handleChangeDía: (value: string) => void,
    filtro: string,
    handleChangeFiltro: (value: string) => void,
  }

export default function Filtros({dia, handleChangeDía, filtro, handleChangeFiltro}:Props) {
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        handleChangeDía(newValue);
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        handleChangeFiltro(event.target.value);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Tabs
            value={dia}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            >
            <Tab value="Día 1" label="Día 1" />
            <Tab value="Día 2" label="Día 2" />
            </Tabs>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Filtrar</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={filtro}
                    onChange={handleChangeSelect}
                    label="Filtrar"
                >
                <MenuItem value={'0'}>
                    <em>Ver Todo</em>
                </MenuItem>
                <MenuItem value={'g'}>Mi Grilla</MenuItem>
                <MenuItem value={'1'}>Escenario Norte</MenuItem>
                <MenuItem value={'2'}>Escenario Sur</MenuItem>
                <MenuItem value={'3'}>Casita del Blues</MenuItem>
                <MenuItem value={'4'}>Escenario Boomerang</MenuItem>
                <MenuItem value={'5'}>Escenario Montaña</MenuItem>
                <MenuItem value={'6'}>Escenario Paraguay</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
