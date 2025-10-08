import axios from "axios"
import { baseUrl } from "../App"

export const getCurrentUser = async () => {

    try {

         let response = await axios.get(`${baseUrl}/user/getuser`, {
            withCredentials: true
        }) 
        // console.log(response.data.userData)
        return response.data.userData;

    }
    catch (error) {
        console.log("error from getCurrent User", error.respones)
    }







}