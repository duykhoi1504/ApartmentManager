
import MyStyles from "../../styles/MyStyles";

import React, { useState } from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { View,Text,ActivityIndicator,Image, ScrollView, RefreshControl,TouchableOpacity, StyleSheet } from "react-native";
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
     
        <View style={ [MyStyles.container,{backgroundColor: '#F5EFE6',}]}>
            <Button style={MyStyles.button} icon="plus" mode="contained" onPress={() => {nav.navigate('Themphananh')}}>Thêm phản ánh</Button>
            <ScrollView onScroll={loadMore} >
            <RefreshControl onRefresh={ () => loahPhananhs()}/>
            {loading && <ActivityIndicator />}
            {phananhs.map(c => <Card key={c.id} style={[MyStyles.margin,styles.item]} >
                <Card.Title  
                    titleStyle={styles.title} 
                    title={c.name} 
                    subtitle={
                        <Text style={styles.subtitle}>
                        Người viết: <Text style={styles.title}>{c.user.username}</Text>
                      </Text>
                    }
                    left={(props) => <Avatar.Image {...props} 
                    source={{ uri: c.user.avatar}} />}/>
                
                <Card.Content>
                    <RenderHTML source={{html: c.noiDung}}/>
                </Card.Content>

                <Card.Cover source={{ uri: c.image }} />         
                <Text style={styles.dateText}>{moment(c.created_date).calendar()}</Text>
                        {/* <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Detail</Button>
                        </Card.Actions> */}
                </Card>
                )}
            {loading && page >1 && <ActivityIndicator />}
            
            </ScrollView>
        </View>
    )
}
export default Phananh

const styles = StyleSheet.create({
    cardContent: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18   ,
        fontWeight: 'bold',
        color: '#1A4D2E',
    }, subtitle: {
        color: 'gray', // hoặc màu sắc bạn muốn cho phần còn lại của subtitle
      },
    dateText: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
        textAlign: 'right',
    }, item: {
        marginBottom: 20,
        backgroundColor: '#E8DFCA',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
});