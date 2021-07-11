import { combineReducers } from 'redux'
import recipes from './recipes'
import ingredients from './ingredients'
import auth from './auth'

export default combineReducers({
    recipes: recipes,
    ingredients: ingredients,
    auth: auth
})