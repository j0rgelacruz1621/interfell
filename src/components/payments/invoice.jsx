import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../img/logo1.png';
import PaymentIcon from '@mui/icons-material/Payment';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  
  modal:{
    width: '70%',
  },
  result:{
    textAlign: 'right',
    borderBottom:'1px solid #D6D3D1',
    backgroundColor: '#F1ECE8',
    fontWeight: '400'
  },
  header:{
    borderBottom:'1px solid #D6D3D1',
    backgroundColor: '#F1ECE8',
    fontWeight: '600'
  },
  title:{
    textAlign: 'center',
    borderBottom:'3px solid'
  },
  img: {
    width: '50%',
    height: '50px'
  },
  button: {
    marginTop:'9%',
    backgroundColor: 'rgb(245, 63, 35)',
    color: '#fff'
  }
  
}));


export default function InvoiceDetail() {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  var invoice = location.state.params;
  var invoices = '';
  
  const [open, setOpen] = useState(true);

  const onCloseModal = async () => {
    try{
      let token = localStorage.getItem("token");;
      var data = JSON.stringify({
        "projectId": 29,
        "document": invoice.document
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
        if(response.data.data.bills.length != 0){
          invoices = response.data.data.bills;
          let path = `/invoice-info`; 
          history.push(path, {params:invoices});
        } else{
          toast.error('No existe cliente asociado a este identificador');
        }
      })
      .catch(function (error) {
        toast.error(error.message);
      });


      
    } catch(error){
    }
  }

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center  classNames={{ modal: classes.modal }}>
        <img src={Logo} alt="" className={classes.img}/>
        <h3 className={classes.title}>Usuario: {invoice.document}</h3>
        <Grid container>
          <Grid item xs={6} className={classes.header} style= {{padding: '1%'}}>
            Codigo de empresa:
          </Grid>
          <Grid item xs={6} className={classes.result} style= {{padding: '1%'}}> 
            {invoice.additionalFirst}
          </Grid>
          <Grid item xs={6} className={classes.header} style= {{padding: '1%'}}>
            Factura
          </Grid>
          <Grid item xs={6} className={classes.result} style= {{padding: '1%'}}> 
            {invoice.billId}
          </Grid>
          <Grid item xs={6} className={classes.header} style= {{padding: '1%'}}>
            Fecha de facturación:
          </Grid>
          <Grid item xs={6} className={classes.result} style= {{padding: '1%'}}> 
            {invoice.billDate}
          </Grid>
          <Grid item xs={6} className={classes.header} style= {{padding: '1%'}}>
            Fecha de vencimiento:
          </Grid>
          <Grid item xs={6} className={classes.result} style= {{padding: '1%'}}> 
            {new Date(invoice.expirationDateFirst).toString()}
          </Grid>
          <Grid item xs={6} className={classes.header} style= {{padding: '1%'}}>
            Monto $
          </Grid>
          <Grid item xs={6} className={classes.result} style= {{padding: '1%'}}> 
            {invoice.amountFirst}
          </Grid>
          <Grid item xs={6} className={classes.header} style= {{padding: '1%'}}>
            Periodos facturados:
          </Grid>
          <Grid item xs={6} className={classes.result}> 
            {invoice.descriptionFirst}
          </Grid>
          <Grid item xs={6}> 
            <Button 
            variant="contained" 
            endIcon={<PaymentIcon />} 
            size="medium" 
            className={classes.button}
            >
            Pagar
            </Button>
          </Grid>
        </Grid>
      </Modal>
      <ToastContainer />
    </div>
  );
};

