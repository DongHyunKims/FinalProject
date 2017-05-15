import React from "react"
import {Route} from 'react-router-dom';

import Login from "./Login"
import Register from "./Register"

import "./auth.css"

class Auth extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="authWrap">
        <section className="authSection">
          <h1>Jinniecast</h1>

          <Route path="/auth/login" component={Login}/>
          <Route path="/auth/register" component={Register}/>

        </section>
      </div>
    )
  }
}
// {this.state.loginOrRegister ? <Login changeLoginOrRegister={this.changeLoginOrRegister}/> : <Register changeLoginOrRegister={this.changeLoginOrRegister}/>}

export default Auth;
