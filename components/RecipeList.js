import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {SafeAreaView,FlatList,Pressable,Text,Image,View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'react-native-gesture-handler';
import { styles } from './../styles/styles';
import {getRecipes} from '../actions/recipes'


const RecipeList = props => {
    const dispatch = useDispatch();
    const actionData = useSelector(state => state.recipes.recipes)
    const [recipes, setRecipes] = useState(actionData);

    useEffect(() => {
        dispatch(getRecipes());
    }, []);

    const getListableIngredients = (recipe) => {
        var ingredientList=''
        const numIngredients = recipe.ingredients.length
        recipe.ingredients.map((ingredient, i) => {
            ingredientList += ingredient.ingredient.name
            
            // only add comma if not the last ingredient
            if (i+1 != numIngredients) {
                ingredientList += ', '
            }  
        })

        return ingredientList;
    }

    return (
            <SafeAreaView>
                <FlatList
                    data={recipes.recipes}
                    keyExtractor={({ id }, index) =>  String(id) }
                    renderItem={({ item }) => (
                        <Pressable style={styles.recipeCard} onPress={() => props.navigation.navigate('Recipe', {recipe: item})}>
                            <Image 
                                source={{uri: item.image }} 
                                style={styles.thumbnail}/>
                            <View style={styles.recipeDetailsContainer}>
                                    <View style={styles.recipeTitleContainer}>
                                        <Text style={styles.recipeTitle}>{item.name}</Text>
                                        <Icon name='favorite-border' size={20}/>
                                    </View>
                                    <Text style={styles.recipeDetails}>8%</Text>
                                    <Text style={styles.recipeDetails}>{getListableIngredients(item)}</Text>
                                    <Text style={styles.recipeDetails}>{item.description}</Text>
                            </View>
                        </Pressable>
                    )}/>
            </SafeAreaView>
  );
}

export default RecipeList;