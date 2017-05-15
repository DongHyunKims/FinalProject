import React from "react"
import utility from '../../utility/utility';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
//import history from 'history'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  }
}


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirectToReferrer: false
    }

    this.setLogin = this.setLogin.bind(this);
  }


  setLogin(){
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let loginObj = {
      email : email,
      password : password
    }
    //console.log(JSON.stringify(loginObj))

    utility.runAjaxData(function(e){
      let obj = JSON.parse(e.target.responseText);
      console.log(obj)

      sessionStorage.setItem('id', obj._id);
      sessionStorage.setItem('email', obj.email);

      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true })
      })

      //history.push('/');

    }.bind(this), "POST", "/login", JSON.stringify(loginObj), "application/json");
  }

  render(){

    const { redirectToReferrer } = this.state

    // here is the important part
    if (redirectToReferrer) {
      return (
        <Redirect to="/"/>
      )
    }

    return(
      <div>
        <h2>Login</h2>
        <div className="loginForm">

            <div className="inputField">
              <input type="text" placeholder="Email" name="email" id="email" className="inputText"/>
            </div>
            <div className="inputField">
              <input type="password" placeholder="Password" name="password" id="password" className="inputText"/>
            </div>
            <div className="btnSection">
              <button className="btnSubmit" onClick={this.setLogin}>SUBMIT</button>
            </div>

          <div className="infoSection">
            <Link to="/auth/register">Create an account</Link>
          </div>

        </div>
      </div>
    )
  }
}

//<a href="#" onClick={this.props.changeLoginOrRegister}>Create an account</a>
export default Login;
