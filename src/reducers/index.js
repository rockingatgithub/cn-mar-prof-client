const initialState = {
    user: {},
    isLoggedIn: false,
    counter: 0,
}

function reducers (state = initialState, actions) {
    switch (actions.type) {
        case 'LOGIN':
            
            break;

        case 'INC':
            return { ...state, counter: actions.data };
    
        default:
            return { ...state };
    }
}

export default reducers;