import axios from "axios";
export const GET_DOGS = "GET_DOGS"
export const FILTER_CREATE = "FILTER_CREATE"
export const GET_TEMPERAMENT = "GET_TEMPERAMENT"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const FILTER_BY_TEMP = "FILTER_BY_TEMP"
export const ORDER_BY_WHEIGHT = "ORDER_BY_WHEIGHT"

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

export function getTemperament(){
    return async function (dispatch){
        let respuestaTemp = await axios.get("http://localhost:3001/dogs/temperaments")
            return dispatch({ 
                type: GET_TEMPERAMENT,
                payload: respuestaTemp.data
            })
    }
}

export function orderByName(payload){
    return({
        type: ORDER_BY_NAME,
        payload
    })
}

export function filterByTemp(payload){
    return({
        type: FILTER_BY_TEMP,
        payload
    })
}

export function oderByWeight(payload){
    return({
        type: ORDER_BY_WHEIGHT,
        payload
    })
}