import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCounter, setProfile } from './actions';
import Form from './Form';
import Profile from './Profile';

class App extends Component {

  componentDidMount = async  () => {
    this.props.dispatch(setProfile())
  }

  setCounter = (num) => {
    this.props.dispatch(setCounter(num))
  }
  
  render() {

    console.log("state in store", this.props.main)

    const {isLoggedIn, user} = this.props.main

    return (
      <>  
         {isLoggedIn ?<Profile user={user} /> : <> <Form type="signup"  />
         <Form type="signin"  /> </>}
         <div>
           Counter value:- {this.props.main.counter}
         </div>
         <button onClick={() => this.setCounter(14)} >
Set counter
         </button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    main: state
  }
}
export default  connect(mapStateToProps)(App);