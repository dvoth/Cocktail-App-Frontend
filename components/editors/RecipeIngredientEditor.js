import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    View,
    LayoutAnimation,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { constructErrorMessage } from './../../actions/messages';
import IngredientFilter from "../filters/IngredientFilter";
import {API_URL} from '@env';

import { styles } from './../../styles/styles';

import { addNewRecipeIngredient, clearRecipeIngredientErrors, removeNewRecipeIngredient } from '../../actions/recipes'

const RecipeIngredientEditor = ({allIngredients, recipeIngredient, onFinishEditing}) => {
    const errors = useSelector(state => state.recipes.addRecipeIngredientErrors)

    // State for the textinput fields
    const [selectedIngredient, setSelectedIngredient] = (recipeIngredient ? useState(recipeIngredient.ingredient) :  useState(null))
    const [quantity, setQuantity] = (recipeIngredient ? useState(recipeIngredient.quantity) :  useState(null))
    const [unit, setUnit] = (recipeIngredient ? useState(recipeIngredient.unit) :  useState(null))
    const [newRecipeIngredient, setNewRecipeIngredient] = useState(null);

    const dispatch = useDispatch()

    // Sets the local state from the props, need to run useEffect otherwise the state isn't initialized properly
    useEffect(() => {
        if (recipeIngredient) {
            setSelectedIngredient(recipeIngredient.ingredient)
            setQuantity(recipeIngredient.quantity)
            setUnit(recipeIngredient.unit)
        }
    }, [recipeIngredient])

    // When we set a new recipe ingredient, attempt to add and validate the ingredient
    useEffect(() => {
        if (newRecipeIngredient != null) {
            dispatch(addNewRecipeIngredient(newRecipeIngredient))
        }
    }, [newRecipeIngredient])

    // If validation passes and there are no errors, clear the inputs
    useEffect(() => {
        if (errors.errorFree) {
            removeInProgressIngredient()
        }
    }, [errors]);

    function addRecipeIngredient() {
        setNewRecipeIngredient({
            ingredient: selectedIngredient,
            unit: unit,
            quantity: quantity
        })
    }
    
    function removeInProgressIngredient() {
        clearInputs()
        dispatch(clearRecipeIngredientErrors())
        onFinishEditing(false)
    }

    const clearInputs = () => {
        setQuantity()
        setUnit()
        setSelectedIngredient()
        setNewRecipeIngredient(null)
    }

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={errors.ingredientError && styles.inputError}>
                <IngredientFilter 
                    allIngredients={allIngredients}
                    onSelectedIngredient={setSelectedIngredient}
                    defaultIngredient={recipeIngredient ? recipeIngredient.ingredient : null}
                />
            </View>
            <TextInput 
                style={[
                    {flex: 1, alignSelf: "flex-start"},
                    errors.quantityError && styles.inputError
                ]}
                placeholder="1"
                keyboardType='numeric'
                onChangeText={setQuantity}
                value={quantity}
            />
            <TextInput 
                style={[
                    {flex: 2, alignSelf: "flex-start"},
                    errors.unitError && styles.inputError
                ]}
                placeholder="oz"
                onChangeText={setUnit}
                value={unit}
            />
            <Pressable style={{marginTop: 13, paddingRight: 20}} onPress={() => addRecipeIngredient()}>
                <Icon name='check' size={20}/>
            </Pressable>
            <Pressable style={{marginTop: 13}} onPress={() => removeInProgressIngredient()}>
                <Icon name='cancel' size={20}/>
            </Pressable>
            </View>
    )
}

export default RecipeIngredientEditor