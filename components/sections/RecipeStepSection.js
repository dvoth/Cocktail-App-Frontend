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

import { styles } from './../../styles/styles';

import { addNewRecipeStep, removeNewRecipeStep, clearRecipeStepErrors } from '../../actions/recipes'

const defaultOptions = {
    open: false,
    readonly: false,
}

const RecipeStepSection = ({options}) => {
    const newOptions = mergeOptions(options)

    // Flags for opening the section and displaying "add step" input fields
    const [open, setopen] = useState(newOptions.open);
    const [addingStep, setAddingStep] = useState(false);

    // State for the textinput fields
    const [description, setDescription] = useState()

    // Redux state for error handling and holding the new recipe steps
    const errors = useSelector(state => state.recipes.addRecipeStepErrors)
    const recipeErrors = useSelector(state => state.recipes.addRecipeErrors)
    const newRecipeSteps = useSelector(state => state.recipes.newRecipeSteps)

    const dispatch = useDispatch()

    // When our errors change, we need to clear the inputs and what not
    useEffect(() => {
        if (errors.errorFree) {
            removeInProgressStep()
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

    function addRecipeStep() {
        const newRecipeStep = {
            description: description,
            order: newRecipeSteps.length + 1
        }
        
        dispatch(addNewRecipeStep(newRecipeStep))
    }

    function removeInProgressStep() {
        clearInputs()
        dispatch(clearRecipeStepErrors())
    }

    const clearInputs = () => {
        setAddingStep()
        setDescription()
    }

    return (
        <TouchableOpacity style={[styles.recipeSection, recipeErrors.stepError && styles.inputError, !open && { height: 50 }]} activeOpacity={1}>
        <Text onPress={toggleSection} style={styles.recipeSectionHeader}>Steps</Text>
            {/* Only display the section content if the section is open */}
            {open && (
                <View>
                    <FlatList 
                        data={newRecipeSteps}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', flex: 5}}>
                                    <Text>{index + 1}.  </Text>
                                    <Text>{item.description}</Text>
                                </View>
                                <Pressable style={{flex: 1}} onPress={() => dispatch(removeNewRecipeStep(item))}>
                                    <Icon style={{alignSelf: 'flex-end', flex: 1}} name='cancel' size={20}/>
                                </Pressable>
                            </View>
                        )}
                    />
                    {/* Only add the "add step" section if the component is not readonly */}
                    {!newOptions.readonly && (
                        addingStep
                            // If adding a step, show input fields for adding a RecipeStep
                            ? <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <TextInput 
                                    style={[
                                        {flex: 1, alignSelf: "flex-start"},
                                        errors.descriptionError && styles.inputError
                                    ]}
                                    placeholder="Detail your step here..."
                                    onChangeText={setDescription}
                                />
                                <Pressable style={{marginTop: 13, paddingRight: 20}} onPress={() => addRecipeStep()}>
                                    <Icon name='check' size={20}/>
                                </Pressable>
                                <Pressable style={{marginTop: 13}} onPress={() => removeInProgressStep()}>
                                    <Icon name='cancel' size={20}/>
                                </Pressable>
                              </View>
                            // If not adding a step, show the button to press to add a new RecipeStep
                            : <Pressable style={styles.flexRow} onPress={() => setAddingStep(true)}>
                                <Icon name='add' size={20}/>
                                <Text>Add Step</Text>
                            </Pressable>
                    )}
                    
                </View>
            )}
        </TouchableOpacity>
    );
}

export default RecipeStepSection