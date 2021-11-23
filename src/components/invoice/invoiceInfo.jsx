import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useLocation } from "react-router-dom";
import { HomeBar } from '../home/homeBar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PaymentIcon from '@mui/icons-material/Payment';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  thead:{
    backgroundColor: 'rgb(245, 63, 35)',
    color: '#fff'
  },
  tr: {
    textAlign: 'center',
    backgroundColor: '#E1DFE8'
  },
  card:{
    margin: 'auto',
    height: '670px',
    overflow: 'auto'
  },
  button:{
    backgroundColor: 'rgb(245, 63, 35)',
    color: '#fff'
  }
  
  
}));

//traer los datos de factura acomodar el css y colocar los botones de pagar
export default function InvoiceInfo() {

  const classes = useStyles();
  const location = useLocation();
  var invoices = location.state.params;
  return (
    <div>
        <HomeBar/>
        <Card className={classes.card}>
          <CardContent>
            <Table className={classes.table}>
                <Thead className={classes.thead}>
                  <Tr>
                    <Th>Factura</Th>
                    <Th>Creada</Th>
                    <Th>Vence</Th>
                    <Th>Monto$</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {invoices.map((values) => (
                        <Tr className={classes.tr}>
                      <Td>{values.billId}</Td>
                      <Td>{values.billDate}</Td>
                      <Td>{new Date(values.expirationDateFirst).toString()}</Td>
                      <Td>{values.amountFirst}</Td>
                      <Td>
                        <Button 
                          type='submit' 
                          variant="contained" 
                          endIcon={<PaymentIcon />} 
                          size="medium" 
                          className={classes.button}
                          >
                          Pagar
                        </Button>
                      </Td>
                    </Tr>
                  ))}
               
                
                
              </Tbody>
            </Table>
          </CardContent>
        </Card>
        
    </div>
    
  );
}
