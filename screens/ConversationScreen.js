import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {fetchChatHistory, sendMessage} from '../services/api';
import {
  initializeSocket,
  sendMessageSocket,
  disconnectSocket,
} from '../services/api'; // Import the socket functions
import {useSelector} from 'react-redux';
import {getAuthToken, getUserData} from '../redux/slices/UserSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const headerColor = '#6146C6';

const ConversationScreen = ({route}) => {
  const {user} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const token = useSelector(getAuthToken);
  const userData = useSelector(getUserData);
  const myID = userData?._id;

  useEffect(() => {
    // Initialize socket connection
    const socket = initializeSocket(myID);

    if (!socket) {
      console.error('Failed to initialize socket');
      return;
    }

    // Log socket connection status
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id); // Log when socket is connected
    });

    socket.on('connect_error', error => {
      console.error('Socket connection error:', error); // Log connection errors
    });

    socket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason); // Log when socket disconnects
    });

    // Fetch chat history and listen for incoming messages
    const getChatHistory = async () => {
      try {
        const chatHistory = await fetchChatHistory(user._id, token);
        setMessages(
          chatHistory.map(message => ({
            ...message,
            sender: message.sender || {_id: null}, // Ensure sender is defined
            content: message.content || message.message || 'No message content', // Handle different content fields
          })),
        ); // Set messages from chat history
        console.log('Fetched chat history:', chatHistory); // Log fetched chat history
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    getChatHistory();

    socket.emit('initiate-chat-connection', {userId: user._id});
    socket.on('receive-message', newMessage => {
      console.log('Received message:', newMessage); // Log received messages
      setMessages(prevMessages => [
        {
          ...newMessage,
          sender: newMessage.sender || {_id: null}, // Ensure sender is defined
          content:
            newMessage.content || newMessage.message || 'No message content', // Handle different content fields
        },
        ...prevMessages,
      ]);
    });

    // Cleanup on unmount
    return () => {
      disconnectSocket();
      console.log('Socket disconnected on component unmount'); // Log when component unmounts
    };
  }, [user._id, token]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message); // Log message before sending

      // Send message via WebSocket
      sendMessageSocket(myID, user._id, message);

      // Optionally, also save the message via API
      sendMessage(user._id, message, token)
        .then(response => {
          console.log('Message saved:', response);
          setMessage('');
        })
        .catch(error => {
          console.error('Failed to save message:', error);
        });
    }
  };

  const renderMessageItem = ({item}) => {
    const isSentByUser = item.sender?._id === myID; // Check if the message was sent by the logged-in user
    const profileImage = item.sender?.profileImage?.url || 'defaultImageUrl'; // Use default image if no URL

    console.log('Rendering message item:', {
      item,
      isSentByUser,
      profileImage,
    }); // Log details of message being rendered

    return (
      <View
        key={item._id}
        style={[
          styles.messageContainer,
          isSentByUser
            ? styles.sentMessageContainer
            : styles.receivedMessageContainer,
        ]}>
        {!isSentByUser && profileImage && (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        )}
        <View style={styles.messageContent}>
          <Text
            style={[
              styles.messageText,
              isSentByUser ? styles.sentMessage : styles.receivedMessage,
            ]}>
            {item.content || item.message || 'No message content'}{' '}
            {/* Handle case where message might be undefined */}
          </Text>
          <Text style={styles.messageTime}>
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
        {isSentByUser && profileImage && (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <FlatList
        data={[...messages].reverse()} // Reverse the messages array
        renderItem={renderMessageItem}
        keyExtractor={item => item._id}
      />

      <View style={styles.messageInputContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 10,
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
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: headerColor,
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#AC87C5',
    borderRadius: 20,
    padding: 10,
    maxWidth: '90%',
    color:'black',
  },
  receivedMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    borderRadius: 20,
    padding: 10,
    maxWidth: '120%',
  },
  messageText: {
    fontSize: 17,
    color:'black',
    fontFamily:'serif',
    
  },
  messageTime: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'flex-end',
  },
});

export default ConversationScreen;
