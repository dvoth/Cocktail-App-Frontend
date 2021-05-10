import { combineReducers } from 'redux'
import recipes from './recipes'

export default combineReducers({
    // could just do 
    // recipes
    // it is the same thing
    recipes: recipes
})