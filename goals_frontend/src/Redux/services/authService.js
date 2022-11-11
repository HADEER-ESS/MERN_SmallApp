import axios from "axios";

const service_URL = "/api/user/";
//registr function POST method
const register = async (userData) => {

    const response = await axios.post(service_URL , userData);

    if(response.data){
        localStorage.setItem("user" , JSON.stringify(response.data))
    }

    return response.data ;
}

//Login function POST
const login = async (userData) => {

    const response = await axios.post(service_URL + "/login" , userData);

    if(response.data){
        localStorage.setItem("user" , JSON.stringify(response.data))
    }

    return response.data
}

//logout function //remover user from local storage
const logout = async() => {
    localStorage.removeItem("user")
}
const authService = {
    register,
    login,
    logout
}

export default authService;