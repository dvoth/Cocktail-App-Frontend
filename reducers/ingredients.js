import {
    FETCH_INGREDIENTS_SUCCESS, 
    FETCH_INGREDIENTS_FAILURE, 
    FETCHING_INGREDIENTS, 
    ADD_INGREDIENT_SUCCESS, 
    ADDING_INGREDIENT, 
    ADD_INGREDIENT_FAILURE
} from '../actions/types.js'

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
        case ADDING_INGREDIENT:
            return {
                ...state,
                isFetching: true
            }
        case ADD_INGREDIENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // Return all the ingredients we currently have along with the newly created ingredient (which is in the payload)
                ingredients: [...state.ingredients, action.payload],
                errors: false
            }
        case ADD_INGREDIENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errors: true
            }
        default:
            return state
    }
}