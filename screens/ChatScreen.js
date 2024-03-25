// import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
// import React from "react";
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import { StatusBar } from 'react-native';
// import UserCircleAvatar from "../components/UserCircleAvatar";
// import ConversationCard from "../components/ConversationCard";
// import { Header } from "react-native-elements";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import AntDesign from "react-native-vector-icons/AntDesign";

// // const headerColor = "#F9622E";
// const headerColor = "#6146C6";

// const users = [
//   {
//     name: "John Doe",
//     imageUri: "https://randomuser.me/api/portraits/men/1.jpg",
//     isOnline: true,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "Jane Doe",
//     imageUri: "https://randomuser.me/api/portraits/women/2.jpg",
//     isOnline: false,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "Alice Smith",
//     imageUri: "https://randomuser.me/api/portraits/women/3.jpg",
//     isOnline: true,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "Bob Johnson",
//     imageUri: "https://randomuser.me/api/portraits/men/4.jpg",
//     isOnline: true,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "Eva Davis",
//     imageUri: "https://randomuser.me/api/portraits/women/5.jpg",
//     isOnline: false,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "David Wilson",
//     imageUri: "https://randomuser.me/api/portraits/men/6.jpg",
//     isOnline: true,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "Sophia White",
//     imageUri: "https://randomuser.me/api/portraits/women/7.jpg",
//     isOnline: false,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "Michael Brown",
//     imageUri: "https://randomuser.me/api/portraits/men/8.jpg",
//     isOnline: true,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "Olivia Miller",
//     imageUri: "https://randomuser.me/api/portraits/women/9.jpg",
//     isOnline: true,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
//   {
//     name: "William Taylor",
//     imageUri: "https://randomuser.me/api/portraits/men/10.jpg",
//     isOnline: false,
//     messages: [
//       { text: "Hello!", time: "10:00 AM" },
//       { text: "How are you?", time: "10:05 AM" },
//     ],
//   },
// ];

// const ChatScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="light" backgroundColor={headerColor} />

//       <View style={styles.onlineUsersHeader}>
//         <View style={styles.screenHeader}>
//           <View style={styles.backButton}>
//             <AntDesign name="arrowleft" size={26} />
//           </View>
//           <View style={styles.screenHeaderTextBox}>
//             <Text style={styles.screenHeaderText}>Chat</Text>
//           </View>
//           <View style={styles.searchButton}>
//             <Ionicons name="search-outline" size={26} />
//           </View>
//         </View>
//         <FlatList
//           style={styles.userList}
//           data={users}
//           renderItem={UserCircleAvatar}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       <View style={styles.conversationsListContainer}>
//         <FlatList
//           style={styles.userList}
//           data={users}
//           renderItem={ConversationCard}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   onlineUsersHeader: {
//     width: responsiveWidth(100),
//     height: responsiveHeight(30),
//     backgroundColor: headerColor,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 5,
//     marginBottom: "4%",
//   },
//   conversationsListContainer: {
//     width: responsiveWidth(100),
//     flex: 1,
//     backgroundColor: "#fff",
//     alignSelf: "center",
//     top: "-5%",
//     borderTopLeftRadius: 26,
//     borderTopRightRadius: 26,
//     padding: 22,
//   },
//   userList: {
//     // marginTop: "2%",
//     marginBottom: "5%",
//   },
//   screenHeader: {
//     width: "100%",
//     height: 70,
//     // backgroundColor: "blue",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     alignItems: "center",
//     padding: "5%",
//   },
//   backButton: {
//     width: 45,
//     height: 45,
//     backgroundColor: "white",
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     top: 6,
//   },
//   searchButton: {
//     width: 45,
//     height: 45,
//     backgroundColor: "white",
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     top: 6,
//   },
//   screenHeaderBox: {
//     backgroundColor: "yellow",
//     justifyContent: "center",
//     alignItems: "center",
//     top: 6,
//   },
//   screenHeaderText: {
//     color: "white",
//     fontSize: 17,
//     top: 6,
//   },
// });
import { View, Text } from 'react-native'
import React from 'react'

const ChatScreen = () => {
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

export default ChatScreen