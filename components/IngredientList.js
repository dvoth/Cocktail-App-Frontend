import React, { useEffect, useState } from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,FlatList,Text,Button,} from 'react-native';
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={ingredients}
                    keyExtractor={({ id }, index) =>  String(id) }
                    renderItem={({ item }) => (
                        <Text>{item.name}</Text>
                    )}/>
            </SafeAreaView>
        </>
  );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default IngredientList;