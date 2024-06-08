
import MyStyles from "../../styles/MyStyles";

import React, { useState } from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { View,Text,ActivityIndicator,Image, ScrollView, RefreshControl,TouchableOpacity } from "react-native";
import moment from "moment";
import { isCloseToBottom } from "../../Utils/Utils";
import RenderHTML from "react-native-render-html";
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";

const Phananh = () => {
    const[phananhs,setPhananhs]=React.useState([]);
    const[loading,setLoading]=React.useState(false);
    const[page,setPage]=React.useState(1);
    // const LeftContent = props => <Avatar.Icon {...props} icon="account-alert" />
    const nav= useNavigation();


    const loahPhananhs= async () => {
        if(page > 0){
            let url=`${['phananhs']}?page=${page}`;
        try{
            setLoading(true)
            let res=await APIs.get(url) 
             //co result vi co phan trang
            if(page===1)
                setPhananhs(res.data.results);
            else if(page > 1)
                setPhananhs(current => {
                    return [...current, ...res.data.results]
                });
            if(res.data.next===null)
                setPage(0);
        }catch(ex){
            console.error(ex);
        }finally{
            setLoading(false);
        }
    }
}

    React.useEffect(() => {
        loahPhananhs();
    },[page]);


    const loadMore = ({ nativeEvent }) => {
        if (loading === false && isCloseToBottom(nativeEvent)) {
            setPage(page + 1);
        }
    }

    return(
     
        <View style={ MyStyles.container}>
            <Button icon="plus" mode="contained" onPress={() => {nav.navigate('Themphananh')}}>Thêm phản ánh</Button>
            <ScrollView onScroll={loadMore} >
            <RefreshControl onRefresh={ () => loahPhananhs()}/>
            {loading && <ActivityIndicator />}
            {phananhs.map(c => <Card key={c.id} style={MyStyles.margin} >
                <Card.Title title={c.name} subtitle={c.user.username} left={(props) => <Avatar.Image {...props} source={{ uri: c.user.avatar}} />}/>
                
                <Card.Content>
                    <RenderHTML source={{html: c.noiDung}}/>
                </Card.Content>

                <Card.Cover source={{ uri: c.image }} />         
                        <Text>{moment(c.created_date).calendar()}</Text>
                        <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Detail</Button>
                        </Card.Actions>
                </Card>
                )}
            {loading && page >1 && <ActivityIndicator />}
            
            </ScrollView>
        </View>
    )
}
export default Phananh