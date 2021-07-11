import {FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_FAILURE, FETCHING_INGREDIENTS, DELETE_INGREDIENT, ADD_INGREDIENT} from '../actions/types.js'

const initialState = {
    ingredients: [],
    isFetching: true,
    errors: false
}

export default function(state = initialState, action) {
    switch(action.type) {
            case FETCHING_INGREDIENTS:
                return {
                    ...state,
                    isFetching: true
                }
            case FETCH_INGREDIENTS_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    ingredients: action.data
                }
            case ADD_INGREDIENT:
                return {
                    ...state,
                    isFetching: false,
                    error: true
                }
        case DELETE_INGREDIENT:
            return {
                ...state,
                // Return all ingredients except for the one we deleted (whose ID is in the payload)
                ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.payload)
            }
        
        case ADD_INGREDIENT:
            return {
                ...state,
                // Return all the ingredients we currently have along with the newly created ingredient (which is in the payload)
                ingredients: [...state.ingredients, action.payload]
            }
        default:
            return state
    }
}