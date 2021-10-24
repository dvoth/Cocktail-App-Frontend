import React, { useState } from 'react';
import { styles } from './../../styles/styles';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Image,
  Button
} from 'react-native';


const RecipeFilter = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.filter} >
            <Button onPress={() => setIsOpen(!isOpen)} style={styles.filterButton} title="Filter">Filter</Button>
        </View>
    )
}

export default RecipeFilter;