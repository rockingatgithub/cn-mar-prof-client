import React, { Component } from 'react';
import Cookies from 'js-cookie'

class AddFood extends Component {

    constructor(props) {
        super(props);
        this.state= {
            name: '',
            price: 0,
            showNotification: false,
        }

    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log("App updated!")
        if( prevState.showNotification !== this.state.showNotification){
            alert("Food added successfuly")
        }

    }

    addFoodHandler = async (event) => {

        event.preventDefault()
        const { name, price } = this.state
        const foodObj = {
            name : name,
            price : price
        }

        const response = await fetch(`http://localhost:8000/food/addFood`, {
            method: 'POST',
            body: JSON.stringify(foodObj),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${Cookies.get('user')}`
            }
        })

        const parsedResponse = await response.json()
        console.log("the parsed response", parsedResponse)
        if(response.status === 200){
            this.setState({ showNotification: true })
        }

    }

    nameChangeHandler = (event) => {
        this.setState({name: event.target.value})
    }

    priceChangeHandler = (event) => {
        this.setState({price: event.target.value})
    }
    

    render() {

        const { name, price } = this.state

        return (
            <div>
                <h1> Add Food </h1>
                <form onSubmit={this.addFoodHandler}>
                    <input type="text" value={name} onChange={this.nameChangeHandler}  />
                    <input type="number" value={price} onChange={this.priceChangeHandler}  />
                    <button type='submit' >Submit</button>
                </form>

            </div>
        );
    }
}

export default AddFood;