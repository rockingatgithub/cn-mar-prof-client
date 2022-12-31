import Cookies from 'js-cookie';
import React, { Component } from 'react';

class ListFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foods: []
        }
    }
    

    componentDidMount = async () => {
        const response = await fetch('http://localhost:8000/food/getFood', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('user')}`
            }
        })
        const parsedResponse = await response.json()
        if(response.status === 200) {
            this.setState({
                foods: parsedResponse.foods
            })
        }
    }

    foodOrderHandler = async () => {
        const response = await fetch('http://localhost:8000/food/orderFood', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('user')}`
            }
        })
        const parsedResponse = await response.json()
        alert("Email sent!")
    }

    render() {
        return (
            <div>
                
                <h1>Foods to order from:-</h1>
                { this.state.foods.map((food) => <li> <div>{food.name}</div> <button onClick={this.foodOrderHandler} > Order </button>  </li>) }

            </div>
        );
    }
}

export default ListFood;