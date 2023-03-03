
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
                <IconButton color="inherit" aria-label="github" >
                  <a style={{color: 'white'}} target="_blank" rel="noreferrer" href='https://github.com/agupalavecino97'>
                    <GitHubIcon />

                  </a>
                </IconButton>
                <IconButton color="inherit" aria-label="web">
                  <a style={{color: 'white'}} target="_blank" rel="noreferrer" href='https://agustin-palavecino-portfolio.netlify.app/'>
                  <LanguageIcon />
                  </a>
                </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
