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
import Icon from 'react-native-vector-icons/MaterialIcons'
import { constructErrorMessage } from './../../actions/messages';
import { fetchIngredients } from './../../actions/ingredients'
import {API_URL} from '@env';
import RecipeIngredientsSection from "../sections/RecipeIngredientSection";
import RecipeStepSection from "../sections/RecipeStepSection";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from './../../styles/styles';
 
const AddRecipe = props => {
    // This is just component-specific state, we don't need redux when getting user input for username/password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const ingredientData = useSelector(state => state.ingredients)

    useEffect(() => {
        // get ingredients from /actions/ingredients
        dispatch(fetchIngredients());
    }, []);
    
    const errors = useSelector(state => state.auth.loginError)
    const recipeIngredientSectionOptions = {
        readonly: false,
        ingredients: ingredientData.ingredients
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* TODO: Instead of showing a list of errors, update to show error below each field with an error */}
            {/* <View style={styles.loginErrorContainer}> */}
            <View>
                <FlatList
                    data={errors}
                    renderItem={({ item }) => (
                        <Text style={styles.loginErrorText}>{constructErrorMessage(item)}</Text>
                    )}/>
            </View>

            <View style={styles.titleContainer}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="New Cocktail Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>
            </View>

            <RecipeIngredientsSection options={recipeIngredientSectionOptions} />
            <RecipeStepSection />
        
            <Pressable onPress={() => dispatch()} style={styles.loginBtn}>
                <Text style={styles.loginText}>Add Recipe</Text>
            </Pressable>
        </SafeAreaView>
  );
}

export default AddRecipe