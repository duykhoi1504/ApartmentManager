import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Button, StyleSheet } from "react-native";
import MyStyles from "../../styles/MyStyles";
import React, { useContext } from "react";
import APIs, { endpoints } from '../../configs/APIs';
import { List } from "react-native-paper";
import { MyUserContext } from "../../configs/Contexts";
import moment from "moment/moment";
import { useState } from "react";

const HoaDon = ({ navigation }) => {
    const [hoadons, setHoadons] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [selectedButton, setSelectedButton] = useState('');

    const user = useContext(MyUserContext);

    // console.log('Authtoken:', user.access_token);

    const loadHoaDons = async () => {
        setLoading(true);
        try {
            let res = await APIs.get(endpoints['hoadons'], {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`,
                },
                params: {
                    status: status // Truyền trạng thái
                }
            });
            setHoadons(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadHoaDons()
    }, [status])

    const handleButtonPress = (newStatus) => {
        setStatus(newStatus);
        setSelectedButton(newStatus);
    };

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>Hoá đơn của tôi</Text>
            <View style={styles.icontainer}>
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
                {loading && <ActivityIndicator />}
                {hoadons.map(c => (
                    <TouchableOpacity key={c.id} onPress={() => navigation.navigate("HoaDonDetails", { hoadonId: c.id })}>
                        <List.Item style={MyStyles.margin} title={c.name} description={moment(c.created_date).fromNow()} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* <ScrollView >
                {loading && <ActivityIndicator />}
                {hoadons.map(c => <TouchableOpacity key={c.id} onPress={() => navigation.navigate("HoaDonDetails", { hoadonId: c.id })}>
                    <List.Item style={MyStyles.margin} key={c.id} title={c.name} description={moment(c.created_date).fromNow()} />
                </TouchableOpacity>
                )}
            </ScrollView> */}
        </View>
    )
};
export default HoaDon

const styles = StyleSheet.create({
    icontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#cccccc',
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#ffffff',
    },
});