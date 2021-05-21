import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {SafeAreaView,Image,View,FlatList,Text,Pressable,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'react-native-gesture-handler';
import { styles } from './../styles/styles';
import { fetchIngredients } from '../actions/ingredients'
import {API_URL} from '@env';

const IngredientList = props => {
    const dispatch = useDispatch();
    const ingredientData = useSelector(state => state.ingredients)
  
    useEffect(() => {
        // get ingredients from /actions/ingredients
        dispatch(fetchIngredients());
    }, []);

    const addIngredient = (ingredient) => {
        fetch(API_URL+'/users/1/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ingredientId: 4
            })
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error(error))
        //   .finally(() => setLoading(false));
    }

    const addToShoppingCart = (ingredient) => {

    }

    return (
        <SafeAreaView>
            <FlatList
                data={ingredientData.ingredients}
                keyExtractor={({ id }, index) =>  String(id) }
                numColumns={3}
                renderItem={({ item }) => (
                    <View style={styles.ingredientCard}>
                        <Image 
                            source={{uri: item.image}} 
                            style={styles.thumbnail}/>
                        <View style={styles.ingredientDetails}>
                            <Text style={styles.ingredientTitle}>{item.name}</Text>
                            <View style={styles.ingredientIcons}>
                                <Pressable onPress={() => addIngredient(item)}>
                                    <Icon name='add' size={20}/>
                                </Pressable>
                                <Pressable onPress={() => addToShoppingCart(item)}>
                                    <Icon name='shopping-cart' size={20}/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )}/>
        </SafeAreaView>
  );
}

export default IngredientList;