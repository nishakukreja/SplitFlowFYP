import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import axios from 'axios';
import { allowedAddresses } from '../IPConfig';

const Balance = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = async (amount) => {
    try {
      const response = await axios.post(`${allowedAddresses.ip}/payment/create-payment-intent`, {
        amount,
      });

      if (response.status === 200) {
        const { clientSecret, stripeAmount, actualAmount, currency } = response.data.data;

        // For demonstration, showing an alert with payment details
        Alert.alert(
          'Payment Intent Created',
          `Client Secret: ${clientSecret}\nAmount: ${actualAmount} ${currency}`,
        );
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an issue creating the payment intent.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay Online</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.card} onPress={() => handlePayment(500)}>
          <Image source={require('../assets/images/hbl.png')} style={styles.cardLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handlePayment(1000)}>
          <Image source={require('../assets/images/easy.png')} style={styles.cardLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handlePayment(1500)}>
          <Image source={require('../assets/images/jazz.jpg')} style={styles.cardLogo} />
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Payment Successful!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6146C6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'serif',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cardLogo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Balance;
