import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import APIs, { endpoints } from '../../configs/APIs';
import { MyUserContext } from '../../configs/Contexts';
import MyStyles from '../../styles/MyStyles';
import RenderHTML from 'react-native-render-html';


const LamKhaoSat = ({ route }) => {
    const user = useContext(MyUserContext);
    const [cauHois, setCauHois] = useState([]);
    const [dapAns, setDapAns] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const phieukhaosatId = route.params?.phieukhaosatId;


    React.useEffect(() => {
        const fetchCauHois = async () => {
            try {
                console.log(`ID phiếu khảo sát đang thực hiện: ${phieukhaosatId}`);
                let res = await APIs.get(endpoints['cauhoikhaosats'](phieukhaosatId), {
                    headers: {
                        'Authorization': `Bearer ${user.access_token}`,
                    },
                });
                setCauHois(res.data.cau_hoi_khao_sat);
            } catch (ex) {
                console.error('Error fetching questions:', ex.response?.data || ex.message);
                setError('Có lỗi xảy ra khi tải câu hỏi.');
            }
        };


        fetchCauHois();
    }, [phieukhaosatId]);


    const handleInputChange = (cauHoiId, text) => {
        setDapAns({
            ...dapAns,
            [cauHoiId]: text
        });
    };


    const handleSubmit = async () => {
        if (Object.values(dapAns).some(dapAn => !dapAn)) {
            setError('Vui lòng điền đầy đủ đáp án.');
            return;
        }


        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn gửi đáp án?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            const promises = Object.keys(dapAns).map((cauHoiId) => {
                                const formData = new FormData();
                                formData.append('dapAn', dapAns[cauHoiId]);


                                return APIs.post(endpoints['dapankhaosats'](phieukhaosatId, cauHoiId), formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        'Authorization': `Bearer ${user.access_token}`,
                                    },
                                });
                            });


                            await Promise.all(promises);
                            setSuccessMessage('Đáp án đã được gửi thành công.');
                            setError('');
                        } catch (ex) {
                            console.error('Error posting:', ex.response?.data || ex.message);
                            setError('Có lỗi xảy ra khi gửi đáp án.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };


    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {cauHois.length > 0 ? (
                cauHois.map((q) => (
                    <View key={q.id} style={{ marginBottom: 20 }}>
                        {/* <Text style={styles.question}>{q.cauHoi}</Text> */}
                        <RenderHTML source={{ html:q.cauHoi }} contentWidth={300} />
                        <TextInput
                            placeholder="Câu trả lời"
                            value={dapAns[q.id] || ''}
                            onChangeText={(text) => handleInputChange(q.id, text)}
                            style={styles.input}
                        />
                    </View>
                ))
            ) : (
                <Text>Đang tải câu hỏi...</Text>
            )}
            {error ? <Text style={MyStyles.errorText}>{error}</Text> : null}
            {successMessage ? <Text style={MyStyles.successText}>{successMessage}</Text> : null}
            <Button style={MyStyles.button} mode="contained" onPress={handleSubmit}>SUBMIT</Button>
        </ScrollView>
    );
};


export default LamKhaoSat;


const styles = StyleSheet.create(
    {
        question: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1A4D2E',
            marginBottom: 10,
        },
        input: {
            backgroundColor: '#fff',
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
        },
    }
)