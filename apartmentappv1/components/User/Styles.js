import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 450,
    },
    button:{
        backgroundColor:'#1A4D2E',
        width: 340,
        paddingVertical: 5,
        alignSelf: 'center',
    },
    textTitle: {
        color: 'white',
        fontSize: 64,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    form: {
        backgroundColor: 'white',
        height: 700,
        width: 450,
        borderTopLeftRadius: 130,
    },
    textContent: {
        color: '#1A4D2E',
        fontSize: 40,
        fontWeight: 'bold',
    },
    content: {
        color: '#4F6F52',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: '#F5EFE6',
        width: '73%',
        marginVertical: 10,
        alignSelf: 'center',
    },
});