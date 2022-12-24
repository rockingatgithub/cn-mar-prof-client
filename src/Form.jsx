import React from 'react'

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            name: '',
            email: '',
            password: '',
            userType: '',

        }
    }

    removeName = (i) => {

        const cloneNames = [ ...this.state.name ]
        cloneNames.splice(i, 1)

        this.setState({
            name: cloneNames,
            newState: 10,
        })
        
    }

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

        let response = await fetch(`http://localhost:8000/${userType}/${type}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type' :'application/json'
            }
        })

        let parsedResponse = await response.json()
        console.log("the response", parsedResponse)
        const token = parsedResponse.token;
        

        if(token) {
            this.props.loginHandler(parsedResponse.data)
            document.cookie = 'user' + '=' + token
        }

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
                   { this.props.type === 'signup' && <> Name:-<input type="text" name='name' value={name} onChange={this.nameChangeHandler} /> </> }
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

export default Form