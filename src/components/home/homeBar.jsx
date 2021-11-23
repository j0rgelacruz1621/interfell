import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../img/logo.png';
import CardMedia from '@mui/material/CardMedia';

const useStyles = makeStyles((theme) => ({
  
  appBar:{
    backgroundColor: 'rgb(245, 63, 35)'
  }
  
}));

export function HomeBar(){
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            Epayco
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}