import {
    FETCH_INGREDIENTS_SUCCESS, 
    FETCH_INGREDIENTS_FAILURE, 
    FETCHING_INGREDIENTS,
    DELETE_INGREDIENT, 
    ADDING_INGREDIENT, 
    ADD_INGREDIENT_SUCCESS, 
    ADD_INGREDIENT_FAILURE,
    ADDING_USER_INGREDIENT, 
    ADD_USER_INGREDIENT_FAILURE, 
    ADD_USER_INGREDIENT_SUCCESS} from './types'
import {API_URL} from '@env';
import { tokenConfig } from './auth';

// ADD USER INGREDIENTS
export function addUserIngredient(ingredient) {
    // Dispatch the ADD_INGREDIENT type
    return (dispatch, getState) => {
        const config = tokenConfig(getState)
        const addUserIngredientUrl = API_URL + '/user/ingredients/' + ingredient.id + '/'

        config['method'] = 'POST'
        config['body'] = JSON.stringify({
            ingredientId: ingredient.id
        })

        dispatch(addingUserIngredient())
  
        // Ping API to add the ingredient
        return(fetch(addUserIngredientUrl, config))
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return(
                    dispatch(addIngredientSuccess(json))
                )
            })
            .catch(err => {
                console.log(addUserIngredientUrl)
                dispatch(addIngredientFailure(err))
            })
    }
  }
  
  function addingUserIngredient() {
    console.log("Adding user ingredient")
    return {
        type: ADDING_USER_INGREDIENT
    }
  }
  
  
  function addIngredientSuccess(data) {
    console.log("User ingredient adding success")
    return {
        type: ADD_USER_INGREDIENT_SUCCESS,
        payload: data
    }
  }
  
  function addIngredientFailure(error) {
    console.log("Failed adding user ingredient")
    console.log(error)
    return {
        type: ADD_USER_INGREDIENT_FAILURE
    }
  }

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

