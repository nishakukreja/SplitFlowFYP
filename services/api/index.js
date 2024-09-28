import axios from 'axios';
import {ToastAndroid} from 'react-native';

// Replace with your backend URL
export const BASE_URL = 'http://172.16.151.223:8080/api/v1';
export const WebSocket_URL = 'ws://172.16.151.223:8080';
import io from 'socket.io-client';

let socket = null;

// Function to get all group tasks for the current user
export const getAllUserGroupTasks = async token => {
  try {
    const response = await axios.get(
      `${BASE_URL}/group-task/get-my-group-tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you use JWT for authentication
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Group tasks not found');
    }
  } catch (error) {
    console.error('Error fetching group tasks:', error);
    throw error;
  }
};

export const createSubTask = async (bodyData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sub-task/create-sub-task`,
      bodyData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you use JWT for authentication
        },
      },
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to create sub-task');
    }
  } catch (error) {
    console.error('Error creating sub-task:', error);
    throw error;
  }
};

export const getAllSubTasksByGroupTask = async (groupTaskId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/sub-task/get-sub-tasks-by-group-task/${groupTaskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you use JWT for authentication
        },
      },
    );

    if (response.status === 200) {
      return response.data.data; // Assuming the sub-tasks are returned under the `data` property
    } else {
      throw new Error('Sub-tasks not found');
    }
  } catch (error) {
    console.error('Error fetching sub-tasks:', error);
    throw error;
  }
};

export const fetchMessages = async (chatId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chat/get-messages?chatId=${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming JWT for authentication
        },
      },
    );

    if (response.status === 200) {
      return response.data.messages; // Assuming messages are in response.data.messages
    } else {
      throw new Error('Failed to fetch messages');
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Function to send a message
export const sendMessage = async (receiverId, messageContent, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/chat/send-message`,
      {
        receiverId,
        messageContent, // Use 'messageContent' to match the API's expected field
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      // Check for status 200 instead of 201
      return response.data;
    } else {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
  } catch (error) {
    console.error(
      'Error sending message:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const fetchUsers = async token => {
  const response = await fetch(`${BASE_URL}/user/get-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data;
};

export const fetchChatHistory = async (receiverId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chat/get-chat-history/${receiverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.success) {
      return response.data.data.chatHistory;
    } else {
      throw new Error('Failed to fetch chat history: ' + response.statusText);
    }
  } catch (error) {
    console.error(
      'Failed to fetch chat history:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const getChatList = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/get-chat-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the API response contains a `data` object with a `chatList` array
    return response.data.data.chatList;
  } catch (error) {
    console.error(
      'Failed to fetch chat list:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const updateSubTaskProgress = async (
  subTaskId,
  progress,
  status,
  token,
) => {
  try {
    // Make the PUT request to update the sub-task
    const response = await axios.put(
      `${BASE_URL}/sub-task/update-sub-Task/${subTaskId}`, // Replace with your actual API endpoint
      {progress, status}, // Request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Return the updated data from the API response
    return response.data;
  } catch (error) {
    // Handle errors, if any
    console.error(
      'Failed to update sub-task progress:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getAllSubTasks = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/sub-task/get-all-subtask`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the API response contains a `data` object with a `chatList` array
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch chat list:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

export const joinSubTask = async (token, subTaskId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/sub-task/joinSubTask/${subTaskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    // ToastAndroid.show("error.response.message", 3000);
    // ToastAndroid.show()
    console.log('>> error.response: ', error.response.message);
    console.error(
      'Failed to join subtask:',
      error.response ? error.response.data : error.message,
    );
    // throw error;
  }
};

export const createGalleryEntry = async (token, imageUri, fileName) => {
  try {
    // Convert the image to base64
    const imageBase64 = await convertImageToBase64(imageUri);

    const response = await axios.post(
      `${BASE_URL}/gallery/create-gallery`,
      {imageBase64},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error creating gallery entry:', error);
    // Handle specific errors or return a general error message
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || 'Failed to create gallery entry',
        error: error.response.data.error,
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'No response from server',
      };
    } else {
      return {
        success: false,
        message: error.message || 'An error occurred',
      };
    }
  }
};

// Helper function to convert image to base64
const convertImageToBase64 = async uri => {
  // Fetch the image data
  const response = await fetch(uri);
  // Convert to blob
  const blob = await response.blob();
  // Read the blob as base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject('Failed to convert image to base64');
    reader.readAsDataURL(blob);
  });
};

export const createPaymentIntent = async (token, amount) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/create-payment-intent`,
      {amount},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT or other token for authentication
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to create payment intent');
    }
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (
  token,
  paymentIntentId,
  paymentMethodId,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/confirm-payment`,
      {paymentIntentId, paymentMethodId},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT or other token for authentication
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to confirm payment');
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

export const initializeSocket = userId => {
  socket = io(`${WebSocket_URL}`, {
    query: {userId},
  });

  return socket;
};

export const sendMessageSocket = (fromUserId, toUserId, message) => {
  console.log(
    'Sending message from:',
    fromUserId,
    'to:',
    toUserId,
    'message:',
    message,
  ); // Log the parameters
  if (socket) {
    socket.emit('send-message', {fromUserId, toUserId, message});
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const deleteGallery = async (token, galleryId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/gallery/gallery-delete/${galleryId}`, // Ensure this matches your backend route
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      throw new Error(`Failed to delete gallery: ${response.statusText}`);
    }
  } catch (error) {
    console.error(
      'Error deleting gallery:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};
