import { useContext } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
import MyStyles from "../../styles/MyStyles";

const Profile = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
   
    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text style={MyStyles.subject}>CHÀO {user.username}</Text>

            <Image style={MyStyles.avatar} source={{ uri: `https://res.cloudinary.com/dawe6629q/${user.avatar}` }} />
            <Text style={MyStyles.subject}>{user.email}!</Text>
            <Button icon="logout" onPress={() => dispatch({"type": "logout"})}>Đăng xuất</Button>
        </View>
    );
}

export default Profile;