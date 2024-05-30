import React, { useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, RefreshControl } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { Checkbox, List, Searchbar, Button } from "react-native-paper";
import { isCloseToBottom } from "../../Utils/Utils";
import APIs, { endpoints } from '../../configs/APIs';
import { useNavigation } from "@react-navigation/native";

const DichVu = () => {
    const [dichvus, setDichvus] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ] = React.useState("");
    const [page, setPage] = React.useState(1);

    const loadDichVus = async () => {
        if (page > 0) {
            let url = `${endpoints['dichvus']}?q=${q}&page=${page}`;
            try {
                setLoading(true);
                let res = await APIs.get(url);
                let filteredResults = res.data.results.filter(item => item.name.toLowerCase().includes(q.toLowerCase()));
                if (page === 1)
                    setDichvus(filteredResults.map(item => ({ ...item, checked: false })));
                else if (page > 1)
                    setDichvus(current => {
                        return [...current, ...filteredResults.map(item => ({ ...item, checked: false }))];
                    });
                if (res.data.next) {
                    setPage((prevPage) => prevPage + 1);
                } else {
                    setPage(0);
                }
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false)
            }
        }
    }

    React.useEffect(() => {
        loadDichVus()
    }, [q, page])

    const loadMore = ({ nativeEvent }) => {
        if (loading === false && isCloseToBottom(nativeEvent) && page > 0) {
            setPage(page + 1);
        }
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value);
        loadDichVus();
    }

    const checked = (index) => {
        setDichvus(current => current.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item)));
    };

    const nav = useNavigation();

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>DANH SÁCH DỊCH VỤ TRONG CHUNG CƯ</Text>
            <View>
                <Searchbar placeholder="Tìm dịch vụ..." value={q} onChangeText={t => search(t, setQ)} />
            </View>
            <ScrollView onScroll={loadMore}>
                <RefreshControl onRefresh={() => loadDichVus()} />
                {loading && <ActivityIndicator />}
                {dichvus.map((c, index) => <List.Item style={MyStyles.margin} key={c.id} title={
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={c.checked ? 'checked' : 'unchecked'}
                            onPress={() => checked(index)}
                        />
                        <Text>{c.name}</Text>
                    </View>
                } description={`Mô tả: ${c.thongTinDV.replace(/<\/?p>/g, '')}\nGiá dịch vụ: ${c.giaDV} VND`}
                />)}
                {loading && page > 1 && <ActivityIndicator />}
            </ScrollView>
            <Button mode="contained" onPress={() => nav.navigate('HoaDon')}>Xác nhận</Button>
        </View>
    )
};
export default DichVu