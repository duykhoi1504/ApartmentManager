
import { useContext } from "react";
import { View, Text, Image, StyleSheet,ScrollView} from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
import MyStyles from "../../styles/MyStyles";

const Profile = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);

  return (
    <View style={styles.container}>
         <ScrollView>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>

        <Text style={styles.label}>Username:</Text>
        <Text style={styles.info}>{user.username}</Text>

        <Text style={styles.label}>Date Joined:</Text>
        <Text style={styles.info}>{new Date(user.date_joined).toLocaleDateString()}</Text>

        <Text style={styles.label}>Last Login:</Text>
        <Text style={styles.info}>{new Date(user.last_login).toLocaleString()}</Text>

        <Text style={styles.label}>Role:</Text>
        <Text style={styles.info}>{user.role}</Text>

        <Text style={[styles.status, user.is_active ? styles.active : styles.inactive]}>
          Status: {user.is_active ? "Active" : "Inactive"}
        </Text>
      </View>

      <Button 
        icon="logout" 
        mode="contained" 
        onPress={() => dispatch({ type: "logout" })}
        style={styles.logoutButton}
      >
        <Text>Đăng xuất</Text>
      </Button>
     </ScrollView>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#ff7043",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  infoContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 24,
  },
  active: {
    color: "green",
  },
  inactive: {
    color: "red",
  },
  logoutButton: {
    marginHorizontal: 24,
    marginVertical: 12,
  },
});
//   import { useContext } from "react";
// import { View, Text, Image } from "react-native";
// import { Button } from "react-native-paper";
// import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
// import MyStyles from "../../styles/MyStyles";

// const Profile = () => {
//     const user = useContext(MyUserContext);
//     const dispatch = useContext(MyDispatchContext);
   
//     return (
//         <View style={[MyStyles.container, MyStyles.margin]}>
//             <Text style={MyStyles.subject}>CHÀO {user.username}</Text>
   

//             <Image style={MyStyles.avatar} source={{ uri: user.avatar }} />
//             <Text style={MyStyles.subject}>{user.email}!</Text>
//             <Button icon="logout" onPress={() => dispatch({"type": "logout"})}>Đăng xuất</Button>
//         </View>
//     );
// }

// export default Profile;