import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

const UserCircleAvatar = ({ user }) => {
  return (
    <View style={styles.container}>
      <Avatar
        size={"medium"}
        rounded
        source={{
          uri: user.imageUri,
        }}
      />
      <Text style={styles.userName}>{user.name}</Text>
    </View>
  );
};

export default UserCircleAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  userName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});
