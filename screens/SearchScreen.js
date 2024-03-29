import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 }); // Price range object

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleFilterPress = () => {
    // Open filters modal
    setShowFiltersModal(true);
  };

  const handleCloseFiltersModal = () => {
   
    setShowFiltersModal(false);
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

      {/* Filters Modal */}
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
              maximumValue={1000} // Maximum price
              minimumTrackTintColor="#6146C6"
              maximumTrackTintColor="#6146C6"
              value={priceRange.max} // Display maximum price initially
              onValueChange={(value) => setPriceRange({ ...priceRange, max: value })}
            />
            <Text style={styles.priceText}>Price Range: ${priceRange.min} - ${priceRange.max}</Text>
            
            {/* Heading for Subtasks */}
            
            <TouchableOpacity onPress={handleCloseFiltersModal} style={styles.closeButton}>
              <Text>Save</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
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
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6146C6',
    borderRadius: 5,
  },
  priceText: {
    color: 'black', 
    marginBottom: 10, // Add margin bottom for spacing
  },
  subtaskHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, // Add margin bottom for spacing
    color:'black',
    fontFamily:'serif'
  },
});

export default SearchScreen;
