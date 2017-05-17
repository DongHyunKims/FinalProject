import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import App from './App';
import Auth from './components/authComponent/Auth';



import './index.css';

/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/


// sub route set


ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/auth" component={Auth}/>
    </Switch>
  </Router>),
  document.getElementById('root')
)
