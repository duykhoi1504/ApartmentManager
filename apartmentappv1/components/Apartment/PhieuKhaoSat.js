import MyStyles from "../../styles/MyStyles";
import React, { useContext, useState } from "react";
import { Button, Card } from "react-native-paper";
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, StyleSheet } from "react-native";
import moment from "moment";
import RenderHTML from "react-native-render-html";
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";
import { MyUserContext } from "../../configs/Contexts";

const PhieuKhaoSat = () => {
    const [khaosats, setKhaosats] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const user = useContext(MyUserContext);
    const nav = useNavigation();

    const loadKhaosats = async () => {
        setLoading(true);
        try {
            let res = await APIs.get(endpoints['phieukhaosats'], {
                headers: {
                    'Authorization': `Bearer ${user.access_token}`,
                },
            });
            setKhaosats(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadKhaosats();
    }, []);

    return (

        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH SÁCH PHIẾU KHẢO SÁT</Text>

            <ScrollView>
                <RefreshControl onRefresh={() => loadKhaosats()} />
                {loading && <ActivityIndicator />}
                {khaosats.map(c => <Card key={c.id} style={MyStyles.margin} >
                    <Card.Content style={styles.cardContent}>
                        <RenderHTML source={{ html: c.tieuDe }} contentWidth={300} baseStyle={styles.title} />
                    </Card.Content>
                    <Button mode="contained" onPress={() => { nav.navigate('LamKhaoSat', { phieukhaosatId: c.id }) }}>Trả lời</Button>
                    <Text style={styles.dateText}>{moment(c.created_date).calendar()}</Text>
                </Card>
                )}
            </ScrollView>
        </View>
    )
}
export default PhieuKhaoSat;

const styles = StyleSheet.create({
    cardContent: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    dateText: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
        textAlign: 'right',
    },
});