import {FETCH_INGREDIENTS_SUCCESS, FETCH_INGREDIENTS_FAILURE, FETCHING_INGREDIENTS, DELETE_INGREDIENT, ADD_INGREDIENT} from './types'
import {API_URL} from '@env';

export function fetchIngredients() {
    return (dispatch) => {
        dispatch(getIngredients())

        return(fetch(API_URL+'/ingredients/'))
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

    return {
        type: FETCHING_INGREDIENTS
    }
}

function getIngredientsSuccess(data) {

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

// // ADD INGREDIENTS
export const addIngredient = (ingredient) => dispatch => {
    axios.post("/api/ingredients/", ingredient)
        .then(res => {
            dispatch({
                type: ADD_INGREDIENT,
                // should receive a ingredient from the server after it's added
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}