import { GET_DOGS } from "../actions";

 


const initialState = {
    dogs : []
}

function rootReducer( state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: state.dogs.concat(action.payload)
            }
            default:
                return state;
    }
}

export default rootReducer;