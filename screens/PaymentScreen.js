import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';

const PaymentScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Nisha!</Text>
        <Text style={styles.subGreeting}>Process your payment at this point.</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Balance')}>
          <Fontisto name="money-symbol" color="#fff" size={40} />
          <Text style={styles.menuText}>Online</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('StripeScreen')}>
          <Icon name="exchange" type="font-awesome" color="#fff" size={40} />
          <Text style={styles.menuText}>Stripe</Text>
        </TouchableOpacity>
       
          <Text style={styles.menuText}>Transactions</Text>
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    backgroundColor: '#6146C6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 50,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'serif',
  },
  subGreeting: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 5,
    fontFamily: 'serif',
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 23,
    marginTop: 20,
  },
  menuItem: {
    width: '45%',
    backgroundColor: '#6146C6',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  menuText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'serif',
  },
});

export default PaymentScreen;

// import React, { useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import stripe from 'tipsi-stripe'; // Assuming you're using tipsi-stripe library for React Native Stripe integration

// const PaymentScreen = () => {
//   const [clientSecret, setClientSecret] = useState('');
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [currency, setCurrency] = useState('');

//   const createStripePaymentIntent = async () => {
//     // Assuming you have set up your Stripe publishable key previously in your app
//     stripe.setOptions({
//       publishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY',
//     });

//     try {
//       const paymentIntent = await stripe.paymentRequestWithCardForm({
//         amount: totalAmount,
//         currency: 'PKR', // Change it to the appropriate currency code
//       });

//       setClientSecret(paymentIntent.clientSecret);
//       setCurrency(paymentIntent.currency);
//       setAmount(amount);
//       setTotalAmount(totalAmount);
//     } catch (error) {
//       console.error('Error creating payment intent:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Client Secret: {clientSecret}</Text>
//       <Text>Total Amount: {totalAmount}</Text>
//       <Text>Amount: {amount}</Text>
//       <Text>Currency: {currency}</Text>
//       <Button title="Create Payment Intent" onPress={createStripePaymentIntent} />
//     </View>
//   );
// };

// export default PaymentScreen;
