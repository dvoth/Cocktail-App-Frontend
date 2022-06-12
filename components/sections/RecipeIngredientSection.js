import React, { useEffect, useState } from "react";
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

import { addNewRecipeIngredient, removeNewRecipeIngredient } from '../../actions/recipes'
import RecipeIngredientEditor from "../editors/RecipeIngredientEditor";

const defaultOptions = {
    open: false,
    ingredients: [],
    readonly: false,
}

const RecipeIngredientsSection = ({options}) => {
    const newOptions = mergeOptions(options)

    // Flags for opening the section and displaying "add ingredient" input fields
    const [open, setopen] = useState(newOptions.open);
    const [addingIngredient, setAddingIngredient] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState();

    // Redux state for error handling and holding the new recipe ingredients
    const newRecipeIngredients = useSelector(state => state.recipes.newRecipeIngredients)

    const dispatch = useDispatch()

    const toggleSection = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setopen(!open);
    };

    function finishEditing(ingredient) {
        setAddingIngredient(false)
        setEditingIngredient(false)
    }

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
        <TouchableOpacity style={[styles.recipeSection, !open && { height: 50 }]} activeOpacity={1}>
        <Text onPress={toggleSection} style={styles.recipeSectionHeader}>Ingredients</Text>
            {/* Only display the section content if the section is open */}
            {open && (
                <View>
                    <FlatList 
                        data={newRecipeIngredients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            editingIngredient == item
                            // Display the ingredient editor if editing
                            ?< RecipeIngredientEditor 
                                allIngredients={newOptions.ingredients}
                                onFinishEditing={finishEditing}
                                recipeIngredient={editingIngredient}
                                />
                            
                            :
                            // Display the ingredient data if not editing
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Text style={{flex: 1}}>{parseInt(item.quantity)} {item.unit} {item.ingredient.name}</Text>
                                <Pressable style={{paddingRight: 20}} onPress={() => setEditingIngredient(item)}>
                                    <Icon name='edit' size={20}/>
                                </Pressable>
                                <Pressable onPress={() => dispatch(removeNewRecipeIngredient(item))}>
                                    <Icon name='cancel' size={20}/>
                                </Pressable>
                            </View>
                        )}
                    />
                    {/* Only add the "add ingredient" section if the component is not readonly */}
                    {!newOptions.readonly && (
                        addingIngredient
                            // If adding an ingredient, show input fields for adding a RecipeIngredient
                            ? <RecipeIngredientEditor 
                                allIngredients={newOptions.ingredients}
                                onFinishEditing={finishEditing}
                                />
                            // If not adding an ingredient, show the button to press to add a new RecipeIngredient
                            : <Pressable style={styles.flexRow} onPress={() => setAddingIngredient(true)}>
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