import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageComponent from "../component/MessageComponent";
import { styles } from "../utils/styles";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
export default function MessageScreen({ route, navigation }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  /*const users = useSelector((state) => state.users.value);
  let messages = <Text>No messages</Text>;
  if(messages.length > O)
  {
    messages = users.map((data, i) => {
      return <Pressable key={i} {...data} handleNewMessage />;
    });
  }*/
  const { id, nom } = route.params;

  //👇🏻 This function gets the username saved on AsyncStorage
  const getNom = async () => {
    try {
      const value = await AsyncStorage.getItem("nom");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error("erreur pendant chargement du nom!");
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({ id, nom });
    getNom();
    //👇🏻 Sends the id to the server to fetch all its messages
    socket.emit("findRoom", id);
  }, []);

  socket.on("findRoom", (id) => {
    //👇🏻 Filters the array by the ID
    let result = chatRooms.filter((room) => room.id == id);
    //👇🏻 Sends the messages to the app
    socket.emit("foundRoom", result[0].messages);
  });

  useLayoutEffect(() => {
    navigation.setOptions({ id, nom });
    socket.emit("findRoom", id);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, []);

  //👇🏻 This runs when the messages are updated.
  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  /*👇🏻 
    This function gets the time the user sends a message, then 
    logs the username, message, and the timestamp to the console.
 */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;
    setChatMessages([
      ...chatMessages,
      {
        id: "1",
        text: message,
        time: `${hour}:${mins}`,
        user: "Tomer",
      },
    ]);
    console.log({
      message,
      room_id: id,
      user,
      timestamp: { hour, mins },
    });
    socket.emit("newMessage", {
      message: nom.message,
      room_id: id,
      user,
      timestamp: { hour, mins },
    });
  };

  socket.on("newMessage", (data) => {
    //👇🏻 Destructures the property from the object
    const { room_id, message, user, timestamp } = data;

    //👇🏻 Finds the room where the message was sent
    let result = chatRooms.filter((room) => room.id == room_id);

    //👇🏻 Create the data structure for the message
    const newMessage = {
      id: generateID(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    //👇🏻 Updates the chatroom messages
    socket.to(result[0].nom).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    //👇🏻 Trigger the events to reflect the new changes
    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
