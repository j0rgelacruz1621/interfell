import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import banner from '../img/auth.jpg';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import { HomeBar } from '../home/homeBar';
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
    margin: '1%',
    
  },
  card: {
    paddingLeft: '10%'
  },
  button:{
    backgroundColor: 'rgb(245, 63, 35)',
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
    let path = `/get-invoice`; 
    history.push(path, {params:token});
  }

  return (
    <div>
      <HomeBar/>
      <br />
      <Grid container>
        <Card className={classes.root}>
        <CardActionArea>
          <Grid item xs={12}>
          <CardMedia
            className={classes.media}
            image={banner}
            title="Contemplative Reptile"
          />
          </Grid>
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
        
      </Grid> 
      
    </div>
  )
}

function initialValues() {
  return {
    username: '',
    password: ''

  } 
}