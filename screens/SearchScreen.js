import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filteredItems, setFilteredItems] = useState([]);

  const items = [
    {
      id: 1,
      title: 'Photography',
      description: 'A mesmerizing snapshot, it reveals a world of intricate details and hidden emotions...',
      deadline: '24/04/2024 - 02/05/2024',
      budget: 100,
    },
    {
      id: 2,
      title: 'Frontend',
      description: 'Frontend development crafts user-facing experiences...',
      deadline: '24/04/2024 - 02/05/2024',
      budget: 120,
    },
    {
      id: 3,
      title: 'Catering',
      description: 'Create a delightful catering experience with attention to detail and impeccable presentation...',
      deadline: '24/04/2024 - 02/05/2024',
      budget: 100,
    },
    {
      id: 4,
      title: 'Photography',
      description: 'A mesmerizing snapshot, it reveals a world of intricate details and hidden emotions...',
      deadline: '24/04/2024 - 02/05/2024',
      budget: 100,
    },
    {
      id: 5,
      title: 'Frontend',
      description: 'Frontend development crafts user-facing experiences...',
      deadline: '24/04/2024 - 02/05/2024',
      budget: 1000,
    },
  ];

  useEffect(() => {
    setFilteredItems(items);
  }, []);

  const handleSearch = () => {
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFilterPress = () => {
    setShowFiltersModal(true);
  };

  const handleCloseFiltersModal = () => {
    setShowFiltersModal(false);
  };

  const handleApplyFilters = () => {
    const filtered = items.filter(item => item.budget >= priceRange.min && item.budget <= priceRange.max);
    setFilteredItems(filtered);
    handleCloseFiltersModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="black"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterIcon}>
          <Text>
            <Ionicons name="filter-outline" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showFiltersModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseFiltersModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Price Range</Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1000}
              minimumTrackTintColor="#6146C6"
              maximumTrackTintColor="#6146C6"
              value={priceRange.max}
              onValueChange={(value) => setPriceRange({ ...priceRange, max: value })}
            />
            <Text style={styles.priceText}>Price Range: ${priceRange.min} - ${priceRange.max}</Text>
            <TouchableOpacity onPress={handleApplyFilters} style={styles.closeButton}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView>
        {filteredItems.map(item => (
          <View key={item.id} style={styles.infoBox}>
            <View style={styles.profileBox}>
              <Image
                source={require('../assets/images/female.png')}
                style={{ width: 60, height: 60, borderRadius: 35 }}
              />
            </View>
            <View style={styles.detailsBox}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemDeadline}>Deadline: {item.deadline}</Text>
              <Text style={styles.itemBudget}>Budget: ${item.budget}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'black',
  },
  filterIcon: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6146C6',
    borderRadius: 5,
  },
  priceText: {
    color: 'black',
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    marginTop: 23,
    borderRadius: 10,
    marginBottom: 25,
  },
  profileBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsBox: {
    flex: 3,
    justifyContent: 'center',
    marginLeft: 10,
  },
  itemTitle: {
    fontFamily: 'serif',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontFamily: 'serif',
    color: 'black',
    fontSize: 14,
  },
  itemDeadline: {
    fontFamily: 'serif',
    color: 'black',
    fontSize: 14,
  },
  itemBudget: {
    fontFamily: 'serif',
    color: 'black',
    fontSize: 14,
  },
});

export default SearchScreen;
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Image } from 'react-native';
// import Slider from '@react-native-community/slider';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { ScrollView } from 'react-native-gesture-handler';
// import axios from 'axios';

// const SearchScreen = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFiltersModal, setShowFiltersModal] = useState(false);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
//   const [filteredItems, setFilteredItems] = useState([]);

//   const fetchItems = async (query, budget) => {
//     try {
//       const response = await axios.post('http://localhost:8081/sub-task/search', {
//         query,
//         budget,
//       });
//       setFilteredItems(response.data.subTasks || []);
//     } catch (error) {
//       console.error('Error fetching items:', error);
//     }
//   };

//   useEffect(() => {
//     fetchItems('', { min: 0, max: 10000 });
//   }, []);

//   const handleSearch = () => {
//     fetchItems(searchQuery, { min: priceRange.min, max: priceRange.max });
//   };

//   const handleApplyFilters = () => {
//     fetchItems(searchQuery, { min: priceRange.min, max: priceRange.max });
//     setShowFiltersModal(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search..."
//           placeholderTextColor="black"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={handleSearch}
//         />
//         <TouchableOpacity onPress={() => setShowFiltersModal(true)} style={styles.filterIcon}>
//           <Text>
//             <Ionicons name="filter-outline" size={24} color="black" />
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         visible={showFiltersModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowFiltersModal(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Price Range</Text>
//             <Slider
//               style={{ width: 200, height: 40 }}
//               minimumValue={0}
//               maximumValue={1000}
//               minimumTrackTintColor="#6146C6"
//               maximumTrackTintColor="#6146C6"
//               value={priceRange.max}
//               onValueChange={(value) => setPriceRange({ ...priceRange, max: value })}
//             />
//             <Text style={styles.priceText}>Price Range: ${priceRange.min} - ${priceRange.max}</Text>
//             <TouchableOpacity onPress={handleApplyFilters} style={styles.closeButton}>
//               <Text style={styles.buttonText}>Apply</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <ScrollView>
//         {filteredItems.map(item => (
//           <View key={item._id} style={styles.infoBox}>
//             <View style={styles.profileBox}>
//               <Image
//                 source={require('../assets/images/female.png')}
//                 style={{ width: 60, height: 60, borderRadius: 35 }}
//               />
//             </View>
//             <View style={styles.detailsBox}>
//               <Text style={styles.itemTitle}>{item.title}</Text>
//               <Text style={styles.itemDescription}>{item.description}</Text>
//               <Text style={styles.itemDeadline}>Deadline: {item.deadline}</Text>
//               <Text style={styles.itemBudget}>Budget: ${item.budget}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   searchInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//     color: 'black',
//   },
//   filterIcon: {
//     padding: 10,
//     backgroundColor: '#ccc',
//     borderRadius: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     marginBottom: 10,
//     color: 'black',
//   },
//   closeButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#6146C6',
//     borderRadius: 5,
//   },
//   priceText: {
//     color: 'black',
//     marginBottom: 10,
//   },
//   infoBox: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     padding: 10,
//     marginTop: 23,
//     borderRadius: 10,
//     marginBottom: 25,
//   },
//   profileBox: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   detailsBox: {
//     flex: 3,
//     justifyContent: 'center',
//     marginLeft: 10,
//   },
//   itemTitle: {
//     fontFamily: 'serif',
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   itemDescription: {
//     fontFamily: 'serif',
//     color: 'black',
//     fontSize: 14,
//   },
//   itemDeadline: {
//     fontFamily: 'serif',
//     color: 'black',
//     fontSize: 14,
//   },
//   itemBudget: {
//     fontFamily: 'serif',
//     color: 'black',
//     fontSize: 14,
//   },
// });

// export default SearchScreen;
