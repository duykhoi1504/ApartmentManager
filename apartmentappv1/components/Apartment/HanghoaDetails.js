import MyStyles from "../../styles/MyStyles";
import { View, ActivityIndicator } from "react-native"
import React from 'react';

import { Card, Text } from "react-native-paper"
import APIs, { endpoints } from "../../configs/APIs";
const HanghoaDetails = ({route}) => {
    
    const [hanghoa, setHanghoa] = React.useState(null);

    //kiểm tra xem route.params có phải là null hoặc undefined trước khi cố gắng truy cập thuộc tính hanghoaId
    const hanghoaId = route.params?.hanghoaId;
 
 
    const loadHanghoa = async () => {
        try {
            let res = await APIs.get(endpoints['hanghoa-details'](hanghoaId));
            setHanghoa(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }
 
    React.useEffect(() => {
        loadHanghoa();
    }, [hanghoaId]);




    return(
        <View style={[MyStyles.container, MyStyles.margin]}>
           {hanghoa===null?<ActivityIndicator/>:<>
               <Card>
                   <Card.Title title="Tủ đồ" subtitle={hanghoa.tuDo} />
                   <Card.Content>
                
                       <Text variant="titleLarge">{hanghoa.name}</Text>
                       <Text variant="bodyMedium">{hanghoa.status}</Text>
                       
                   </Card.Content>
                   <Card.Cover source={{ uri: hanghoa.image }} />
               </Card>
           </>}
       </View>

    )
}
export default HanghoaDetails;