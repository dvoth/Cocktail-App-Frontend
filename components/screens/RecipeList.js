import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {SafeAreaView,FlatList,Pressable,Text,Image,View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'react-native-gesture-handler';
import { styles } from './../../styles/styles';
import {fetchAvailableRecipes, fetchAllRecipes} from '../../actions/recipes'

const RecipeList = props => {
    const dispatch = useDispatch();
    const recipeData = useSelector(state => state.recipes)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const userIngredients = useSelector(state => state.auth.user.ingredients)
  
    useEffect(() => {
        // get recipes from /actions/recipes
        if (isAuthenticated) {
            dispatch(fetchAvailableRecipes());
        } else {
            dispatch(fetchAllRecipes());
        }
    }, [isAuthenticated, userIngredients]);

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

    if (isAuthenticated && recipeData.recipes.length == 0) {
        return (<Text>Add some ingredients to see recipes you can make!</Text>)
    } else {
        return (
            <View style={styles.recipeListContainer}>
                <SafeAreaView style={styles.recipeListContainer}>
                    <FlatList
                        data={recipeData.recipes}
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

                <View style={styles.addButtonContainer}>
                    <Pressable  style={styles.addButtonCircle} onPress={() => props.navigation.navigate('Add Recipe')}>
                        <Icon style={styles.addButtonIcon} name='add' size={50}/>
                    </Pressable>
                </View>
            </View>
        );
    }
}

export default RecipeList;