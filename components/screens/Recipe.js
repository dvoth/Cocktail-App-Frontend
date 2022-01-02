import React, { useState } from 'react';
import { styles } from './../../styles/styles';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Image
} from 'react-native';

const RecipeIngredientsSection = ({ recipe }) => {
    const [open, setopen] = useState(false);
    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setopen(!open);
    };
    
    return (
        <TouchableOpacity style={[styles.recipeSection, !open && { height: 50 }]} onPress={onPress} activeOpacity={1}>
        <Text style={styles.recipeSectionHeader}>Ingredients</Text>
            {open && (
                <FlatList 
                    data={recipe.ingredients}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Text>{parseInt(item.quantity)} {item.unit} {item.ingredient.name}</Text>
                    )}
                />
            )}
        </TouchableOpacity>
    );
}

const RecipeDirectionsSection = ({ recipe }) => {
    const [open, setopen] = useState(true);
    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setopen(!open);
    };
    
    return (
        <TouchableOpacity style={[styles.recipeSection, !open && { height: 50 }]} onPress={onPress} activeOpacity={1}>
            <Text style={styles.recipeSectionHeader}>Steps</Text>
            {open && (
                <FlatList 
                    data={recipe.steps}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Text>{item.order}.  {item.description}</Text>
                    )}
                />
            )}
        </TouchableOpacity>
    );
}

const Recipe = ({route}) => {
    const { recipe } = route.params;
    return (
        <View style={styles.recipeContainer}> 
            <Image 
                source={{uri: recipe.image }} 
                style={styles.cocktailImage}
            />
            <RecipeIngredientsSection recipe={recipe} />
            <RecipeDirectionsSection recipe={recipe} />
        </View>
    )
}

export default Recipe;