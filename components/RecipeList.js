import React, { useEffect, useState } from 'react';
import {SafeAreaView,FlatList,Button,} from 'react-native';
import 'react-native-gesture-handler';


const RecipeList = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      fetch('http://192.168.1.245:8000/recipes/')
        .then((response) => response.json())
        .then((json) => setRecipes(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <SafeAreaView>
                <FlatList
                    data={recipes}
                    keyExtractor={({ id }, index) =>  String(id) }
                    renderItem={({ item }) => (
                        <Button title={item.name} onPress={() => navigation.navigate('Recipe', {recipe: item})}/>
                    )}/>
            </SafeAreaView>
        </>
  );
}
export default RecipeList;