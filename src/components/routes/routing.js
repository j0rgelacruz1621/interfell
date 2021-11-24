import GetInvoice  from '../invoice/consult';
import Login from '../auth/login';
import InvoiceInfo from '../invoice/invoiceInfo';
import InvoiceDetail from '../payments/invoice';

const routes = [
  {
    path: '/get-invoice',
    component: GetInvoice,
    exact: true
  },
  {
    path: '/invoice-info',
    component: InvoiceInfo,
    exact: true
  },
  {
    path: '/invoice-detail',
    component: InvoiceDetail,
    exact: true
  },
  {
    path: '/',
    component: Login,
    exact: true
  }
];

export default routes;