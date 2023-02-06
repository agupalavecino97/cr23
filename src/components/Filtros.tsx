import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface Props {
    dia: number,
    handleChangeDía: (value: number) => void,
    filtro: string,
    handleChangeFiltro: (value: string) => void,
    showMiGrilla: boolean,
    handleChangeShowMiGrilla: (value: boolean) => void,
  }

export default function Filtros({dia, handleChangeDía, filtro, handleChangeFiltro, showMiGrilla, handleChangeShowMiGrilla}:Props) {
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        handleChangeDía(newValue);
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        handleChangeFiltro(event.target.value);
    };

    return (
        <Stack>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '50%' }}>
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
                    <MenuItem value={'1'}>Escenario Norte</MenuItem>
                    <MenuItem value={'2'}>Escenario Sur</MenuItem>
                    <MenuItem value={'3'}>Casita del Blues</MenuItem>
                    <MenuItem value={'4'}>Escenario Boomerang</MenuItem>
                    <MenuItem value={'5'}>Escenario Montaña</MenuItem>
                    <MenuItem value={'6'}>Escenario Paraguay</MenuItem>
                    </Select>
                </FormControl>
                {
                    showMiGrilla
                    ?
                    <Chip sx={{background: '#0070FF', color: '#eee', width: '37%', marginTop: '1.2em'}} 
                     label="Armar Grilla" 
                     onClick={() => handleChangeShowMiGrilla(false)}
                    />
                    :
                    <Chip sx={{background: '#0070FF', color: '#eee', width: '37%', marginTop: '1.2em'}} 
                     label="Mi Grilla" 
                     onClick={() => handleChangeShowMiGrilla(true)}
                    />
                }
                
            </Box>
            <Tabs
                value={dia}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                >
                <Tab sx={{ width: '50%'}} value={1} label="Día 1" />
                <Tab sx={{ width: '50%'}} value={2} label="Día 2" />
            </Tabs>
        </Stack>
       
    )
}
