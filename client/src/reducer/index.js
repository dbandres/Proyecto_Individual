import { GET_DOGS, FILTER_CREATE, GET_TEMPERAMENT } from "../actions";

const initialState = {
    dogs : [],
    copyDogs : [],
    temperaments: []
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
            default:
                return state;
    }
}

export default rootReducer;