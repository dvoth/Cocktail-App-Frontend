import React from 'react';
import 'react-native-gesture-handler';
import RecipeScreen from './../screens/RecipeScreen';
import IngredientScreen from './../screens/IngredientScreen';
import ProfileScreen from './../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const App = () =>  {
    return (
        <Tab.Navigator initialRouteName='Cocktails'>
            <Tab.Screen name="Cocktails" component={RecipeScreen} />
            <Tab.Screen name="Ingredients" component={IngredientScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
};

export default App;
