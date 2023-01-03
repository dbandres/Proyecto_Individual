import { GET_DOGS, FILTER_CREATE, GET_TEMPERAMENT, ORDER_BY_NAME, FILTER_BY_TEMP, ORDER_BY_WHEIGHT, POST_CREATE, GET_DETAILS } from "../actions";

const initialState = {
    dogs : [],
    copyDogs : [],
    temperaments: [],
    details: []
}

function rootReducer( state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            
            return{
                ...state,
                dogs: state.dogs.concat(action.payload),
                copyDogs: action.payload,
            }
        case FILTER_CREATE:
            const allDogs = state.copyDogs
            const createdFilter = action.payload === "api" ? allDogs.filter((dog) => dog.id <= 300) : allDogs.filter((dog) => dog.id.length >= 4)
            return{
                ...state,
                dogs: action.payload === "all" ? allDogs : createdFilter
            }
        case GET_TEMPERAMENT:
            return{
                ...state,
                temperaments: action.payload
            }
        case ORDER_BY_NAME:
            let arraySort = action.payload === "asc" ? 
                state.dogs.sort((a,b) =>{
                    if(a.name > b.name){
                        return 1
                    }else if(b.name > a.name){
                        return -1
                    }
                    return 0
                }):
                state.dogs.sort((a,b) =>{
                    if(a.name > b.name){
                        return -1
                    }else if(b.name > a.name){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    dogs: action.payload === "all" ? state.copyDogs : arraySort
                }
        case FILTER_BY_TEMP :
            const alDogs = state.copyDogs
            let arrayTemp = alDogs.filter((dog)=>{
                if(!dog.temperament) return alDogs;
                return dog.temperament.includes(action.payload)
            })
            
            return{
                ...state,
                dogs: action.payload === "all" ? state.copyDogs : arrayTemp
            }
        case ORDER_BY_WHEIGHT:
            //let dogsAll = state.dogs
            let weigthSort = action.payload === "asc" ? 
                state.dogs.sort((a,b) =>{
                    if(parseInt(a.weight) > parseInt(b.weight)){
                        return 1
                    }else if(parseInt(b.weight) > parseInt(a.weight)){
                        return -1
                    }
                    
                    return 0
                }):
                state.dogs.sort((a,b) =>{
                    if(parseInt(a.weight) > parseInt(b.weight)){
                        return -1
                    }else if(parseInt(b.weight) > parseInt(a.weight)){
                        return 1
                    }
                    
                    return 0
                })
                return({
                    ...state,
                    dogs: action.payload === "all" ? state.copyDogs : weigthSort
                })
        case POST_CREATE:
            return{
                ...state
            }
        case GET_DETAILS:
            return{
                ...state,
                details: action.payload
            }
            default:
                return state;
    }
}

export default rootReducer;