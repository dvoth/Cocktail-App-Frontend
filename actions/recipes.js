import {GET_RECIPES, DELETE_RECIPE, ADD_RECIPE} from './types'

// GET RECIPES
export const getRecipes = () => dispatch => {
    fetch('http://192.168.1.245:8000/recipes/')
        .then((response) => response.json())
        .then((json) => {
            dispatch({
                type: GET_RECIPES,
                payload: json
            })
        })
        .catch((error) => console.error(error))
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