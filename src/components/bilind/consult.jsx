import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Bilind from '../img/factura.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 545,
    margin: 'auto'
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
  button: {
    marginLeft: '2%'
  }
}));

export default function GetBilind(){
  const classes = useStyles();
  const location = useLocation();
  var token = location.state.params;
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      document: Yup.string().required('Número de identificación del usuario requerido')
    }), 
    onSubmit: async formValues => {
      try{
        var data = JSON.stringify({
          "projectId": 29,
          "document": formValues.document
        });

        var config = {
          method: 'post',
          url: 'https://apify.epayco.co/billcollect/invoices/consult',
          headers: { 
            'Authorization': 'Bearer '+ token, 
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

        
        axios(config)
        .then(function (response) {
          console.log('data bilind',response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        
        
        
      } catch(error){
        console.log('error', error.message);
      }
     
    }
    
  });

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
            image={Bilind}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Consulta tu factura
            </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField 
                  id="outlined-basic" 
                  label="Número de identificación del usuario" 
                  variant="outlined" 
                  type='text' style={{marginRight:'2%'}}
                  name="document" 
                  onChange={formik.handleChange} 
                  error={formik.errors.document && true} 
                />
                <Button type='submit' variant="contained" endIcon={<SendIcon />} size="large" className={classes.button} style={{float:'right'}}>
                  Consultar
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
    document: ''

  } 
}