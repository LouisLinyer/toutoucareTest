import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  Button,
} from "react-native";


export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style= {styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to User Profile"
        onPress={() => navigation.navigate("UserProfile")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    margin: 10,
  },
  hyperlinkStyle: {
    color: "blue",
  },
  titleStyle: {
    fontSize: 20,
    margin: 10,
  },
});
