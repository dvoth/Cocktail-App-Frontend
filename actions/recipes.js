import {
    FETCH_RECIPES_SUCCESS, 
    FETCH_RECIPES_FAILURE, 
    FETCHING_RECIPES, 
    DELETE_RECIPE, 
    ADD_RECIPE_SUCCESS,
    ADD_RECIPE_FAILURE,
    VALIDATE_ADD_RECIPE_FAILURE, 
    VALIDATE_ADD_RECIPE_SUCCESS,
    VALIDATE_ADD_RECIPE_INGREDIENT_FAILURE, 
    VALIDATE_ADD_RECIPE_INGREDIENT_SUCCESS,
    VALIDATE_ADD_RECIPE_STEP_SUCCESS,
    VALIDATE_ADD_RECIPE_STEP_FAILURE,
    REMOVE_NEW_RECIPE_INGREDIENT,
    REMOVE_NEW_RECIPE_STEP,
    CLEAR_RECIPE_INGREDIENT_ERRORS,
    CLEAR_RECIPE_STEP_ERRORS
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
        var errors = {errorFree: false, ingredientError: false, quantityError: false, unitError: false}

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
            dispatch(validateAddRecipeIngredientFailure(errors))
        } else {
            dispatch(validateAddRecipeIngredientSuccess(recipeIngredient))
        }
    }
}

export function clearRecipeIngredientErrors() {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_RECIPE_INGREDIENT_ERRORS
        })
    }
}

export function clearRecipeStepErrors() {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_RECIPE_STEP_ERRORS
        })
    }
}

export function addNewRecipeStep(recipeStep) {
    return (dispatch, getState) => {
        var errors = {errorFree: false, descriptionError: false}
        if (recipeStep.description == null || recipeStep.description == undefined || recipeStep.description == '' || !recipeStep.description) {
            errors = { ...errors, descriptionError: true };
        }

        if (errors.descriptionError == true) {
            dispatch(validateAddRecipeStepFailure(errors))
        } else {
            dispatch(validateAddRecipeStepSuccess(recipeStep))
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

function validateAddRecipeIngredientFailure(errors) {
    return {
        type: VALIDATE_ADD_RECIPE_INGREDIENT_FAILURE,
        payload: errors
    }
}

function validateAddRecipeIngredientSuccess(recipeIngredient) {
    return {
        type: VALIDATE_ADD_RECIPE_INGREDIENT_SUCCESS,
        payload: recipeIngredient
    }
}

export function removeNewRecipeStep(recipeStep) {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_NEW_RECIPE_STEP,
            payload: recipeStep
        })
    }
}

function validateAddRecipeStepFailure(errors) {
    return {
        type: VALIDATE_ADD_RECIPE_STEP_FAILURE,
        payload: errors
    }
}

function validateAddRecipeStepSuccess(recipeStep) {
    return {
        type: VALIDATE_ADD_RECIPE_STEP_SUCCESS,
        payload: recipeStep
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

// ADD RECIPES
export function addNewRecipe(newRecipe) {
    return (dispatch, getState) => {
        var errors = {errorFree: false, nameError: false, descriptionError: false, ingredientError: false, stepError: false}
        console.log(newRecipe)
        if (!newRecipe.ingredients?.length) {
            errors = { ...errors, ingredientError: true };
        }
    
        if (!newRecipe.steps?.length) {
            errors = { ...errors, stepError: true };
        }

        if (!newRecipe.name) {
            errors = { ...errors, nameError: true };
        }

        if (!newRecipe.description) {
            errors = { ...errors, descriptionError: true };
        }
    
        if (errors.nameError == true || errors.descriptionError == true || errors.ingredientError == true || errors.stepError == true) {
            dispatch(validateAddRecipeFailure(errors))
        } else {
            dispatch(validateAddNewRecipeSuccess(newRecipe))
        }
    }
}
export function validateAddNewRecipeSuccess(recipe)  {
    console.log("adding recipe")
    return (dispatch, getState) => {
        const config = tokenConfig(getState)
        const addRecipeUrl = API_URL + '/recipes/'

        config['method'] = 'POST'
        config['body'] = JSON.stringify(recipe)
  
        // Ping API to add the ingredient
        return(fetch(addRecipeUrl, config))
            .then(res => {
                if (res.status == 400) {
                    throw new Error(res.status)
                } else {
                    return res.json()
                }
            })
            .then(json => {
                return(
                    dispatch(addRecipeSuccess(json))
                )
            })
            .catch(err => {
                console.log(err)
                dispatch(addRecipeFailure(err))
            })
    }
}

function addRecipeSuccess(data) {
    console.log("Success adding recipe")
    return {
        type: ADD_RECIPE_SUCCESS,
        payload: data
    }
}

function addRecipeFailure(data) {
    console.log("Failed adding recipe")
    return {
        type: ADD_RECIPE_FAILURE
    }
}

function validateAddRecipeFailure(errors) {
    return {
        type: VALIDATE_ADD_RECIPE_FAILURE,
        payload: errors
    }
}