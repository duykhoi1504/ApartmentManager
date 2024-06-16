// import { StyleSheet } from "react-native";

// export default StyleSheet.create({
//     container:{
//         flex:1,
//         // marginTop : 60,
//         // justifyContent:"center",
//         // alignItems:"center"
//     },subject:{
//         fontSize:30,
//         fontWeight:"bold",
//         color:"blue"

//     },row:{
//         flexDirection: "row",
//         flexWrap:"wrap"
//     },margin:{
//         margin:5
//     },avatar:{
//         width:80,
//         height:80,
//         borderRadius:20,
//     },
//     banner:{
//         flex:0.5,
//         backgroundColor:"#6495ed"
//     },
//     status: {
//         padding: 5,
//         borderRadius: 5,
//         color: 'white',
//         textAlign: 'center',
//     }, 
//     pending: {
//         backgroundColor: 'yellow',
//         color: 'black',
//     },
//     pass: {
//         backgroundColor: 'green',
//     },
// });
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }, subject: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1A4D2E",
        textAlign: 'center',

    }, row: {
        flexDirection: "row",
        flexWrap: "wrap"
    }, margin: {
        margin: 5
    }, avatar: {
        width: 70,
        height: 70,
        borderRadius: 50,
        // marginBottom: 5,
        borderWidth: 1,
        borderColor: 'white',
        // width:80,
        // height:80,
        // borderRadius:20,
    },
    name: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: "#F5EFE6",
    },
    banner: {
        flex: 0.5,
        backgroundColor: "#6495ed"
    },
    status: {
        padding: 5,
        borderRadius: 5,
        color: 'white',
        textAlign: 'center',
    },
    pending: {
        backgroundColor: '#AFD198', // Olive green color for pending status
        color: 'black',
      },
      pass: {
        backgroundColor: '#E8DFCA', // Light beige color for received status
      },
    header: {
        backgroundColor: "#1A4D2E",
        alignItems: "center",
        padding: 20,
    },
    button: {
        marginHorizontal: 24,
        marginVertical: 12,
        backgroundColor: '#1A4D2E',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    successText: {
        color: 'green',
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: '#1A4D2E',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E8DFCA',
      },label: {
        fontSize: 16,
        color: '#1A4D2E',
        fontWeight: 'bold',
        marginBottom: 10,
    },
});