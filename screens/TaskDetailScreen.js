import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProgressCircle} from 'react-native-svg-charts';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import Categories from '../constants/categories';
import {allowedAddresses} from '../IPConfig';

const TaskDetailScreen = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedChip, setSelectedChip] = useState('ongoing');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedGroupTask, setSelectedGroupTask] = useState(
    route.params.groupTask,
  );

  useEffect(() => {
    filterItems(selectedChip);
  }, [selectedChip]);

  const filterItems = categoryName => {
    const category = Categories.find(cat => cat.name === categoryName);
    if (category) {
      setFilteredItems(category.items);
    } else {
      setFilteredItems([]);
    }
  };

  const updateProgress = async (id, progress, status) => {
    try {
      const url = `${allowedAddresses.ip}/progress-tracking/update-progress/${id}`;

      console.log('Sending request to:', url);
      console.log('Request data:', {progress, status});

      const response = await axios.put(url, {progress, status});

      console.log('Response data:', response.data);

      if (response.status === 200 && response.data.success) {
        const updatedTask = response.data.updatedTask;

        if (updatedTask._id === id) {
          setSelectedGroupTask({
            ...selectedGroupTask,
            progress: updatedTask.progress,
            status: updatedTask.status,
          });
          Alert.alert(
            'Success',
            response.data.message || 'Task progress updated successfully.',
          );
        } else {
          Alert.alert('Error', 'The returned ID does not match the task ID.');
        }
      } else {
        console.error(
          'Error fetching items:',
          response.data.message || 'Unknown error',
        );
        Alert.alert(
          'Error',
          response.data.message || 'Failed to update progress.',
        );
      }
    } catch (error) {
      console.error(
        'Error updating progress:',
        error.response?.data || error.message,
      );
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Network request failed. Please check your server.',
      );
    }
  };
  const handleChipPress = chipName => {
    setSelectedChip(chipName.toLowerCase());
    let progressValue;
    if (chipName === 'Completed') {
      progressValue = 1.0;
    } else if (chipName === 'Ongoing') {
      progressValue = 0.8;
    } else {
      progressValue = 0.5;
    }
    // Call the updateProgress function with the new progress value
    updateProgress(selectedGroupTask._id, progressValue, chipName);
  };
  const ProgressBar = ({progress, tasksCompleted, teamMembers}) => {
    return (
      <View
        style={{
          backgroundColor: '#756AB6',
          borderRadius: 18,
          overflow: 'hidden',
          width: 333,
          height: 210,
          position: 'relative',
          marginBottom: 399,
        }}>
        <Text
          style={{
            marginLeft: 151,
            fontFamily: 'serif',
            fontWeight: 'bold',
            marginTop: 22,
            fontSize: 22,
          }}>
          {selectedGroupTask.title}
        </Text>
        <ProgressCircle
          progress={selectedGroupTask.progress} // This line reflects the updated progress
          progressColor="#AC87C5"
          strokeWidth={20}
          style={{
            width: 107.5,
            height: 110,
            position: 'absolute',
            marginLeft: 39,
            top: 30,
          }}
        />
        <View
          style={{
            width: 107.5,
            height: 110,
            backgroundColor: '#AC87C5',
            borderRadius: 50,
            position: 'absolute',
            marginLeft: 39,
            top: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'serif',
              fontSize: 18,
            }}>
            {Math.round(selectedGroupTask.progress * 100)}%
          </Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 12,
            fontFamily: 'serif',
            position: 'absolute',
            left: 160,
            top: 90,
            fontSize: 12,
          }}>
          Total sub tasks: {selectedGroupTask.subTasks.length}
        </Text>
        <View style={{marginTop: 90, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
            {teamMembers.map((member, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (index === teamMembers.length - 1) {
                    navigation.navigate('UserScreen');
                  }
                }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: -22,
                    marginBottom: 1,
                    borderRadius: 25,
                  }}
                  source={member.avatar}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const categories = [
    {name: 'Ongoing', icon: 'circle', color: 'black'},
    {name: 'Pending', icon: 'hourglass', color: 'black'},
    {name: 'Completed', icon: 'check-circle', color: 'black'},
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          setCarouselIndex(newIndex);
        }}>
        <View style={styles.carouselItem}>
          <Text>Progress tracking</Text>
          <ProgressBar
            progress={0.7}
            tasksCompleted={5}
            teamMembers={[
              {avatar: require('../assets/images/female.png')},
              {avatar: require('../assets/images/malee.png')},
              {avatar: require('../assets/images/maleee.png')},
              {avatar: require('../assets/images/femaleee.png')},
            ]}
          />
        </View>
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}>
        <TouchableOpacity
          key={'dssd'}
          style={[styles.categoryChip]}
          onPress={() => {
            navigation.navigate('NewSubTask', {
              groupTask: selectedGroupTask,
            });
          }}>
          <Icon
            name={'plus'}
            size={15}
            color={'black'}
            style={styles.categoryIcon}
          />
          <Text style={{color: 'black'}}>Create Sub Task</Text>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              selectedChip === category.name.toLowerCase() && {
                backgroundColor: '#6146C6',
              },
            ]}
            onPress={() => handleChipPress(category.name)}>
            <Icon
              name={category.icon}
              size={15}
              color={
                selectedChip === category.name.toLowerCase()
                  ? '#FFFFFF'
                  : category.color
              }
              style={styles.categoryIcon}
            />
            <Text
              style={{
                color:
                  selectedChip === category.name.toLowerCase()
                    ? '#FFFFFF'
                    : category.color,
              }}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Render filtered items */}
      <ScrollView>
      {filteredItems.map((item, index) => (
  <View key={index} style={styles.itemContainer}>
    <View style={styles.itemDetailsContainer}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemDeadline}>Deadline: {item.deadline}</Text>
        
      </View>
      
      {/* Pay Button Side by Side */}
      <TouchableOpacity
        style={[
          styles.payButton,
          {backgroundColor: item.payEnabled ? '#6146C6' : '#C0C0C0'},
        ]}
        disabled={!item.payEnabled}
        onPress={() => {
          if (item.payEnabled) {
            navigation.navigate('PaymentScreen', {task: item});
          } else {
            Alert.alert(
              'Payment Unavailable',
              'You cannot pay for this task yet.',
            );
          }
        }}>
        <Text style={{color: 'white'}}>Pay</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width: 378,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 390,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: -790,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    marginBottom: 20,
    height: 50,
  },
  categoryIcon: {
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
  },
  taskItem: {
    padding: 7,
    marginBottom: 2,
    borderRadius: 8,
  },
  taskText: {
    color: 'black',
    fontFamily: 'serif',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    height: 0,
  },
  itemContainer: {
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color:'black'
  },
  itemDetailsContainer: {
    flexDirection: 'row',  // Arrange items horizontally
    justifyContent: 'space-between',  // Distribute space between item details and Pay button
    alignItems: 'center',
  },
  payButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
    marginLeft:25,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 9,
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: '#6146C6',
  },
  tabText: {
    color: 'black',
    fontFamily: 'serif',
  },
  selectedTabText: {
    color: 'white',
  },
});

export default TaskDetailScreen;
