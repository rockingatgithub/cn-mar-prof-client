import Cookies from 'js-cookie';
import React, { Component } from 'react';
import Form from './Form';
import Profile from './Profile';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state ={
      isLoggedIn: false,
      user: {}
    }
  }

  loginHandler = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true
    })
  }

  componentDidMount = async  () => {

    const token = Cookies.get('user')
    if(token) {
      const response = await fetch('http://localhost:8000/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const parsedResponse = await response.json()
      this.loginHandler(parsedResponse.data)
    }

  }
  

  render() {

    const {isLoggedIn, user} = this.state

    return (
      <>  
         {isLoggedIn ?<Profile user={user} /> : <> <Form type="signup" loginHandler={this.loginHandler} />
         <Form type="signin" loginHandler={this.loginHandler} /> </>}
      </>
    );
  }
}

export default App;