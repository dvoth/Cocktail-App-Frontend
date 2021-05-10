import {GET_RECIPES, DELETE_RECIPE, ADD_RECIPE} from '../actions/types.js'

const initialState = {
    recipes: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                //include everything else also in the state
                ...state,
                recipes: action.payload
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