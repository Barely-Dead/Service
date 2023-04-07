import { StyleSheet } from "react-native";

export const colors = {
    barracudaGreenLight: '#9AE14B',
    barracudaGreenMedium: '#85B83A',
    barracudaGreenDark: '#5F8B12',
    barracudaBlack: '#1B252F',
    barracudaDarkGrey: '#31444E'
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    row: {
        flexDirection: 'row'
    },
    textInput: {
        width: 300,
        margin: 3,
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#333',
        borderBottomWidth: 2,
        borderBottomColor: '#555',
        letterSpacing: -1,
        fontWeight: '600',
        fontSize: 16,
    },
    buttonCircle: {
        margin: 3,
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonOval: {
        margin: 3,
        width: 147,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 3,
    },
    buttonSave: {
        backgroundColor: colors.barracudaGreenMedium
    },
    buttonCancel: {
        backgroundColor: colors.barracudaDarkGrey
    },
    buttonSelect: {
        width: 147,
        // margin: 3,
        // paddingTop: 10,
        // paddingBottom: 5,
        // paddingLeft: 5,
        // paddingRight: 5,
        // color: '#333',
        // borderBottomWidth: 2,
        // borderBottomColor: '#555',
        // letterSpacing: -1,
        // fontWeight: '600',
        // fontSize: 16,
    },
    buttonSelectText: {
        letterSpacing: -1,
        fontWeight: '600',
        fontSize: 16,
    },
    coreShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.13,
        shadowRadius: 4.65,
        
        elevation: 6,
    },
    h1: {
        fontWeight: '600',
        fontSize: 18
    },
    h2: {
        //fontWeight: '600',
        fontSize: 16
    },
    h3: {

    },
    p: {

    }
})

export default Styles