import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import banner from '../img/auth.jpg';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../img/logo1.png';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 545,
    margin: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: 300,
    
  },
  card: {
    paddingLeft: '10%'
  },
  button:{
    backgroundColor: '#8007A6',
    color: '#fff'
  }
  
}));

export default function Login(){
  const classes = useStyles();

  let token = '';
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }), 
    onSubmit: async formValues => {
      try{
        let encode = btoa(formValues.username+':'+formValues.password);
        var config = {
          method: 'post',
          url: 'https://apify.epayco.co/login/mail',
          headers: { 
            'Authorization': 'Basic '+ encode
          }
        };
        
        axios(config)
        .then(function (response) {
          if(response.data){
            token = response.data.token;
            routeChange();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
        
        
      } catch(error){
        console.log('error', error.message);
      }
     
    }
    
  });

  const history = useHistory();
  const routeChange = () =>{ 
    let path = `/get-bilind`; 
    history.push(path, {params:token});
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Epayco
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <br />
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={banner}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.card}>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
              <form onSubmit={formik.handleSubmit}>
              <div >
                <TextField 
                  id="outlined-basic" 
                  label="User" variant="outlined" 
                  type='text' style={{marginRight:'2%'}}
                  name="username" 
                  onChange={formik.handleChange} 
                  error={formik.errors.username && true} 
                />
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                type='password'
                name="password" 
                onChange={formik.handleChange} 
                error={formik.errors.password && true} 
                />
              </div>
              
              <br /><br />
                <Button type='submit' variant="contained" endIcon={<LoginIcon />}   size="large" className={classes.button} >
                  Login 
                </Button>
              </form>
          </CardContent>
        </CardActionArea>
        
    </Card>
    </div>
  )
}

function initialValues() {
  return {
    username: '',
    password: ''

  } 
}