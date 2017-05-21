import React from "react"
import {Link, Redirect} from "react-router-dom"
import utility from '../../utility/utility';


// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100) // fake async
//   }
// }

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirectToReferrer: false,
      message:""
    }

    this.postRegisterInfo = this.postRegisterInfo.bind(this);
  }


  postRegisterInfo(){
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;

    let userInfoObj = {
      email : email,
      password : password,
      confirmPassword : confirmPassword
    }
    //console.log(JSON.stringify(loginObj))

    utility.runAjaxData(function(e){
      let obj = JSON.parse(e.target.responseText);
      console.log(obj)

      if(typeof obj === "object"){
        // fakeAuth.authenticate(() => {
        //   this.setState({
        //     redirectToReferrer: true
        //    })
        // })


        this.setState({
          redirectToReferrer: true
         })

      }else{
        this.setState({
          message:obj
        })
      }



    }.bind(this), "POST", "/auth/register", JSON.stringify(userInfoObj), "application/json");
  }

  render(){
    const { redirectToReferrer } = this.state

    // here is the important part
    if (redirectToReferrer) {
      return (
        <Redirect to="/auth/login"/>
      )
    }


    return(
      <div className="authBox">
        <h2>Register</h2>
        <div className="loginForm">
          <div className="inputField">
            <input type="text" placeholder="Email" name="email" className="inputText" id="email"/>
          </div>
          <div className="inputField">
            <input type="password" placeholder="Password" name="password" className="inputText" id="password"/>
          </div>

          <div className="inputField">
            <input type="password" placeholder="Confirm Password" name="confirmPassword" className="inputText" id="confirmPassword"/>
          </div>

          <div className="btnSection">
            <button className="btnSubmit" onClick={this.postRegisterInfo}>CRETATE</button>
          </div>
          <div className="infoSection">
            <p className="message">
              {this.state.message}
            </p>
            <Link to="/auth/login">Back to Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
