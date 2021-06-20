import React from 'react';
import { Provider } from 'react-redux'
import 'react-native-gesture-handler';
import IngredientScreen from './components/screens/IngredientScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyBarNavigator from './components/navigators/MyBarNavigator';
import { bottomNavStyles } from './styles/styles';
import store from './store'

const Tab = createBottomTabNavigator();

const App = () =>  {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator 
                    initialRouteName='My Bar'
                    tabBarOptions={bottomNavStyles}
                >
                    <Tab.Screen name="Discover" component={IngredientScreen} />
                    <Tab.Screen name="My Bar" component={MyBarNavigator} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    )
};

export default App;
