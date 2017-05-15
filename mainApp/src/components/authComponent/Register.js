import React from "react"
import {Link} from "react-router-dom"

class Register extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h2>Register</h2>
        <div className="loginForm">
          <form action="/register" method="post">
            <div className="inputField">
              <input type="text" placeholder="Email" name="email" className="inputText"/>
            </div>
            <div className="inputField">
              <input type="password" placeholder="Password" name="password" className="inputText"/>
            </div>

            <div className="inputField">
              <input type="password" placeholder="Confirm Password" name="confirmPassword" className="inputText"/>
            </div>

            <div className="btnSection">
              <button className="btnSubmit">CRETATE</button>
            </div>
          </form>
          <div className="infoSection">
            <Link to="/auth/login">Back to Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
