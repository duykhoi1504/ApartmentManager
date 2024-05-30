import MyStyles from "../../styles/MyStyles";
import { View, ActivityIndicator } from "react-native"
import React, { useContext } from 'react';
import { Card, Text } from "react-native-paper"
import APIs, { endpoints } from "../../configs/APIs";
import RenderHTML from "react-native-render-html";
import { MyUserContext } from "../../configs/Contexts";

const HoaDonDetails = ({ route }) => {

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
        <View style={[MyStyles.container, MyStyles.margin]}>
            {hoadon === null ? <ActivityIndicator /> : (
                <Card>
                    <Card.Title title={hoadon.name} subtitle={hoadon.user.username}
                        left={(props) => <Avatar.Image {...props} source={{ uri: `https://res.cloudinary.com/dawe6629q/${hoadon.user.avatar}` }} />}
                    />
                    <Card.Content>
                        <RenderHTML source={{ html: hoadon.thongTinHD }} />
                        <RenderHTML source={{ html: hoadon.dichVu.map(dv => dv.name).join(', ') }} />
                    </Card.Content>
                    <Card.Actions>
                        <Button>Chi tiết hoá đơn</Button>
                    </Card.Actions>
                </Card>
            )}
        </View>

    )
}
export default HoaDonDetails;