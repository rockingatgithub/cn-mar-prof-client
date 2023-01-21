import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCounter, setProfile } from './actions';
import Form from './Form';
import Profile from './Profile';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import GoogleAuth from './GoogleLogin';

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
      <BrowserRouter>  
         {/* {isLoggedIn ?<Profile user={user} /> : <> <Form type="signup"  />
         <Form type="signin"  /> </>} */}
         
         <Routes>
           <Route path='/signin' element={<Form type="signin"  />}  />
           <Route path='/signup' element={<Form type="signup"  />}  />
           <Route path='/profile' element={<Profile user={user} />}  />
           <Route path='/googleAuth' element={<GoogleAuth />}  />

           <Route path='/:id' element={<Test/>} />

         </Routes>

         <Link to='/signin' > Signin Page </Link>
         <Link to='/signup' > Signup Page </Link>
         <Link to='/googleAuth' > Google Auth </Link>



      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    main: state
  }
}
export default  connect(mapStateToProps)(App);


const Test = () => {

  const {id} = useParams()

  return <div>{id}</div>

}