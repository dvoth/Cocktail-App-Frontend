import React, { useState, useEffect } from "react";
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
import { fetchIngredients } from './../../actions/ingredients'
import {API_URL} from '@env';

import { styles } from './../../styles/styles';

const IngredientFilter = ({ allIngredients, searchText }) => {
    console.log(allIngredients)
    console.log(searchText)

    return (
        <Text>In progress</Text>
    )
}

export default IngredientFilter