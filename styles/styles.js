import { StyleSheet } from 'react-native';

export const mainColor = '#B83B5E';
export const secondColor = '#F08A5D';
export const thirdColor = '#6A2C70';
export const fourthColor = '#EEECDA';
export const fifthColor = '#F01641';


const customFontRegular = 'Nunito-Regular';
const customFontBold = 'Nunito-SemiBold';

export const styles = StyleSheet.create({

    // CARD STYLES
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: mainColor,
        borderRadius: 10,
        flexDirection: 'row',
        flex: 1
    },
    thumbnail: {
        height:100,
        width: 100,
        borderRadius: 10,
        marginRight: 10
    },
    recipeDetailsContainer: {
        flex: 1,
    },
    recipeTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    recipeTitle: {
        fontSize: 18,
    },
    recipeDetails: {
        paddingTop: 5,
    },
    
})

// This is not typical react native styling, refer to https://reactnavigation.org/docs/bottom-tab-navigator#tabbaroptions
export const bottomNavStyles = {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    labelStyle: {
        fontSize: 14
    }
}