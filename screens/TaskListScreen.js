// // TaskListScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { Chip } from 'react-native-paper';

// const TaskListScreen = ({ taskList, toggleTask }) => {
//   const renderItem = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.taskItem}
//         onPress={() => toggleTask(item.id)}
//       >
//         <View style={styles.taskCheck}>
//           {item.completed && <Text style={styles.taskCheckText}>✓</Text>}
//         </View>
//         <View style={styles.taskContent}>
//           <Text style={styles.taskTitle}>{item.title}</Text>
//           <Text style={styles.taskTime}>{item.createdAt}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.tasks}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Upcoming tasks</Text>
//         {/* Add your 'See all >' button or any other header elements here */}
//       </View>
//       <FlatList
//         data={taskList}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         // marginBottom: 16,
//         color: '#ffff',
//       },
//       tasks: {
//         flex: 1,
//         backgroundColor: '#fffff',
//         borderRadius: 10,
//         padding: 10,
//         marginVertical: 10,
//       },
//       schedule: {
//         flex: 1,
//         backgroundColor: '#fffff',
//         borderRadius: 10,
//         padding: 10,
//         marginVertical: 10,
//       },
    
// });

// export default TaskListScreen;
