import React from 'react';
import 'react-native-gesture-handler';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';
import RecipeList from './RecipeList';
import { createStackNavigator } from '@react-navigation/stack';

const RecipeStack = createStackNavigator();

const RecipeScreen = () => {
    return (
        <RecipeStack.Navigator >
            <RecipeStack.Screen 
                options={{ headerShown: false }}
                name="Cocktails" 
                component={RecipeList}
            />
            <RecipeStack.Screen name="Recipe" component={Recipe} options={({ route }) => ({ title: route.params.recipe.name })} />
            <RecipeStack.Screen name="Add Recipe" component={AddRecipe} options={({ route }) => ({ title: "Add Recipe" })} />
        </RecipeStack.Navigator>
  );
}

export default RecipeScreen;