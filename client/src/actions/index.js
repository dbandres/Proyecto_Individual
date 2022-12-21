import axios from "axios";
export const GET_DOGS = "GET_DOGS"
export const FILTER_CREATE = "FILTER_CREATE"

export function getDogs(){
    return async function (dispatch){
        let response = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }
} 
export function filterCreated(payload){
    return({
        type: FILTER_CREATE,
        payload
    })
}