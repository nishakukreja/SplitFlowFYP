import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList,TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { StatusBar } from 'react-native';
import UserCircleAvatar from "../components/UserCircleAvatar";
import ConversationCard from "../components/ConversationCard";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


const headerColor = "#6146C6";

const users = [
  {
    id: 1,
    name: 'John Doe',
    imageUri: "https://randomuser.me/api/portraits/men/1.jpg",
    messages: [
      { id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],

  },
  {
    name: "Jane Doe",
    imageUri: "https://randomuser.me/api/portraits/women/2.jpg",
    isOnline: false,
    messages: [
      {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
  {
    name: "Alice Smith",
    imageUri: "https://randomuser.me/api/portraits/women/3.jpg",
    isOnline: true,
    messages: [
        {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
  {
    name: "Bob Johnson",
    imageUri: "https://randomuser.me/api/portraits/men/4.jpg",
    isOnline: true,
    messages: [
      { text: "Hello!", time: "10:00 AM" },
      { text: "How are you?", time: "10:05 AM" },
    ],
  },
  {
    name: "Eva Davis",
    imageUri: "https://randomuser.me/api/portraits/women/5.jpg",
    isOnline: false,
    messages: [
      {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
  {
    name: "David Wilson",
    imageUri: "https://randomuser.me/api/portraits/men/6.jpg",
    isOnline: true,
    messages: [
      {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
  {
    name: "Sophia White",
    imageUri: "https://randomuser.me/api/portraits/women/7.jpg",
    isOnline: false,
    messages: [
      {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
  {
    name: "Michael Brown",
    imageUri: "https://randomuser.me/api/portraits/men/8.jpg",
    isOnline: true,
    messages: [
      {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
  {
    name: "Olivia Miller",
    imageUri: "https://randomuser.me/api/portraits/women/9.jpg",
    isOnline: true,
    messages: [
      {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
  {
    name: "William Taylor",
    imageUri: "https://randomuser.me/api/portraits/men/10.jpg",
    isOnline: false,
    messages: [
      {id: '1', text: 'Hello!', time: '10:00 AM', isSentByUser: false },
      { id: '2', text: 'Hi there!', time: '10:02 AM', isSentByUser: true },
      { id: '3', text: 'How are you?', time: '10:03 AM', isSentByUser: false },
      { id: '4', text: 'I am good, thanks!', time: '10:04 AM', isSentByUser: true },
    ],
  },
];

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');

  
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={headerColor} />
      <View style={styles.onlineUsersHeader}>
        <View style={styles.screenHeader}>
          <View style={styles.backButton}>
            <AntDesign name="arrowleft" size={26} />
          </View>
          <View style={styles.screenHeaderTextBox}>
            <Text style={styles.screenHeaderText}>Chat</Text>
          </View>
          <View style={styles.searchButton}>
            <Ionicons name="search-outline" size={26} />
          </View>
        </View>
        <FlatList
          style={styles.userList}
          data={users}
          renderItem={({ item }) => <UserCircleAvatar user={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.conversationsListContainer}>
        <FlatList
          style={styles.userList}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ConversationScreen', { user: item })}>
              <ConversationCard item={item} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  onlineUsersHeader: {
    backgroundColor: headerColor,
    paddingVertical: 7,
  },
  screenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  screenHeaderText: {
    color: "white",
    fontSize: 17,
  },
  conversationsListContainer: {
    flex: 1,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: "#fff",
    padding: 22,
  },
  userList: {
    marginTop: "2%",
    marginBottom: "5%",
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: headerColor,
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});