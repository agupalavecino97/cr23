
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

import '../styles/custom-styles.css';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="footer">
        <Toolbar className="footer-toolbar">
            <span> Desarollado por Agustín Palavecino</span>
            <div> 
                <IconButton color="inherit" aria-label="github">
                    <GitHubIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="web">
                <   LanguageIcon />
                </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
