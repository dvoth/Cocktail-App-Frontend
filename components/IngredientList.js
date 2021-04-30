import React, { useEffect, useState } from 'react';
import {SafeAreaView,Image,View,FlatList,Text,Pressable,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import 'react-native-gesture-handler';
import { styles } from './../styles/styles';


const IngredientList = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
  
    useEffect(() => {
      fetch('http://192.168.1.245:8000/ingredients/')
        .then((response) => response.json())
        .then((json) => setIngredients(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    const addIngredient = (ingredient) => {
        var formData = new FormData();
        formData.append('key1', 'value1');
        formData.append('key1', 'value2');


        fetch('http://192.168.1.245:8000/users/1/', {
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
        <>
            <SafeAreaView>
                <FlatList
                    data={ingredients}
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
        </>
  );
}

export default IngredientList;