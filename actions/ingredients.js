import {
    FETCH_INGREDIENTS_SUCCESS, 
    FETCH_INGREDIENTS_FAILURE, 
    FETCHING_INGREDIENTS,
    DELETE_INGREDIENT, 
    ADDING_INGREDIENT, 
    ADD_INGREDIENT_SUCCESS, 
    ADD_INGREDIENT_FAILURE} from './types'
import {API_URL} from '@env';

export function fetchIngredients() {
    return (dispatch) => {
        dispatch(getIngredients())

        return(fetch(API_URL+'/ingredients/')   )
        .then(res => res.json())
        .then(json => {
            return(dispatch(getIngredientsSuccess(json)))
        })
        .catch(err => {
            console.log(API_URL+'/ingredients/')
            dispatch(getIngredientsFailure(err))
         })
    }
}

function getIngredients() {
    console.log("Fetching ingredients from " +  API_URL + "/ingredients/")
    return {
        type: FETCHING_INGREDIENTS
    }
}

function getIngredientsSuccess(data) {
    console.log("Ingredient fetching success")
    return {
        type: FETCH_INGREDIENTS_SUCCESS,
        data
    }
}

function getIngredientsFailure(error) {
    console.log("Failed fetching ingredients")
    console.log(error)
    return {
        type: FETCH_INGREDIENTS_FAILURE
    }
}

// // DELETE INGREDIENTS
// export const deleteIngredient = (id) => dispatch => {
//     axios.delete(`/api/ingredients/${id}`)
//         .then(res => {
//             dispatch({
//                 type: DELETE_INGREDIENT,
//                 payload: id
//             })
//         })
//         .catch(err => console.log(err))
// }

