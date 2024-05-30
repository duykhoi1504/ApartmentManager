import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, ActivityIndicator, Image } from "react-native";
import moment from "moment";
import { List } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyles from "../../styles/MyStyles"; // Đảm bảo bạn có MyStyles được định nghĩa


const Users = () =>{
    const[users,setUsers]=useState([]);
    const[loading,setLoading]=useState(false);
    const nav= useNavigation();
    
    const loadUsers= async () => {
        try{
            setLoading(true);
            let res=await APIs.get(endpoints['users']) 
            setUsers(res.data);
        }catch(ex){
            console.error(ex);
        }finally{
            setLoading(false);
        }
    }
    React.useEffect(() => {
        loadUsers();
    },[]);
    return(
        <View>
        <Text>DANH SACH USER</Text>
        {loading && <ActivityIndicator />}
        {users.map(c =>    <TouchableOpacity key={c.id} onPress={() => nav.navigate('ChatApp', { user: c })}>
                <List.Item style={MyStyles.margin} key={c.id} title={c.username} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{ uri: c.avatar }} />} />
                </TouchableOpacity>
                )}
        </View>
    )
}
export default Users