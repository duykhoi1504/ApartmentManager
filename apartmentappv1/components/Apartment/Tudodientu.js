
import MyStyles from "../../styles/MyStyles";
import APIs, { endpoints } from "../../configs/API";
import React from "react";
import { Chip, List,Searchbar } from "react-native-paper";
import { View,Text,ActivityIndicator,Image, ScrollView, RefreshControl,TouchableOpacity } from "react-native";
import moment from "moment";
import { isCloseToBottom } from "../../Utils/Utils";
const Tudodientu = ({navigation}) => {

    const[tudodientus,setTudodientus]=React.useState(null);
    const[hanghoas,setHanghoas]=React.useState([]);
    const[loading,setLoading]=React.useState(false);
    const[q, setQ]=React.useState("");
    const[tudoId,setTudoId]=React.useState("");
    const[page,setPage]=React.useState(1);

    const loadTudo= async () => {
        try{
            let res=await APIs.get(endpoints['tudodientus']) 
            setTudodientus(res.data);
        }catch(ex){
            console.error(ex);
        }
    }
    const loadHanghoas = async () => {
        if(page > 0){
        let url=`${
            ['hanghoas']}?q=${q}&tuDo=${tudoId}&page=${page}`;
        try{
            setLoading(true);
            let res=await APIs.get(url) 
            //co result vi co phan trang
            if(page===1)
                setHanghoas(res.data.results);
            else if(page > 1)
                setHanghoas(current => {
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
        loadTudo();
    },[]);

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
    <View style={MyStyles.container}>
        <Text style={MyStyles.subject}>Danh Muc Tu Do</Text>
        <View style={ MyStyles.row}>
            <Chip mode={!tudoId?"outlined":"flat"} style={MyStyles.margin} onPress={() => search("",setTudoId)} icon="shape-outline">ALL</Chip>
            {tudodientus === null?<ActivityIndicator />:<>
                {tudodientus.map(c => <Chip mode={tudoId===c.id?"outlined":"flat"} onPress={() => search(c.id,setTudoId)} style={MyStyles.margin} key={c.id} icon="text-long">{c.name}</Chip>)}</>}
        </View>

        <View>
        {/* <FlatList data={hanghoas} renderItem={(c) => <Text key={c.item.id}>san phan:{c.item.name}</Text>} /> */}
        <Searchbar placeholder="tìm khóa học..." value={q} onChangeText={t => search(t,setQ)}/>
        </View>

        <ScrollView onScroll={loadMore}>
            <RefreshControl onRefresh={ () => loadHanghoas()}/>
            
            {/* {hanghoas.map(c => <List.Item style={MyStyles.margin} key={c.id} title={c.name} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} />} />)} */}
            {loading && <ActivityIndicator />}
            {hanghoas.map(c => <TouchableOpacity key={c.id} onPress={() => navigation.navigate("HanghoaDetails",{hanghoaId: c.id})}>
                <List.Item style={MyStyles.margin} key={c.id} title={c.name} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} />} />
                </TouchableOpacity>
                )}
            {/* {hanghoas && hanghoas.length > 0 ? (
                hanghoas.map(c => 
                <List.Item style={MyStyles.margin} key={c.id} title={c.name} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} />} />)   
                    ) : (<Text>Loading or no data available.</Text>)}
             */}
            {loading && page >1 && <ActivityIndicator />}
        </ScrollView>
                
    </View>
    )
}
export default Tudodientu    