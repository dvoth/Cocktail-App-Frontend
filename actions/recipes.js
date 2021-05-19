import {FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE, FETCHING_RECIPES, DELETE_RECIPE, ADD_RECIPE} from './types'

export function fetchRecipes() {
    return (dispatch) => {
        dispatch(getRecipes())

        return(fetch('http://192.168.1.245:8000/recipes/'))
        .then(res => res.json())
        .then(json => {
            return(dispatch(getRecipesSuccess(json)))
        })
        .catch(err => dispatch(getRecipesFailure(err)))
    }
}

function getRecipes() {

    return {
        type: FETCHING_RECIPES
    }
}

function getRecipesSuccess(data) {

    return {
        type: FETCH_RECIPES_SUCCESS,
        data
    }
}

function getRecipesFailure() {
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