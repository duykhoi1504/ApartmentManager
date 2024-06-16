import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Button, StyleSheet } from "react-native";
import MyStyles from "../../styles/MyStyles";
import React, { useContext } from "react";
import APIs, { endpoints } from '../../configs/APIs';
import { List } from "react-native-paper";
import { MyUserContext } from "../../configs/Contexts";
import moment from "moment/moment";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";



const Hoadon = () => {
   const [hoadons, setHoadons] = React.useState([]);
   const [loading, setLoading] = React.useState(false);
   const [status, setStatus] = React.useState('');
   const [selectedButton, setSelectedButton] = useState('');
   const nav= useNavigation();
//    const selectChecked = navigation.params?.selectedServices;
    // const route = useRoute();

   const user = useContext(MyUserContext);

//    const selectChecked= route.params?.selectedServices;

   // console.log('Authtoken:', user.access_token);


   const loadHoaDons = async () => {
       
        setLoading(true);
        try {
            let res = await APIs.get(endpoints['hoadons'], {
                headers: {
                'Authorization': `Bearer ${user.access_token}`,
                },
                params: {
                status: status,
                user_id: user.id
                
                }
            });
            // console.log(res.data)
            // setHoadons(res.data.results.filter(item => item.user.id === user.id));
            setHoadons(res.data.results);

            
            } catch (ex) {
            console.error(ex);
            } finally {
            setLoading(false)
            }
    };


   React.useEffect(() => {
    
       loadHoaDons()
   }, [status])


   const handleButtonPress = (newStatus) => {
    if (newStatus === selectedButton) {
        setStatus(null); // Nếu nút được nhấn trước đó đã được chọn lại, đặt trạng thái thành null (Tất cả)
        setSelectedButton('');
    } else {
        setStatus(newStatus);
        setSelectedButton(newStatus);
    }
};


return (
    <View style={MyStyles.container}>
        <Text style={MyStyles.subject}>Hoá đơn của tôi</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, selectedButton === '' && styles.selectedButton]}
                onPress={() => handleButtonPress('')}>
                <Text style={styles.buttonText}>Tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedButton === 'pending' && styles.selectedButton]}
                onPress={() => handleButtonPress('pending')}>
                <Text style={styles.buttonText}>Chờ xử lý</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedButton === 'paid' && styles.selectedButton]}
                onPress={() => handleButtonPress('paid')}>
                <Text style={styles.buttonText}>Đã đóng tiền</Text>
            </TouchableOpacity>
        </View>

        <ScrollView>
            {loading && <ActivityIndicator color="#1A4D2E" />}
            {hoadons.map(c => (
                <TouchableOpacity key={c.id} onPress={() => nav.navigate("Hoadondetails", { hoadonId: c.id })}>
                    <List.Item
                        style={[
                            styles.listItem,
                            c.status === 'pending' && styles.pending,
                            c.status === 'paid' && styles.paid
                        ]}
                        title={c.name}
                        titleStyle={styles.title}
                        description={moment(c.created_date).fromNow()}
                        descriptionStyle={styles.description}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
);
};
export default Hoadon;

const styles = StyleSheet.create({
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
},
button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E8DFCA',
    borderRadius: 5,
    marginHorizontal: 5,
},
selectedButton: {
    backgroundColor: '#AFD198',
},
buttonText: {
    color: '#1A4D2E',
    textAlign: 'center',
    fontWeight: 'bold',
},
listItem: {
    marginBottom: 10,
    backgroundColor: '#F5EFE6',
    borderRadius: 5,
},
pending: {
    backgroundColor: '#E8DFCA',
},
paid: {
    backgroundColor: '#AFD198',
},
title: {
    color: '#1A4D2E',
    fontWeight: 'bold',
},
description: {
    color: '#4F6F52',
},
});