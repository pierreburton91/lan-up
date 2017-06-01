import React from 'react';
import { Router } from 'react-router';
import routes from './routes';
import createBrowserHistory from 'history/createBrowserHistory'



export default class AppRoutes extends React.Component {
  render() {
  	const history = createBrowserHistory()
    return (
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
       {routes}
      </Router>
    );
  }
}