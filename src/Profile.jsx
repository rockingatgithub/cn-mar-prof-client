import React, { Component } from 'react';
import AddFood from './AddFood';
import ListFood from './ListFood';

class Profile extends Component {
    render() {
        return (
            <div>

              <div> Name:- {this.props.user.name}  </div>
              <div> Email:- {this.props.user.email}  </div>

                {/* <AddFood/> */}
                <ListFood/>
            </div>
        );
    }
}

export default Profile;