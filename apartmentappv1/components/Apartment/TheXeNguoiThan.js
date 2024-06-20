import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, FlatList, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import MyStyles from '../../styles/MyStyles';
import APIs, { endpoints } from '../../configs/APIs';
import { MyUserContext } from '../../configs/Contexts';
import { IconButton, List, Button } from 'react-native-paper';
import moment from 'moment';


const TheXeNguoiThan = () => {
    const [name, setName] = useState('');
    const [cccd, setCccd] = useState('');
    const [sdt, setSdt] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const user = useContext(MyUserContext)
    const [nguoiThans, setNguoiThans] = useState([]);

    React.useEffect(() => {
        loadNguoiThans();
    }, [nguoiThans]);

    const loadNguoiThans = async () => {
        try {
            let res = await APIs.get(endpoints['nguoithans'], {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`,
                },
                params: {
                    user_id: user.id,
                },
            });
            setNguoiThans(res.data.filter(item => item.user_id === user.id)); 
        } catch (ex) {
            console.error('Error fetching nguoiThans:', ex.response?.data || ex.message);
            setError('Có lỗi xảy ra khi tải thông tin người thân.');
        }
    };
    const handleSubmit = async () => {
        setError("")
        setSuccessMessage("")
        if (!name || !cccd || !sdt) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }


        Alert.alert(
            'Xác nhận',
            'Hãy chắc chắn bạn đã điền thông tin chính xác.',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        const formData = new FormData();
                        formData.append('name', name);
                        formData.append('cccd', cccd);
                        formData.append('sdt', sdt);
                        formData.append('user_id', user.id);

                        try {
                            let res = await APIs.post(endpoints['nguoithans'], formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': `Bearer ${user.access_token}`,
                                },
                            });
                            console.log('Success:', res.data);
                            setSuccessMessage('Đăng ký thành công.');
                        } catch (ex) {
                            console.error('Error posting:', ex.response?.data || ex.message);
                            setError('Có lỗi xảy ra khi đăng bài viết.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    }
    const renderNguoiThanItem = ({ item }) => (
        <View style={styles.item}>
            <Text>Tên: {item.name}</Text>
            <Text>Số CCCD: {item.cccd}</Text>
            <Text>Số điện thoại: {item.sdt}</Text>
            <Text>Trạng thái: {item.status}</Text>
            <Text>===========================</Text>

        </View>
    );

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG KÍ THÔNG TIN NGƯỜI THÂN</Text>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TextInput
                    placeholder="Họ và tên"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Số căn cước công dân"
                    keyboardType="numeric"
                    value={cccd}
                    onChangeText={setCccd}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Số điện thoại"
                    keyboardType="phone-pad"
                    value={sdt}
                    onChangeText={setSdt}
                    style={styles.input}
                />
                {error ? <Text style={MyStyles.errorText}>{error}</Text> : null}
                {successMessage ? <Text style={MyStyles.successText}>{successMessage}</Text> : null}

                <Button style={MyStyles.button} mode="contained" onPress={handleSubmit}>SUBMIT</Button>
            </KeyboardAvoidingView>
            <Text style={[MyStyles.subject, {marginTop: 20, marginBottom: 10}]}>DANH SÁCH NGƯỜI THÂN</Text>
            <ScrollView>
          
            {nguoiThans.map(item =>
                    <View style={styles.item} key={item.id}>
                        <View style={styles.profileHeader}>
                        <IconButton icon="account" size={50} />
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{item.name}</Text>
                                <Text>Số CCCD: {item.cccd}</Text>
                                <Text>Số điện thoại: {item.sdt}</Text>
                                <Text style={[
                                    styles.status,
                                    item.status === 'pending' && styles.pending,
                                    item.status === 'pass' && styles.pass
                                ]}>
                                    Trạng thái: {item.status}
                                </Text>
                            </View>
                        </View>
                       
                    </View>
                )}
            </ScrollView>
        </View>
    )
};
export default TheXeNguoiThan

const styles = StyleSheet.create({
    input: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    item: {
        marginBottom: 20,
        backgroundColor: '#FFF7F1',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileInfo: {
        marginLeft: 10,
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A4D2E',
    },
    status: {
        padding: 5,
        borderRadius: 5,
        color: 'white',
        textAlign: 'center',
    },
    pending: {
        backgroundColor: '#E8DFCA',
        color: 'black',
        fontWeight: 'bold',
    },
    pass: {
        backgroundColor: '#4F6F52',
        color: 'white',
        fontWeight: 'bold',
    },
});