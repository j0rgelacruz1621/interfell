import GetBilind  from '../bilind/consult';
import Login from '../auth/login';

const routes = [
  {
    path: '/get-bilind',
    component: GetBilind,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  }
];

export default routes;