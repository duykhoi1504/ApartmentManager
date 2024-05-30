
import MyStyles from "../../styles/MyStyles";

import React, { useContext, useState } from "react";
import { Chip, List,Menu,Searchbar,Avatar,Card, IconButton, Badge, Switch, TextInput  } from "react-native-paper";
import { View,Text,ActivityIndicator,Image, ScrollView, RefreshControl,TouchableOpacity } from "react-native";
import moment from "moment";
import { MyUserContext } from "../../configs/Contexts";

const Home = ({navigation}) => {
const user= useContext(MyUserContext)

    return(
         
        <View style={MyStyles.container}>
         
            <View leadingIcon='text-long'>
                {/* <Text>notifications_ICON</Text>
            <Badge> 3</Badge> */}
            </View>
          
             {/* <Avatar.Image size={90} source={require('../../assets/house1.jpg')} /> */}
             <Card.Title style={MyStyles.banner}
                title={user.username}
                subtitle="thuộc căn hộ"
                left={(props) => <Avatar.Image size={50}  source={{ uri: user.avatar}} />}
                right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() =>{navigation.navigate("Home")}} />}
  />            
            <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Tudodientu")} title="Danh sách tủ đồ" />
            <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Đăng kí dịch vụ" />
            <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Hóa đơn" />
            <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Phananh")} title="Phản ánh" />
            <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Làm khảo sát" />
            <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Đăng kí thẻ xe cho người thân" />
            <Menu.Item leadingIcon="text-long" onPress={() => navigation.navigate("Home")} title="Thông báo" />
        </View>
    )
};
export default Home   