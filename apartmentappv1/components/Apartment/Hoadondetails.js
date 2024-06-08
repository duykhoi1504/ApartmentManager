import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import APIs, { endpoints } from '../../configs/APIs';
import { MyUserContext } from '../../configs/Contexts';

const Hoadondetails = ({ route }) => {


   const [hoadon, setHoadon] = React.useState(null);
   const user = useContext(MyUserContext);


   //kiểm tra xem route.params có phải là null hoặc undefined trước khi cố gắng truy cập thuộc tính hoadonID
   const hoadonId = route.params?.hoadonId;


   const loadHoaDon = async () => {
       try {
           let res = await APIs.get(endpoints['hoadon-details'](hoadonId), {
               headers: {
                   'Authorization': `Bearer ${user.access_token}`,
               },
           });
           setHoadon(res.data);
       } catch (ex) {
           console.error(ex);
       }
   }


   React.useEffect(() => {
       if (hoadonId) loadHoaDon();
   }, [hoadonId]);


   return (
    <View style={styles.container}>
        {hoadon ? (
            <Card>
                <Card.Title
                    title={hoadon.name}
                    subtitle={hoadon.user.username}
                    left={(props) => (
                        <Avatar.Image
                            {...props}
                            source={{ uri: hoadon.user.avatar }}
                        />
                    )}
                />
                <Card.Content>
                    <RenderHTML source={{ html: hoadon.thongTinHD }} />
                    <RenderHTML
                        source={{
                            html: hoadon.dichVu_details.map((dv) => dv.name).join(', '),
                        }}
                    />
                </Card.Content>
                <Card.Actions>
                    <Button>Chi tiết hoá đơn</Button>
                </Card.Actions>
            </Card>
        ) : (
            <ActivityIndicator style={styles.loading} />
        )}
    </View>
);
}
export default Hoadondetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        marginTop: 20,
    },
});