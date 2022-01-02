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

    // State for the textinput fields
    const [selectedIngredient, setSelectedIngredient] = useState()
    const [quantity, setQuantity] = useState()
    const [unit, setUnit] = useState()

    // Redux state for error handling and holding the new recipe ingredients
    const errors = useSelector(state => state.recipes.addRecipeIngredientErrors)
    const newRecipeIngredients = useSelector(state => state.recipes.newRecipeIngredients)

    const dispatch = useDispatch()

    // When our errors change, we need to clear the inputs and what not
    useEffect(() => {
        if (errors.errorFree) {
            clearInputs()
        }
    }, [errors]);

    const toggleSection = () => {
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

    function addRecipeIngredient() {
        const newRecipeIngredient = {
            ingredient: selectedIngredient,
            unit: unit,
            quantity: quantity
        }
        
        dispatch(addNewRecipeIngredient(newRecipeIngredient))
    }

    const clearInputs = () => {
        setAddingIngredient()
        setQuantity()
        setUnit()
        setSelectedIngredient();
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
                            <View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-between'}}>
                                <Text>{parseInt(item.quantity)} {item.unit} {item.ingredient.name}</Text>
                                <Pressable style={{alignSelf: 'center'}} onPress={() => dispatch(removeNewRecipeIngredient(ingredient))}>
                                    <Icon name='cancel' size={20}/>
                                </Pressable>
                            </View>
                        )}
                    />
                    {/* Only add the "add ingredient" section if the component is not readonly */}
                    {!newOptions.readonly && (
                        addingIngredient
                            // If adding an ingredient, show input fields for adding a RecipeIngredient
                            ? <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <View style={errors.ingredientError && styles.inputError}>
                                    <IngredientFilter 
                                        allIngredients={newOptions.ingredients}
                                        onSelectedIngredient={setSelectedIngredient}
                                        style={{ backgroundColor: 'grey' }}
                                    />
                                </View>
                                <TextInput 
                                    style={[
                                        {flex: 1, alignSelf: "flex-start"},
                                        errors.quantityError && styles.inputError
                                    ]}
                                    placeholder="1"
                                    onChangeText={setQuantity}
                                    keyboardType='numeric'
                                />
                                <TextInput 
                                    style={[
                                        {flex: 2, alignSelf: "flex-start"},
                                        errors.unitError && styles.inputError
                                    ]}
                                    placeholder="oz"
                                    onChangeText={setUnit}
                                />
                                <Pressable style={{marginTop: 13, paddingRight: 20}} onPress={() => addRecipeIngredient()}>
                                    <Icon name='check' size={20}/>
                                </Pressable>
                                <Pressable style={{marginTop: 13}} onPress={() => clearInputs()}>
                                    <Icon name='cancel' size={20}/>
                                </Pressable>
                              </View>
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