import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {StatusBar} from 'react-native';
import UserCircleAvatar from '../components/UserCircleAvatar';
import ConversationCard from '../components/ConversationCard';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAuthToken} from '../redux/slices/UserSlice';
import {useSelector} from 'react-redux';
import {
  fetchMessages,
  fetchUsers,
  getChatList,
  sendMessage,
} from '../services/api';
import {useFocusEffect} from '@react-navigation/native';

const headerColor = '#6146C6';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [users, setUsers] = useState([]); // State to store fetched users
  const [chats, setChats] = useState([]); // State to store chat list

  const token = useSelector(getAuthToken); // Assuming you have a selector for getting the token
  console.log(token);

  const getChatScreen = async () => {
    try {
      const response = await getChatList(token);
      setChats(response); // Store the chat list in state

      console.log('response', JSON.stringify(response, null, 2));
    } catch {
      console.log(response.error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getChatScreen();
    }, [token]),
  );

  // Fetch users when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadUsers = async () => {
        try {
          const response = await fetchUsers(token); // Fetch users from backend
          console.log(
            'these are athe users ',
            JSON.stringify(response, null, 2),
          );
          if (response.status === 200) {
            const userData = response.data; // Extract data from the response
            // Remove duplicates based on emailAddress or _id
            const uniqueUsers = Array.from(
              new Set(userData.map(user => user.emailAddress)),
            ).map(email => {
              return userData.find(user => user.emailAddress === email);
            });
            setUsers(uniqueUsers); // Set the fetched users to the state
          } else {
            console.error('Error fetching users:', response.message);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      loadUsers();

      // Cleanup function (if needed, like unsubscribing from listeners)
      return () => {
        // Cleanup code here if needed
      };
    }, [token]),
  );

  // Fetch messages when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id, token)
        .then(data => setMessages(data))
        .catch(error => console.error('Error loading messages:', error));
    }
  }, [selectedChat, token]);

  const renderChatItem = ({item}) => (
    <TouchableOpacity
      style={styles.chatItemContainer}
      onPress={() =>
        navigation.navigate('ConversationScreen', {user: item.user})
      }>
      <Image
        source={{
          uri:
            item.user.profileImage.url ||
            'https://example.com/default-profile.png',
        }}
        style={styles.profileImage}
      />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>
          {item.user.firstName} {item.user.lastName}
        </Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage.content}
        </Text>
      </View>
      <Text style={styles.messageTime}>
        {new Date(item.lastMessage.createdAt).toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );
  // Render individual messages
  const renderMessage = ({item}) => (
    <View
      style={item.isSentByUser ? styles.sentMessage : styles.receivedMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );
  // Render user list item
  const renderUser = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ConversationScreen', {user: item})}>
      <View style={styles.userItem}>
        <Image
          source={{
            uri:
              item?.profileImage?.url ||
              'https://example.com/default-profile.png',
          }}
          style={styles.profileImage}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={headerColor} barStyle="light-content" />
      <View style={styles.onlineUsersHeader}>
        <View style={styles.screenHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={styles.screenHeaderTextBox}>
            <Text style={styles.screenHeaderText}>Chat</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.userList}
          data={users}
          renderItem={renderUser}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.conversationsListContainer}>
        <FlatList
          style={styles.chatList}
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={item => item.user._id}
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
    backgroundColor: '#fff',
  },
  onlineUsersHeader: {
    backgroundColor: headerColor,
    paddingVertical: 10,
  },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  searchButton: {
    padding: 10,
  },
  screenHeaderText: {
    color: '#fff',
    fontSize: 20,
  },
  conversationsListContainer: {
    flex: 1,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: '#fff',
    padding: 22,
  },
  userList: {
    marginTop: 10,
  },
  messageList: {
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
    borderColor: '#ccc',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#555',
    alignSelf: 'flex-end',
  },
  noChatSelectedText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },

  chatList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f7f7f7', // Light background color for the list
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff', // White background for each chat item
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3, // Elevation for Android shadow
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});
