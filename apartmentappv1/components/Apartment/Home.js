import MyStyles from "../../styles/MyStyles";
import React, { useContext } from "react";
import { Avatar, IconButton } from "react-native-paper";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MyUserContext } from "../../configs/Contexts";
 

const Home = ({ navigation }) => {
    const user = useContext(MyUserContext);
    // <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Tudodientu")} title="Danh sách tủ đồ" />
    // <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Đăng kí dịch vụ" />
    // <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Hóa đơn" />
    // <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Phananh")} title="Phản ánh" />
    // <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Làm khảo sát" />
    // <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("TheXeNguoiThan")} title="Đăng kí thẻ xe cho người thân" />
    // <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Thông báo" />
    const items = [
      // { title: "Home", icon: "account", navigateTo: "Profile" },

      { title: "Danh sách tủ đồ", icon: "home", navigateTo: "Tudodientu" },
      { title: "Đăng kí dịch vụ", icon: "heart", navigateTo: "Dichvu" },
      { title: "Hóa đơn", icon: "account-group", navigateTo: "Hoadon" },
      { title: "Phản ánh", icon: "account-multiple", navigateTo: "Phananh" },
      { title: "Làm khảo sát", icon: "school", navigateTo: "SchoolScreen" },
      { title: "Đăng kí thẻ xe cho người thân", icon: "briefcase", navigateTo: "TheXeNguoiThan" },
      // { title: "Thông báo", icon: "earth", navigateTo: "Home" },
      { title: "payment", icon: "earth", navigateTo: "PaymentScreen" }
      
    ];
    return(
        <View style={MyStyles.container}>
      {/* <View style={styles.header}>
        <Avatar.Image size={50} source={{ uri: user.avatar }} />
        <IconButton icon="dots-vertical" onPress={() => navigation.navigate("Home")} />
      </View> */}

      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
      </View>

      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity key={index} style={styles.gridItem} onPress={() => navigation.navigate(item.navigateTo)}>
            <Avatar.Icon size={70} icon={item.icon} />
            <Text style={styles.gridItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    )
};
export default Home   

const styles = StyleSheet.create({
    header: {
        backgroundColor:"#66CCFF",
        alignItems: "center",
        padding: 20,
      },
    grid: {
      flexDirection:'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    gridItem: {
      // display:'flex',
      alignItems: 'center',
      // justifyContent: 'space-between',
      margin: 16
    },
    gridItemText: {
      
      marginTop: 8,
      fontSize: 16,
      color: '#000'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
      name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
      },
  });


  
// import MyStyles from "../../styles/MyStyles";

// import React, { useContext, useState } from "react";
// import { Chip, List,Menu,Searchbar,Avatar,Card, IconButton, Badge, Switch, TextInput  } from "react-native-paper";
// import { View,Text,ActivityIndicator,Image, ScrollView, RefreshControl,TouchableOpacity } from "react-native";
// import moment from "moment";
// import { MyUserContext } from "../../configs/Contexts";

// const Home = ({navigation}) => {
// const user= useContext(MyUserContext)

//     return(
         
//         <View style={MyStyles.container}>
         
//             <View leadingIcon='text-long'>
//                 {/* <Text>notifications_ICON</Text>
//             <Badge> 3</Badge> */}
//             </View>
          
//              {/* <Avatar.Image size={90} source={require('../../assets/house1.jpg')} /> */}
//              <Card.Title style={MyStyles.banner}
//                 title={user.username}
//                 subtitle="thuộc căn hộ"
//                 left={(props) => <Avatar.Image size={50}  source={{ uri: user.avatar}} />}
//                 right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() =>{navigation.navigate("Home")}} />}
//   />            
//             <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Tudodientu")} title="Danh sách tủ đồ" />
//             <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Đăng kí dịch vụ" />
//             <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Hóa đơn" />
//             <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Phananh")} title="Phản ánh" />
//             <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Làm khảo sát" />
//             <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("TheXeNguoiThan")} title="Đăng kí thẻ xe cho người thân" />
//             <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Thông báo" />
//         </View>
//     )
// };
// export default Home