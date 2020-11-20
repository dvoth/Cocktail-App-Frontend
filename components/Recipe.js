import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const Recipe = ({route}) => {
    const { recipe } = route.params;
    return (
        <View style={styles.container}> 
            <Text style={styles.header}>Ingredients</Text>
            <FlatList 
                data={recipe.ingredients}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <Text>{parseInt(item.measure)} {item.unit} {item.ingredient.name}</Text>
                )}
            />
            <Text style={styles.header}>Steps</Text>
            <FlatList 
                data={recipe.steps}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <Text>{item.order}.  {item.description}</Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize:20
    },
    container: {
        padding:10
    }
})

export default Recipe;