import {
    FETCH_RECIPES_SUCCESS, 
    FETCH_RECIPES_FAILURE, 
    FETCHING_RECIPES, 
    DELETE_RECIPE, 
    ADD_RECIPE,
    VALIDATE_ADD_RECIPE_INGREDIENT_FAILURE, 
    VALIDATE_ADD_RECIPE_INGREDIENT_SUCCESS,
    REMOVE_NEW_RECIPE_INGREDIENT
} from './types'
import { tokenConfig } from './auth'
import {API_URL} from '@env'

export function fetchAvailableRecipes() {
    return (dispatch, getState) => {
        const config = tokenConfig(getState)
        const recipeUrl = API_URL+'/user/available-recipes/'

        dispatch(getRecipes(recipeUrl))

        return(fetch(recipeUrl, config))
        .then(res => res.json())
        .then(json => {
            return(dispatch(getRecipesSuccess(json)))
        })
        .catch(err => dispatch(getRecipesFailure(err)))
    }
}

export function fetchAllRecipes() {
    return (dispatch, getState) => {
        const recipeUrl = API_URL+'/recipes/'

        dispatch(getRecipes(recipeUrl))

        return(fetch(recipeUrl))
        .then(res => res.json())
        .then(json => {
            return(dispatch(getRecipesSuccess(json)))
        })
        .catch(err => dispatch(getRecipesFailure(err)))
    }
}

function getRecipes(url) {
    console.log("Fetching recipes from " +  url)
    return {
        type: FETCHING_RECIPES
    }
}

function getRecipesSuccess(data) {
    console.log("Recipe fetching success")
    return {
        type: FETCH_RECIPES_SUCCESS,
        data
    }
}

function getRecipesFailure(error) {
    console.log("Failed fetching recipes")
    console.log(error)
    return {
        type: FETCH_RECIPES_FAILURE
    }
}

export function addNewRecipeIngredient(recipeIngredient) {
    return (dispatch, getState) => {
        var errors = {}

        if (recipeIngredient.ingredient == null || recipeIngredient.ingredient == undefined || !recipeIngredient.ingredient) {
            errors = { ...errors, ingredientError: true };
        }
    
        if (recipeIngredient.quantity == null || recipeIngredient.quantity == undefined || !recipeIngredient.quantity) {
            errors = { ...errors, quantityError: true };
        }
    
        if (recipeIngredient.unit == null || recipeIngredient.unit == undefined || !recipeIngredient.unit) {
            errors = { ...errors, unitError: true };
        }
    
        if (errors.ingredientError == true || errors.quantityError == true || errors.unitError == true) {
            dispatch(validateRecipeFailure(errors))
        } else {
            dispatch(validateRecipeSuccess(recipeIngredient))
        }
    }
}

export function removeNewRecipeIngredient(recipeIngredient) {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_NEW_RECIPE_INGREDIENT,
            payload: recipeIngredient
        })
    }
}

function validateRecipeFailure(errors) {
    return {
        type: VALIDATE_ADD_RECIPE_INGREDIENT_FAILURE,
        payload: errors
    }
}

function validateRecipeSuccess(recipeIngredient) {
    return {
        type: VALIDATE_ADD_RECIPE_INGREDIENT_SUCCESS,
        payload: recipeIngredient
    }
}
// // DELETE RECIPES
// export const deleteRecipe = (id) => dispatch => {
//     axios.delete(`/api/recipes/${id}`)
//         .then(res => {
//             dispatch({
//                 type: DELETE_RECIPE,
//                 payload: id
//             })
//         })
//         .catch(err => console.log(err))
// }

// // ADD RECIPES
// export const addRecipe = (recipe) => dispatch => {
//     axios.post("/api/recipes/", recipe)
//         .then(res => {
//             dispatch({
//                 type: ADD_RECIPE,
//                 // should receive a recipe from the server after it's added
//                 payload: res.data
//             })
//         })
//         .catch(err => console.log(err))
// }