import React, { useEffect, useState } from 'react';
import {SafeAreaView,FlatList,Pressable,Text,Image,View} from 'react-native';
import Recipe from './Recipe'
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'react-native-gesture-handler';
import { styles } from './../styles/styles';
import { min } from 'react-native-reanimated';


const RecipeList = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      fetch('http://192.168.1.245:8000/recipes/')
        .then((response) => response.json())
        .then((json) => setRecipes(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    const getListableIngredients = (recipe) => {
        var ingredientList=''
        const numIngredients = recipe.ingredients.length
        console.log(recipe)
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
                    data={recipes}
                    keyExtractor={({ id }, index) =>  String(id) }
                    renderItem={({ item }) => (
                        <Pressable style={styles.recipeCard} onPress={() => navigation.navigate('Recipe', {recipe: item})}>
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