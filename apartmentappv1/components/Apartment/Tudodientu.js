
import MyStyles from "../../styles/MyStyles";
import APIs, { endpoint } from "../../configs/API";
import React from "react";
import { Chip, List } from "react-native-paper";
import { View,Text,ActivityIndicator,Image, ScrollView } from "react-native";
const Tudodientu = () => {

    const[tudodientus,setTudodientus]=React.useState(null);
    const[hanghoas,setHanghoas]=React.useState(null);
    const [loading,setLoading]=React.useState(false);
    const loadTudo= async () => {
        try{
            let res=await APIs.get(endpoint['tudodientus']) 
            setTudodientus(res.data);
        }catch(ex){
            console.error(ex);
        }
    }
    const loadHanghoas = async () => {
        try{
            setLoading(true);
            let res=await APIs.get(endpoint['hanghoas']) 
            setHanghoas(res.data.results);
        }catch(ex){
            console.error(ex);
        }finally{
            setLoading(false);
        }
    }
    React.useEffect(() => {
        loadTudo();
    },[]);

    React.useEffect(() => {
        loadHanghoas();
    },[]);
    return(
    <View style={MyStyles.container}>
        <Text style={MyStyles.subject}>Danh Muc Tu Do</Text>
        <View style={ MyStyles.row}>
        {tudodientus === null?<ActivityIndicator />:<>
            {tudodientus.map(c => <Chip key={c.id} icon="text-long">{c.name}</Chip>)}
            </>}
        </View>
        <ScrollView>
            

{hanghoas && hanghoas.length > 0 ? (
     hanghoas.map(c => <List.Item style={MyStyles.margin} key={c.id} title={c.name} description={c.created_date} left={() => <Image style={MyStyles.avatar} source={{ uri: c.image }} />} />)   
  ) : (
    <Text>Loading or no data available.</Text>
  )}
  {loading && <ActivityIndicator />}
        </ScrollView>
                
    </View>
    )
}
export default Tudodientu    