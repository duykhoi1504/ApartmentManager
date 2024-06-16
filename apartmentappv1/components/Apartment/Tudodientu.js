
import MyStyles from "../../styles/MyStyles";

import React, { useContext } from "react";
import { Chip, List,Searchbar } from "react-native-paper";
import { View,Text,ActivityIndicator,Image, ScrollView, RefreshControl,TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { isCloseToBottom } from "../../Utils/Utils";
import APIs, { endpoints } from "../../configs/APIs";
import { MyUserContext } from "../../configs/Contexts";

const Tudodientu = ({navigation}) => {

    const[tudodientus,setTudodientus]=React.useState([]);
    const[hanghoas,setHanghoas]=React.useState([]);
    const[loading,setLoading]=React.useState(false);
    const[q, setQ]=React.useState("");
    const[tudoId,setTudoId]=React.useState("");
    const[page,setPage]=React.useState(1);
    const[status,setStatus]=React.useState("waiting");
    const user = useContext(MyUserContext)
    const loadTudo= async () => {
        try{
            let res=await APIs.get(endpoints['tudodientus'],{
                headers: {
                    'Authorization': `Bearer ${user.access_token}`,
                },
                params: {
                    q: q, // Thêm tham số q vào params
                    tuDo: tudoId, // Thêm tham số tuDo vào params
                    page: page // Thêm tham số page vào params
                },
            }) 
            setTudodientus(res.data.filter(tuDo => tuDo.users.some(u => u.id === user.id)));
            // console.log("=====")
            // tudodientus.map(c => console.log(c.name))
           
            // setTimeout(() => {
            //     tudodientus.map(c => setTudoId(c.id))
            //     console.log("test id:", tudoId)    
            // }, 1000);
            
        }catch(ex){
            console.error(ex);
        }
    }
    const loadHanghoas = async () => {
        if(page > 0){

        //dùng cách này thì không cần dùng cách param ở dưới
        let url=`${
            ['hanghoas']}?q=${q}&tuDo=${tudoId}&status=${status}&page=${page}`;
        try{
            setLoading(true);
            let res=await APIs.get(url,{
                headers: {
                    'Authorization': `Bearer ${user.access_token}`,
                },
                
                // params: {
                //     q: q, // Thêm tham số q vào params
                //     tuDo: tudoId, // Thêm tham số tuDo vào params
                //     page: page, // Thêm tham số page vào params
                //     status:status,
                // },
            }) 


            let hanghoadataresults=res.data.results.filter(c =>c.tuDo === tudoId)
            if(page===1){   
                setHanghoas(hanghoadataresults);
            }
            else if(page > 1)
                setHanghoas(current => {
                    return [...current, ...hanghoadataresults]
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
        loadTudo();   
       
    },[]);
    React.useEffect(() => {
        // if (tudodientus.length > 0) {
        //   setTudoId(tudodientus[0].id);
        // }
            tudodientus.map(c=>{
                setTudoId(c.id)
            })
      }, [tudodientus]);
    React.useEffect(() => {
        loadHanghoas();
    },[q,tudoId,page]);
    
    

    // const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    //     const paddingToBottom = 20;
    //     return layoutMeasurement.height + contentOffset.y >=
    //         contentSize.height - paddingToBottom;
    // };
    const loadMore = ({ nativeEvent }) => {
        if (loading === false && isCloseToBottom(nativeEvent)) {
            setPage(page + 1);
        }
    }
    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }
 

    return(
    <View style={styles.container}>
        <Text style={MyStyles.subject}>Danh Muc Tu Do</Text>
        <View style={ MyStyles.row}>
            {/* <Chip mode={!tudoId?"outlined":"flat"} style={MyStyles.margin} onPress={() => search("",setTudoId)} icon="shape-outline">ALL</Chip> */}
            {tudodientus === null?<ActivityIndicator />:<>
                {tudodientus.map(c => <Chip mode={tudoId===c.id?"outlined":"flat"} onPress={() => search(c.id,setTudoId)} style={[MyStyles.margin,{backgroundColor:'#E8DFCA'}]} key={c.id} icon="text-long">tủ đồ của bạn: {c.name}</Chip>)}</>}
        </View>

        <View>
        {/* <FlatList data={hanghoas} renderItem={(c) => <Text key={c.item.id}>san phan:{c.item.name}</Text>} /> */}
        <Searchbar style={{backgroundColor: '#E8DFCA' }}  placeholder="tìm hàng hóa..." value={q} onChangeText={t => search(t,setQ)}/>
        </View>

        <ScrollView onScroll={loadMore}>
            <RefreshControl onRefresh={ () => loadHanghoas()}/>
            
            {/* {hanghoas.map(c => <List.Item style={MyStyles.margin} key={c.id} title={c.name} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} />} />)} */}
            {loading && <ActivityIndicator />}
            {hanghoas.map(c => <TouchableOpacity key={c.id} onPress={() => navigation.navigate("HanghoaDetails",{hanghoaId: c.id})}>
                <List.Item style={MyStyles.margin} key={c.id} title={c.name} description={moment(c.created_date).fromNow()} 
                left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} />}
                right={() => <Text style={[
                    MyStyles.status,
                    c.status === 'waiting' && MyStyles.pending,
                    c.status === 'received' && MyStyles.pass
                ]}>
                    Trạng thái: {c.status}
                </Text>} />
               
                </TouchableOpacity>
                )}
            
            {loading && page >1 && <ActivityIndicator />}
        </ScrollView>
                
    </View>
    )
}
export default Tudodientu    
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5EFE6', // Light background color for the container
      padding: 1,
      flex: 1,
      justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#AFD198',
    },
    buttonText: {
        color: '#1A4D2E',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})