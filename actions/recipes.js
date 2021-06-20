import {FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE, FETCHING_RECIPES, DELETE_RECIPE, ADD_RECIPE} from './types'
import {API_URL} from '@env'

export function fetchRecipes() {
    return (dispatch) => {
        dispatch(getRecipes())

        return(fetch(API_URL+'/recipes/'))
        .then(res => res.json())
        .then(json => {
            return(dispatch(getRecipesSuccess(json)))
        })
        .catch(err => dispatch(getRecipesFailure(err)))
    }
}

function getRecipes() {
    console.log("Fetching recipes from " +  API_URL + "/recipes/")
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