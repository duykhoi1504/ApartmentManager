import MyStyles from "../../styles/MyStyles";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { MyUserContext } from "../../configs/Contexts";


const Home = ({ navigation }) => {
  const user = useContext(MyUserContext);
  const items = [
    { title: "Thông tin cá nhân", icon: require("../../assets/profile.png"), navigateTo: "Profile" },
    { title: "Danh sách tủ đồ", icon: require("../../assets/boxes.png"), navigateTo: "Tudodientu" },
    { title: "Đăng kí dịch vụ", icon: require("../../assets/checklist.png"), navigateTo: "Dichvu" },
    { title: "Hóa đơn", icon: require("../../assets/bill.png"), navigateTo: "Hoadon" },
    { title: "Phản ánh", icon: require("../../assets/feedback.png"), navigateTo: "Phananh" },
    { title: "Làm khảo sát", icon: require("../../assets/satisfaction.png"), navigateTo: "PhieuKhaoSat" },
    { title: "Đăng kí thẻ xe cho người thân", icon: require("../../assets/parking.png"), navigateTo: "TheXeNguoiThan" },
    { title: "Thông báo", icon: require("../../assets/bell.png"), navigateTo: "Home" }

  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
      </View>
      <ScrollView style={styles.contentList}>
        {items.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(item.navigateTo)}>
            <Image source={item.icon} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
};
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DFCA',
  },
  contentList: {
    flex: 1,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  title: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#1A4D2E',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: "#1A4D2E",
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -35,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  name: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5EFE6",
  },
});