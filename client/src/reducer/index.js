import { GET_DOGS, FILTER_CREATE } from "../actions";

 
const initialState = {
    dogs : [],
    copyDogs : []
}

function rootReducer( state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: state.dogs.concat(action.payload),
                copyDogs: action.payload
            }
        case FILTER_CREATE:
            const allDogs = state.copyDogs
            const createdFilter = action.payload === "api" ? allDogs.filter((dog) => dog.id <= 300) : allDogs.filter((dog) => dog.id.length > 3)
            return{
                ...state,
                dogs: action.payload === "all" ? state.dogs : createdFilter
            }
            default:
                return state;
    }
}

export default rootReducer;