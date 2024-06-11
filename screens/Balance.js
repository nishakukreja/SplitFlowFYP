// import React from 'react';
// import { View, StyleSheet, Image, Text } from 'react-native';

// const Balance = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Settle the bill with your card</Text>
//       </View>
//       <View style={[styles.card, styles.firstCard]}>
//     <Image 
//       source={require('../assets/images/hbl.png')} 
//       style={{ width: '92%', height: '54%' }} 
//     />
//         </View>
//         <View style={[styles.card, styles.secondCard]}>
//     <Image 
//       source={require('../assets/images/visa.png')} 
//       style={{ width: '89%', height: '49%' }} 
//     />
//   </View>

 
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: '#6146C6',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     padding: 40,
//     alignItems: 'center',
//     marginBottom:20
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     fontFamily:'serif'
//   },
//   card: {
//     alignItems: 'center',
//   },
//   secondCard: {
//     marginTop: -120, // Add margin top to create space between cards
//   },
//   cardLogo: {
//     width: '89%',
//     height: '49%',
   
//   },
// });

// export default Balance;
import { View, Text } from 'react-native'
import React from 'react'

export default function Balance() {
  return (
    <View>
      <Text>Balance</Text>
    </View>
  )
}
