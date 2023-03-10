import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from 'react-native-vector-icons/Feather';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFolder, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import InvoicesScreen from "./screens/InvoicesScreen";
import MessageScreen from "./screens/MessageScreen";
import BookingScreen from "./screens/BookingScreen";
import UserProfile from "./screens/UserProfile";
import ChatScreen from "./screens/ChatScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {

          if (route.name === "Accueil") {
            return <Feather name = 'home' size ={size} color={color} />;
          } 
          else if (route.name === "Calendrier") {
            return <Feather name ='calendar' size={size} color={color} />;
          } 
          else if (route.name === "Messages") {
           return <FontAwesomeIcon icon={faCommentDots} size={size} color={color} />;
          }
          else if (route.name === "Factures") {
            return <FontAwesomeIcon icon={faFolder} size={size} color={color} />;
          } 
        },
        tabBarActiveTintColor: "#FFC547",
        tabBarInactiveTintColor: "#008486",
        tabBarShowLabel : false,
        
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Calendrier" component={BookingScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Factures" component={InvoicesScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
