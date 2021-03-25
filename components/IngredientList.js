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

    return (
        <>
            <SafeAreaView>
                <FlatList
                    data={ingredients}
                    keyExtractor={({ id }, index) =>  String(id) }
                    numColumns={3}
                    renderItem={({ item }) => (
                        <Pressable style={styles.ingredientCard} onPress={() => navigation.navigate('Ingredient', {ingredient: item})}>

                                <Image 
                                    source={{uri: item.image}} 
                                    style={styles.thumbnail}/>
                            <View style={styles.ingredientDetails}>
                                <Text style={styles.ingredientTitle}>{item.name}</Text>
                                <View style={styles.ingredientIcons}>
                                    <Icon name='add' size={20}/>
                                    <Icon name='shopping-cart' size={20}/>
                                </View>
                            </View>
                        </Pressable>
                    )}/>
            </SafeAreaView>
        </>
  );
}

export default IngredientList;