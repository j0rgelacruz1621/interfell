import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Bilind from '../img/factura.jpg';
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HomeBar } from '../home/homeBar';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';

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
    margin: '1%',
    backgroundColor: 'rgb(245, 63, 35)',
    color: '#fff',
  },
  input: {
    margin: '1%',
  }
}));

export default function GetInvoice(){

  const classes = useStyles();
  const location = useLocation();
  var token = location.state.params;
  let invoices = '';
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      document: Yup.string().required('Número de identificación del usuario requerido')
    }), 
    onSubmit: async formValues => {
      try{
        token = token;
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
        await axios(config)
        .then(function (response) {
          if(response.data){
            invoices = response.data.data.bills;
            routeChange();
            console.log('data bilind',invoices);
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
    let path = `/invoice-info`; 
    history.push(path, {params:invoices});
  }

  return (
    <div>
      <HomeBar />
      <br />
      <Grid container>
      <Grid item xs={12} justifyContent="center" alignItems="center">
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
                      type='text' 
                      name="document"
                      className={classes.input} 
                      onChange={formik.handleChange} 
                      error={formik.errors.document && true} 
                    />
                    <Button 
                      type='submit' 
                      variant="contained" 
                      endIcon={<SendIcon />} 
                      size="large" 
                      className={classes.button}
                      >
                      Consultar
                    </Button>
                </form>
            </CardContent>
          </CardActionArea>
          
        </Card>
        </Grid>
      </Grid>
    </div>
  )
}

function initialValues() {
  return {
    document: ''

  } 
}