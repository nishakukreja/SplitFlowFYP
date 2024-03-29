import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";

const ConversationCard = ({ item }) => {
  return (
    <View
      style={{
        // backgroundColor: "red",

        borderWidth: 1,
        borderColor: "lightgray",
        marginBottom: "4%",
        borderRadius: 7,
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: item.imageUri }} style={styles.profileImage} />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.username}>{item.name}</Text>
            <Text style={styles.lastMessageTime}>{item.messages[0].time}</Text>
          </View>
          <Text style={styles.lastMessage}>{item.messages[0].text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 7,
    // borderWidth: 1,
    // borderColor: "lightgray",
    // marginBottom: "4%",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessageTime: {
    color: "#555",
  },
  lastMessage: {
    color: "#888",
  },
});

export default ConversationCard;
