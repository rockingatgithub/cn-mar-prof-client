import Cookies from "js-cookie"

export const setCounter = (num) => {
    return { type: 'INC', data: num }
}

export const userLogin =  (user, type, userType) => {

    return async (dispatch, getState) => {
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
                document.cookie = 'user' + '=' + token
            }

            dispatch(setUser({
                user: parsedResponse.data,
                isLoggedIn: true
            }))
        

    }

}

export const setProfile = () => {
    return async (dispatch, getState) => {

        const token = Cookies.get('user')
        if(token) {
        const response = await fetch('http://localhost:8000/profile', {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        const parsedResponse = await response.json()
            dispatch(setUser({
                user: parsedResponse.data,
                isLoggedIn: true
            }))

        }

    }
}

const setUser = (data) => {

    return {type: 'LOGIN', data}

}