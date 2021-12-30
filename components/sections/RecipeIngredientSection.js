import React, { useState } from "react";
import {
    FlatList,
    Text,
    View,
    LayoutAnimation,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { constructErrorMessage } from './../../actions/messages';
import IngredientFilter from "../filters/IngredientFilter";
import {API_URL} from '@env';

import { styles } from './../../styles/styles';

const defaultOptions = {
    open: false,
    ingredients: [],
    readonly: false,
}

const RecipeIngredientsSection = ({options}) => {
    const [open, setopen] = useState(true);
    const [addingIngredient, setAddingIngredient] = useState(false);
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [searchText, setSearchText] = useState()
    const newOptions = mergeOptions(options)
    const [filteredIngredients, setFilteredIngredients] = useState(newOptions.ingredients)

    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setopen(!open);
    };

    function mergeOptions(specifiedOptions) {
        // Initialize with default options
        let newOptions = {...defaultOptions}

        if (specifiedOptions) {
            // Overwrite defaults with any specified by user
            for (const [key, value] of Object.entries(specifiedOptions)) {
                newOptions[key] = value    
            }
        }

        return newOptions;
    }

    return (
        <TouchableOpacity style={[styles.recipeSection, !open && { height: 50 }]} onPress={onPress} activeOpacity={1}>
        <Text style={styles.recipeSectionHeader}>Ingredients</Text>
            {/* Only display the section content if the section is open */}
            {open && (
                <View>
                    <FlatList 
                        data={recipeIngredients}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <Text>{parseInt(item.measure)} {item.unit} {item.name}</Text>
                        )}
                    />
                    {/* Only add the "add ingredient" section if the component is not readonly */}
                    {!newOptions.readonly && (
                        addingIngredient
                            // If adding an ingredient, show input fields for adding a RecipeIngredient
                            ? <IngredientFilter 
                                allIngredients={newOptions.ingredients}
                                searchText={searchText}
                                onFilterChange={(ingredients) => setFilteredIngredients(ingredients)}
                              />
                            // If not adding an ingredient, show the button to press to add a new RecipeIngredient
                            : <Pressable style={styles.addIngredientButton} onPress={() => setAddingIngredient(true)}>
                                <Icon name='add' size={20}/>
                                <Text>Add ingredient</Text>
                            </Pressable>
                    )}
                    
                </View>
            )}
        </TouchableOpacity>
    );
}

export default RecipeIngredientsSection