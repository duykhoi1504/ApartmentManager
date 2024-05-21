
import React from 'react';
import Tudodientu from './components/Apartment/Tudodientu/';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HanghoaDetails from './components/Apartment/HanghoaDetails';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Tudodientu" component={Tudodientu} options={{title:"Tủ đồ điện tử"}}/>
      <Stack.Screen name="HanghoaDetails" component={HanghoaDetails} options={{title:"Chi tiết hóa đơn"}}/>
    </Stack.Navigator>
  )
}

const Tab =createBottomTabNavigator();
const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MyStack} options={{tabBarIcon: () => <Icon size={30} color="blue" source="home" />}} />
      <Tab.Screen name="Register" component={Register} options={{tabBarIcon: () => <Icon size={30} color="blue" source="account" />}} />
      <Tab.Screen name="Login" component={Login} options={{tabBarIcon: () => <Icon size={30} color="blue" source="login" />}} />
    </Tab.Navigator>
  );
}
export default function App(){
  return (
    <NavigationContainer>
    <MyTab />
   </NavigationContainer>

  );
}