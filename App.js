import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import 'react-native-gesture-handler';
import IngredientScreen from './components/screens/IngredientScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyBarNavigator from './components/navigators/MyBarNavigator';
import { bottomNavStyles } from './styles/styles';
import store from './store'
import RecipeFilter from './components/filters/RecipeFilter'

import { loadUser } from './actions/auth'

const Tab = createBottomTabNavigator();

const App = () =>  {
    useEffect(() => {
        // attempt to load a user if already sign in
        store.dispatch(loadUser());
    }, []);

    const myBarOptions = {
        headerRight: () => <RecipeFilter />
    }

    return (
        <Provider store={store}>
            
            <NavigationContainer>
                <Tab.Navigator 
                    initialRouteName='My Bar'
                    tabBarOptions={bottomNavStyles}
                >
                    <Tab.Screen name="Discover" component={IngredientScreen} />
                    <Tab.Screen 
                        name="My Bar" 
                        component={MyBarNavigator}
                        options={myBarOptions} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    )
};

export default App;
