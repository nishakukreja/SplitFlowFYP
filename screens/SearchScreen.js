import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { allowedAddresses } from '../IPConfig';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filteredItems, setFilteredItems] = useState([]);

  
  const handleSearch = async () => {
    try {
      const response = await axios.post(`${allowedAddresses.ip}/sub-task/search`, {
        query: searchQuery,
        budget: priceRange,
      });
      console.log("Items received:", response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Error fetching filtered items:', error);
    }
  };

  // Function to open the filter modal
  const handleFilterPress = () => {
    setShowFiltersModal(true);
  };

  // Function to close the filter modal
  const handleCloseFiltersModal = () => {
    setShowFiltersModal(false);
  };

  const handleApplyFilters = () => {
    handleSearch();
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
          <Ionicons name="filter-outline" size={24} color="black" />
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
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
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
          ))
        ) : (
          <Text style={styles.noItemsText}>No items found</Text>
        )}
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
    backgroundColor: 'white',
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
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
    fontSize: 16,
  },
});

export default SearchScreen;
