import { GET_DOGS, FILTER_CREATE, GET_TEMPERAMENT, ORDER_BY_NAME, FILTER_BY_TEMP } from "../actions";

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
                    dogs: arraySort
                }
        case FILTER_BY_TEMP :
            const alDogs = state.copyDogs
            let arrayTemp = alDogs.filter((dog)=>{
                if(!dog.temperament) return alDogs;
                return dog.temperament.includes(action.payload)
            })
            return{
                ...state,
                dogs: arrayTemp
            }

            default:
                return state;
    }
}

export default rootReducer;