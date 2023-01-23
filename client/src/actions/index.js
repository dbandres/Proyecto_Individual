import axios from "axios";
export const GET_DOGS = "GET_DOGS"
export const FILTER_CREATE = "FILTER_CREATE"
export const GET_TEMPERAMENT = "GET_TEMPERAMENT"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const FILTER_BY_TEMP = "FILTER_BY_TEMP"
export const ORDER_BY_WHEIGHT = "ORDER_BY_WHEIGHT"
export const POST_CREATE = "POST_CREATE"
export const GET_DETAILS = "GET_DETAILS"
export const DELETE_DOGS_DB = "DELETE_DOGS_DB"

export function getDogs(){
    return async function (dispatch){
        let response = await axios.get("dogs");
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
        let respuestaTemp = await axios.get("dogs/temperaments")
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

export function createDog(payload){
    return async function(){
        const res = await axios.post("dogs", payload)
        return res
    }
}

export function dogDetail(id){
    return async function(dispatch){
        let res = await axios.get("dogs/" + id)
        return dispatch({
            type: GET_DETAILS,
            payload: res.data
        })
    }
}

export function deleteDogDb(id){
    return async function(dispatch){
        const res = axios.delete(`http://localhost:3001/dogs/`+ id)
        return dispatch({
            type: DELETE_DOGS_DB,
            payload: res.data
        })
    }
}