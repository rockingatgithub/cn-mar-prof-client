import Cookies from 'js-cookie';
import React, { Component, useState } from 'react';

const FoodItem = ({food, foodOrderHandler}) => {

    const [quantity, setQuantity] = useState(1)

    return <li>
            <div>{food.name}</div>
            <button onClick={() => setQuantity(quantity-1)}  >-</button><div> {quantity} </div><button onClick={() => setQuantity(quantity+1)}  >+</button>
            <button onClick={() => foodOrderHandler(food.name)} > Order </button>  
        </li>
}

class ListFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            quantity: 1
        }
    }


    componentDidMount = async () => {
        const response = await fetch('http://localhost:8000/food/getFood', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('user')}`
            }
        })
        const parsedResponse = await response.json()
        if (response.status === 200) {
            this.setState({
                foods: parsedResponse.foods
            })
        }
    }

    foodOrderHandler = async (foodName) => {

        const foodObj = {
            food: foodName,
            quantity: this.state.quantity
        }

        const response = await fetch('http://localhost:8000/food/orderFood', {
            method: 'post',
            body: JSON.stringify(foodObj),
            headers: {
                'Authorization': `Bearer ${Cookies.get('user')}`
            }
        })
        const parsedResponse = await response.json()
        alert("Email sent!")
    }

    increaseQuantity = () => {
        this.setState((prevState) => ({ quantity: prevState.quantity + 1 }))
    }

    decreaseQuantity = () => {
        this.setState((prevState) => ({ quantity: prevState.quantity - 1 }))
    }

    render() {
        return (
            <div>

                <h1>Foods to order from:-</h1>
                {this.state.foods.map((food) => <FoodItem food={food} foodOrderHandler={this.foodOrderHandler} />)}

            </div>
        );
    }
}

export default ListFood;