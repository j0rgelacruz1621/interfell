import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import routes from './routing';
import { map } from 'lodash';

export default function Navigation(){
  return (
    <Router>
      <Switch>
        {
          map(routes, (route, index) => (
            <Route
            key={ index }
            path= { route.path }
            exact= { route.exact }
            render= { (props) => <route.component {...props} /> }
            />
          ))
        }
      </Switch>
    </Router>
  );
}