
import React, { useContext, useEffect, useReducer } from 'react';
import Tudodientu from './components/Apartment/Tudodientu/';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HanghoaDetails from './components/Apartment/HanghoaDetails';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import Home from './components/Apartment/Home';
import Phananh from './components/Apartment/Phananh';
import { MyDispatchContext, MyUserContext } from './configs/Contexts';
import MyUserReducer from './configs/Reducers';
import Profile from './components/User/Profile';
import FABGroupSceen from './components/Apartment/FABGroupSceen';
import ThemPhanAnh from './components/Apartment/Themphananh';

import app from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import Users from './components/Apartment/Users';
import ChatApp from './components/Apartment/Chatapp';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';
import TheXeNguoiThan from './components/Apartment/TheXeNguoiThan';
import Dichvu from './components/Apartment/Dichvu';
import Hoadon from './components/Apartment/Hoadon';
import Hoadondetails from './components/Apartment/Hoadondetails';
import PhieuKhaoSat from './components/Apartment/PhieuKhaoSat';
import LamKhaoSat from './components/Apartment/LamKhaoSat';
import PaymentScreen from './components/Apartment/PaymentScreen';





const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{ title: "Trang chủ" }} />
      <Stack.Screen name="Tudodientu" component={Tudodientu} options={{ title: "Tủ đồ điện tử" }} />
      <Stack.Screen name="HanghoaDetails" component={HanghoaDetails} options={{ title: "Chi tiết hóa đơn" }} />
      <Stack.Screen name="Phananh" component={Phananh} options={{ title: "Phan anh" }} />
      <Stack.Screen name="Themphananh" component={ThemPhanAnh} options={{ title: "Them Phan anh" }} />
      <Stack.Screen name="ChatApp" component={ChatApp} options={{ title: "chat" }} />
      <Stack.Screen name="Users" component={Users} options={{ title: "users" }} />
      <Stack.Screen name="Dichvu" component={Dichvu} options={{ title: "Dịch vụ" }} />
      <Stack.Screen name="Hoadon" component={Hoadon} options={{ title: "Hóa đơn dịch vụ" }} />
      <Stack.Screen name="Hoadondetails" component={Hoadondetails} options={{ title: "Hóa đơn chi tiết" }} />
      <Stack.Screen name="TheXeNguoiThan" component={TheXeNguoiThan} options={{ title: "Đăng kí thông tin người thân" }} />
      <Stack.Screen name="PhieuKhaoSat" component={PhieuKhaoSat} options={{ title: "Làm khảo sát" }} />
      <Stack.Screen name="LamKhaoSat" component={LamKhaoSat} options={{ title: "Làm chi tiết khảo sát" }} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{title:"thanh toan hoa dơn trực tuyến"}}/>
    </Stack.Navigator>

  )
}

const Tab = createBottomTabNavigator();
const MyTab = () => {
  const user = useContext(MyUserContext)
  return (
    <React.Fragment>
      <Tab.Navigator>
        {user === null ? <>
          <Tab.Screen name="Login" component={Login} options={{ tabBarIcon: () => <Icon size={40} color="#1A4D2E" source="login" /> }} />
          <Tab.Screen name="Register" component={Register} options={{ tabBarIcon: () => <Icon size={40} color="#1A4D2E" source="account" /> }} />
        </> : <>
          <Tab.Screen name="Home" component={MyStack} options={{ tabBarIcon: () => <Icon size={40} color="#1A4D2E" source="home" /> }} />
          {/* <Tab.Screen name="FUNC" component={MyStack} options={{tabBarIcon: () => <Icon size={30} color="blue" source="function" />}} /> */}
          <Tab.Screen name="Users" component={Users} options={{ title: "chat", tabBarIcon: () => <Icon size={40} color="#1A4D2E" source="chat" /> }} />
          <Tab.Screen name="Profile" component={Profile} options={{ title: user.username, tabBarIcon: () => <Icon size={40} color="#1A4D2E" source="account" /> }} />
        </>}

      </Tab.Navigator>

    </React.Fragment>
  );
}

export default function App() {




  useEffect(() => {

  }, []);

  // khởi tạo reducer với MyUserReducer và thiết lập trạng thái ban đầu là null.
  //Component MyUserContext.Provider làm cho trạng thái user khả dụng với bất kỳ component lồng nào gọi useContext(MyUserContext).
  //Component MyDispatchContext.Provider làm cho hàm dispatch khả dụng với bất kỳ component lồng nào gọi useContext(MyDispatchContext).
  const [user, dispatch] = useReducer(MyUserReducer, null)
  return (
    <NavigationContainer>

      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>

          <MyTab />


        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
    </NavigationContainer>

  );
}