import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {SafeAreaView,Image,View,FlatList,Text,Pressable,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'react-native-gesture-handler';
import { styles } from './../../styles/styles';
import { fetchIngredients, addIngredient } from './../../actions/ingredients'
import Toast from 'react-native-simple-toast';

const IngredientList = props => {
    const dispatch = useDispatch();
    const ingredientData = useSelector(state => state.ingredients)
    const user = useSelector(state => state.auth.user)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  
    useEffect(() => {
        // get ingredients from /actions/ingredients
        dispatch(fetchIngredients());
    }, []);

    const addUserIngredient = (ingredient) => {
        console.log(ingredientData)
        if (user.id == null) {
            Toast.show("Please login to add ingredients")
        } else {
            console.log(ingredientData.isFetching)
            dispatch(addIngredient(ingredient, user.id));
            console.log(ingredientData.isFetching)
        }
    }

    const userHasIngredient = (currentIngredient) => {
        var hasIngredient = false;

        // If not logged in, of course the user don't have no ingredient!
        if (!isAuthenticated) {
            return false
        }

        user.ingredients.forEach(userIngredient => {
            if (userIngredient.ingredient.id === currentIngredient.id) {
                hasIngredient=true
            }
        });

        return hasIngredient
    }

    const addToShoppingCart = (ingredient) => {

    }

    return (
        <SafeAreaView>
            <FlatList
                data={ingredientData.ingredients}
                extraData={ingredientData}
                keyExtractor={({ id }, index) =>  String(id) }
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={styles.ingredientCard}>
                        <Image 
                            source={{uri: item.image}} 
                            style={styles.thumbnail}/>
                        <View style={styles.ingredientDetails}>
                            <Text style={styles.ingredientTitle}>{item.name}</Text>
                            {userHasIngredient(item) ?
                                <Text>Has Ingredient</Text>
                            : <View style={styles.ingredientIcons}>
                                    <Pressable onPress={() => addUserIngredient(item)}>
                                        <Icon name='add' size={20}/>
                                    </Pressable>
                                    <Pressable onPress={() => addToShoppingCart(item)}>
                                        <Icon name='shopping-cart' size={20}/>
                                    </Pressable>
                                </View>
                            }
                        </View>
                    </View>
                )}/>
        </SafeAreaView>
  );
}

export default IngredientList;