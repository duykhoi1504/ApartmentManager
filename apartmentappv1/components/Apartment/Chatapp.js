import { View,Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

const ChatApp = () =>{
    return (
        <View>
          <Text>CHAT</Text>
          {/* <Text>{user.username}</Text> */}
    
          <TextInput type="text" value={null} onChange={()=>{}} />
          {/* <Button onPress={  addUserToFirestore(user)}>Send</Button> */}
          </View>
      );
}
export default ChatApp