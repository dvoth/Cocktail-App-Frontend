import React, { useState, useEffect } from "react";
import {
    FlatList,
    Text,
    View,
    Input,
    LayoutAnimation,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import filter from 'lodash.filter'
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { constructErrorMessage } from './../../actions/messages';
import { fetchIngredients } from './../../actions/ingredients'
import {API_URL} from '@env';

import { styles } from './../../styles/styles';
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const IngredientFilter = ({ defaultIngredient, allIngredients, onSelectedIngredient }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [filteredIngredients, setFilteredIngredients] = useState();
    const [searchText, setSearchText] = useState();
    const [editableSearchText, setEditableSearchText] = useState(!defaultIngredient);

    function contains(ingredient, query) {
        if (
            ingredient.name.toLowerCase().includes(query) ||
            ingredient.ingredientType.name.toLowerCase().includes(query) ||
            ( ingredient.ingredientType.parentType &&
                ingredient.ingredientType.parentType.name.toLowerCase().includes(query)
            )
        ) {
            return true
        }

        return false
      }

    function handleSearch(query) {
        const formattedQuery = query.toLowerCase()
        const data = filter(allIngredients, function(ingredient) {
            return contains(ingredient, formattedQuery)
        })
        setSearchText(query)
        setFilteredIngredients(data)
    }

    function cancelSearch() {
        setSearchText("")
        setFilteredIngredients([])
        setEditableSearchText(true)
        onSelectedIngredient(null)
    }

    function handleSelectedIngredient(ingredient) {
        setSearchText(ingredient.name)
        setFilteredIngredients([])
        setEditableSearchText(false)
        onSelectedIngredient(ingredient)
    }

    function renderHeader() {
        return (
            <View style={styles.searchBarFieldContainer}>
                <Icon name='search' size={20} />
                <TextInput style={styles.searchBarInput}
                    placeholder={"Search Ingredients"}
                    onChangeText={handleSearch}
                    value={searchText}
                    editable={editableSearchText}
                    defaultValue={defaultIngredient ? defaultIngredient.name : null}

                />
                <Pressable onPress={() => cancelSearch()}>
                    <Icon style={{color: 'grey'}} name='clear' size={20} />
                </Pressable>
            </View>
        )
    }

    const renderSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                marginLeft: '5%'
                }}
            />
        )
    }
    
    const renderFooter = () => {
    if (!isLoading) return null
    return (
        <View
        style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE'
        }}>
        <ActivityIndicator animating size='large' />
        </View>
    )
    }

    return (
        <View>
            <FlatList
            data={filteredIngredients}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectedIngredient(item)}>
                    <View
                        style={{
                        flexDirection: 'row',
                        padding: 16,
                        alignItems: 'center'
                        }}>
                        <Text
                        category='s1'
                        style={{
                            color: '#000'
                        }}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => String(item.id)}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader()}
            ListFooterComponent={renderFooter}
            />
        </View>
    )
}

export default IngredientFilter