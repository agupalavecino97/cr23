import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '40%' }}>
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
                    <Button sx={{background: '#9c27b0', color: '#eee', marginTop: '1.2em', marginBottom: '1.2em'}} variant="contained" onClick={() => handleChangeShowMiGrilla(false)} endIcon={<AddIcon/>}> Agregar bandas </Button>
                    :
                    <Button sx={{background: '#9c27b0', color: '#eee', marginTop: '1.2em', marginBottom: '1.2em'}} variant="contained" onClick={() => handleChangeShowMiGrilla(true)} endIcon={<PlaylistAddCheckCircleIcon/>}>  Mi grilla </Button>
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
