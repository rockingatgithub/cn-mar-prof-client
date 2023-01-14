import React from 'react'
import { connect } from 'react-redux';
import { userLogin } from './actions';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            name: '',
            email: '',
            password: '',
            userType: '',

        }
        this.setIntervalId = ''
    }

    // componentDidMount = () => {
    //    this.setIntervalId = setInterval(() => console.log("this is in form component!"), 1000)
    // }

    // componentWillUnmount = () => {
    //     clearInterval(this.setIntervalId)
    // }

    nameChangeHandler = (event) => {
        this.setState({name: event.target.value})
    }

    emailChangeHandler = (event) => {
        this.setState({email: event.target.value})
    }

    passwordChangeHandler = (event) => {
        this.setState({password: event.target.value})
    }

    submitHandler = async (event) => {
        event.preventDefault()
        const { name, email, password, userType } = this.state
        const { type } = this.props
        let user = {
            name: name,
            email: email,
            password: password
        }
        this.props.dispatch(userLogin(user, type, userType))
    }

    userTypeHandler = (event) => {
        this.setState({userType: event.target.value})
    }
    

    render () {

        const { name, email, password } = this.state
        const { type } = this.props

        return <div>

                <h2> User {type} form </h2>

                <form onSubmit={this.submitHandler} >
                   { type === 'signup' && <> Name:-<input type="text" name='name' value={name} onChange={this.nameChangeHandler} /> </> }
                    Email:-<input type="email" name='email' value={email} onChange={this.emailChangeHandler}  />
                    Password:-<input type="password" name='password' value={password} onChange={this.passwordChangeHandler} />
                    <br/>
                    Customer<input type="radio" name='userType' value="customer" onChange={this.userTypeHandler} />
                    Client<input type="radio" name='userType' value="client" onChange={this.userTypeHandler} />
                    <br/>
                    <button type='submit'> Submit </button>
                </form>
            </div>

    }

}

const mapStateToProps = (state) => {
    return {
        main: state
    }
}

export default connect(mapStateToProps)(Form)