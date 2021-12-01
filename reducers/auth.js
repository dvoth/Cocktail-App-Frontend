import {
    USER_LOADING, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAIL, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    ADD_USER_INGREDIENT_SUCCESS,
    ADD_USER_INGREDIENT_FAILURE,
    REMOVING_USER_INGREDIENT, 
    REMOVE_USER_INGREDIENT_SUCCESS, 
    REMOVE_USER_INGREDIENT_FAILURE
} from '../actions/types'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: {
        id: null,
        ingredients: [],
        recipes: [],
        shoppingList: []
    },
    loginError: [],
    registerError: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case USER_LOADING: 
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                loginError: []
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            AsyncStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                loginError: [],
                registerError: false
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            AsyncStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: {
                    id: null
                }
            }
        case REGISTER_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: {
                    id: null
                },
                registerError: action.payload
            }

        case LOGIN_FAIL:
            AsyncStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                // isLoading: false,
                user: {
                    id: null
                },
                loginError: action.payload
            }
        case ADD_USER_INGREDIENT_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ingredients: action.payload
                }
            }
        case ADD_USER_INGREDIENT_FAILURE:
            return {
                ...state
            }    
        
        case REMOVING_USER_INGREDIENT:
            return {
                ...state,
                isRemoving: true
            }
        case REMOVE_USER_INGREDIENT_SUCCESS:
            return {
                ...state,
                isRemoving: false,
                // Return all the ingredients we currently have, except for what was just deleted
                user: {
                    ...state.user,
                    ingredients: state.user.ingredients.filter(element => element.id !== action.payload.id)
                }
            }
        case REMOVE_USER_INGREDIENT_FAILURE:
            return {
                ...state,
                isRemoving: false
            }
        default: 
            return state;
    }
}