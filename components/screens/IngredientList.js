import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {SafeAreaView,Image,View,FlatList,Text,Pressable,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'react-native-gesture-handler';
import { styles } from './../../styles/styles';
import { fetchIngredients, addUserIngredient, removeUserIngredient } from './../../actions/ingredients'
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

    const addIngredient = (ingredient) => {
        if (user.id == null) {
            Toast.show("Please login to add ingredients")
        } else {
            dispatch(addUserIngredient(ingredient));
        }
    }

    const userHasIngredient = (currentIngredient) => {
        var hasIngredient = false;

        // If not logged in, of course the user don't have no ingredient!
        if (!isAuthenticated || !user.ingredients) {
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
                // Clicking "add ingredient" updates user.ingredients, which should force the FlatList to refresh
                extraData={user.ingredients}
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
                                <View style={styles.ingredientIcons}>
                                    <Pressable onPress={() => dispatch(removeUserIngredient(item))}>
                                        <Icon name='remove' size={20}/>
                                    </Pressable>
                                    <Pressable onPress={() => addToShoppingCart(item)}>
                                        <Icon name='shopping-cart' size={20}/>
                                    </Pressable>
                                </View>
                            : <View style={styles.ingredientIcons}>
                                    <Pressable onPress={() => addIngredient(item)}>
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