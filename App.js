import React from 'react';
import 'react-native-gesture-handler';
import IngredientScreen from './components/screens/IngredientScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyBarNavigator from './components/navigators/MyBarNavigator';
import { bottomNavStyles } from './styles/styles';

const Tab = createBottomTabNavigator();

const App = () =>  {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='My Bar'
                tabBarOptions={bottomNavStyles}
            >
                <Tab.Screen name="Ingredients" component={IngredientScreen} />
                <Tab.Screen name="My Bar" component={MyBarNavigator} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export default App;
