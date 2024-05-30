import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import MyStyles from '../../styles/MyStyles';
import APIs, { endpoints } from '../../configs/APIs';

const TheXeNguoiThan = () => {
    const [hoten, setHoten] = useState('');
    const [cancuoc, setCancuoc] = useState('');
    const [sodienthoai, setSodienthoai] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async () => {
        if (!hoten || !cancuoc || !sodienthoai) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        Alert.alert(
            'Xác nhận',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        const formData = new FormData();
                        formData.append('hoten', hoten);
                        formData.append('cancuoc', cancuoc);
                        formData.append('sodienthoai', sodienthoai);

                        try {
                            let res = await APIs.post(endpoints['nguoithans'], formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
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

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG KÍ THÔNG TIN NGƯỜI THÂN</Text>
            <TextInput
                placeholder="Họ và tên"
                value={hoten}
                onChangeText={setHoten}
                style={styles.input}
            />
            <TextInput
                placeholder="Số căn cước công dân"
                keyboardType="numeric"
                value={cancuoc}
                onChangeText={setCancuoc}
                style={styles.input}
            />
            <TextInput
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                value={sodienthoai}
                onChangeText={setSodienthoai}
                style={styles.input}
            />
            
            {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
            {successMessage ? <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text> : null}

            <Button onPress={handleSubmit} style={MyStyles.margin} mode="contained">ĐĂNG KÍ</Button>

        </View>
    )
};
export default TheXeNguoiThan

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});