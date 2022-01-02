import {
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE, 
    FETCHING_RECIPES, 
    DELETE_RECIPE, 
    ADD_RECIPE,
    VALIDATE_ADD_RECIPE_INGREDIENT_FAILURE,
    VALIDATE_ADD_RECIPE_INGREDIENT_SUCCESS,
    REMOVE_NEW_RECIPE_INGREDIENT
} from '../actions/types.js'

const initialState = {
    recipes: [],
    isFetching: true,
    errors: false,
    addRecipeIngredientErrors: {
        errorFree: false,
        ingredientError: false,
        quantityError: false,
        unitError: false
    },
    newRecipeIngredients: []
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
        case VALIDATE_ADD_RECIPE_INGREDIENT_FAILURE: 
            return {
                ...state,
                addRecipeIngredientErrors: {...state.addRecipeIngredientErrors, ...action.payload, errorFree: false}
            }
        case VALIDATE_ADD_RECIPE_INGREDIENT_SUCCESS: 
            return {
                ...state,
                addRecipeIngredientErrors: {...state.addRecipeIngredientErrors, errorFree: true, ingredientError: false, quantityError: false, unitError: false},
                newRecipeIngredients: [...state.newRecipeIngredients, action.payload]
            }
        case REMOVE_NEW_RECIPE_INGREDIENT:
            return {
                ...state,
                // Return all recipe ingredients except for the one we deleted (which is in the payload)
                newRecipeIngredients: state.newRecipeIngredients.filter(ingredient => ingredient !== action.payload)
            }
        default:
            return state
    }
}