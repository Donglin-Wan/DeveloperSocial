import axios from 'axios'

//jwt token is stateless, so we should send token with every request that needs the token. 
const setAuthToken = token => {
    if (token) {
        //set global header
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken