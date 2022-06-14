import React, { useState, useEffect } from "react";
import {
    FlatList,
    Text,
    View,
    LayoutAnimation,
    Pressable,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { constructErrorMessage } from './../../actions/messages';
import { fetchIngredients } from './../../actions/ingredients'
import { addNewRecipe, clearRecipeIngredientErrors } from "../../actions/recipes";
import {API_URL} from '@env';
import RecipeIngredientsSection from "../sections/RecipeIngredientSection";
import RecipeStepSection from "../sections/RecipeStepSection";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from './../../styles/styles';
 
const AddRecipe = props => {
    const [recipeName, setRecipeName] = useState()
    const [recipeDescription, setRecipeDescription] = useState()
    const ingredientData = useSelector(state => state.ingredients)
    const newRecipeIngredients = useSelector(state => state.recipes.newRecipeIngredients)
    const newRecipeSteps = useSelector(state => state.recipes.newRecipeSteps)
    
    const isAdding = useSelector(state => state.recipes.isAdding)
    const errors = useSelector(state => state.recipes.addRecipeErrors)

    const dispatch = useDispatch()

    useEffect(() => {
        // get ingredients from /actions/ingredients
        dispatch(fetchIngredients());
    }, []);

    // TODO: When we 
    useEffect(() => {
        console.log("is adding" + isAdding)
        if (!isAdding) {
            if (!errors.apiError) {
                props.navigation.navigate('Cocktails')
            } else {
                Toast.show("Unknown error adding recipe")
            }
        }
    }, [isAdding]);
    
    const recipeIngredientSectionOptions = {
        readonly: false,
        ingredients: ingredientData.ingredients
    }

    function addRecipe() {
        let newRecipe = {
            name: recipeName, 
            description: recipeDescription,
            ingredients: adaptIngredients(newRecipeIngredients), 
            steps: newRecipeSteps
        }
        dispatch(addNewRecipe(newRecipe))
    }

    function adaptIngredients(ingredients) {
        var adaptedIngrediets = []
        // Pretty much just need to change the entire "ingredient" object to be id
        ingredients.forEach(ingredient => {
            console.log(ingredient)
            adaptedIngrediets.push({
                ingredient_id: ingredient.id,
                quantity: ingredient.quantity,
                unit: ingredient.unit
            })
        });

        return adaptedIngrediets;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Recipe name */}
            <View style={styles.titleContainer}>
                <View style={[styles.inputView, errors.nameError && styles.inputError]}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="New Cocktail Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={(name) => setRecipeName(name)}
                    />
                </View>
            </View>

            {/* Recipe description */}
            <View style={styles.titleContainer}>
                <View style={[styles.inputView, errors.descriptionError && styles.inputError]}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Description"
                        placeholderTextColor="#003f5c"
                        onChangeText={(description) => setRecipeDescription(description)}
                    />
                </View>
            </View>

            <RecipeIngredientsSection  options={recipeIngredientSectionOptions} />
            <RecipeStepSection />
        
            <Pressable onPress={addRecipe} style={styles.loginBtn}>
                <Text style={styles.loginText}>Add Recipe</Text>
            </Pressable>
        </SafeAreaView>
  );
}

export default AddRecipe