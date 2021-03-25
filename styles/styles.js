import { StyleSheet, Dimensions } from 'react-native';

export const mainColor = '#B83B5E';
export const secondColor = '#F08A5D';
export const thirdColor = '#6A2C70';
export const fourthColor = '#EEECDA';
export const fifthColor = '#F01641';


const customFontRegular = 'Nunito-Regular';
const customFontBold = 'Nunito-SemiBold';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({

    // CARD STYLES
    recipeCard: {
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
    ingredientCard: {
        margin: 10,
        padding: 10,
        width: (width / 3) - 20,
        backgroundColor: secondColor,
        borderRadius: 10,
    },
    ingredientIcons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },  
    ingredientTitle: {
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    ingredientDetails: {
        paddingTop: 5,
        justifyContent: 'space-between',
        flex: 1
    },

    // Recipe Styles
    cocktailImage: {
        height:200,
        width: 200,
        borderRadius: 10,
        marginBottom: 10
    },
    recipeSectionHeader: {
        fontSize:20,
        textAlign:'center'
    },
    recipeContainer: {
        padding:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recipeSection: {
        width: '100%',
        borderWidth: 1,
        paddingHorizontal: 20,
        overflow: 'hidden',
        paddingVertical: 10,
        marginBottom: 5,
        borderRadius: 10,
        justifyContent: 'center'
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