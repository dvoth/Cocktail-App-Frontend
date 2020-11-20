import React from 'react';
import 'react-native-gesture-handler';
import RecipeScreen from './components/RecipeScreen';
import IngredientScreen from './components/IngredientScreen';
import ProfileScreen from './components/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () =>  {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Cocktails'>
                <Tab.Screen name="Ingredients" component={IngredientScreen} />
                <Tab.Screen name="Cocktails" component={RecipeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export default App;
