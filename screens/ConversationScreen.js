import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';

const ConversationScreen = ({ route }) => {
  const { user } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(user.messages);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const newMessage = {
      id: (messages.length + 1).toString(), // Generate a unique ID for the new message
      text: message,
      time: getCurrentTime(), // You can define this function to get the current time
      isSentByUser: true, // Assuming the user sends the message
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={[
              styles.messageContainer,
              item.isSentByUser ? styles.sentMessageContainer : styles.receivedMessageContainer,
            ]}
          >
            {!item.isSentByUser && (
              <Image source={{ uri: user.imageUri }} style={styles.profileImage} />
            )}
            <View style={styles.messageContent}>
              <Text
                style={[
                  styles.message,
                  item.isSentByUser ? styles.sentMessage : styles.receivedMessage,
                ]}
              >
                {item.text}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            {item.isSentByUser && (
              <Image source={{ uri: user.imageUri }} style={styles.profileImage} />
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: 'white', fontSize: 18 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  sentMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#6146C6',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    flexDirection: 'row-reverse',
  },
  receivedMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    flexDirection: 'row',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageContent: {
    flex: 1,
  },
  message: {
    fontSize: 19,
  },
  sentMessage: {
    color: 'white', // Sent message text color
  },
  receivedMessage: {
    color: 'black', // Received message text color
  },
  time: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },
});


export default ConversationScreen;
