import React, { Component } from 'react';
import AddFood from './AddFood';

class Profile extends Component {
    render() {
        return (
            <div>

              <div> Name:- {this.props.user.name}  </div>
              <div> Email:- {this.props.user.email}  </div>

                <AddFood/>

            </div>
        );
    }
}

export default Profile;