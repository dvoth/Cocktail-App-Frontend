import {FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE, FETCHING_RECIPES, DELETE_RECIPE, ADD_RECIPE} from '../actions/types.js'

const initialState = {
    recipes: [],
    isFetching: true,
    errors: false
}

export default function(state = initialState, action) {
    switch(action.type) {
            case FETCHING_RECIPES:
                return {
                    ...state,
                    isFetching: true
                }
            case FETCH_RECIPES_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    recipes: action.data
                }
            case FETCH_RECIPES_FAILURE:
                return {
                    ...state,
                    isFetching: false,
                    error: true
                }
        case DELETE_RECIPE:
            return {
                ...state,
                // Return all recipes except for the one we deleted (whose ID is in the payload)
                recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
            }
        
        case ADD_RECIPE:
            return {
                ...state,
                // Return all the recipes we currently have along with the newly created recipe (which is in the payload)
                recipes: [...state.recipes, action.payload]
            }
        default:
            return state
    }
}