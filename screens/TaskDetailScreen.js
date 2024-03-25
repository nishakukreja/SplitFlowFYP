import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome for icons
import { ProgressCircle } from 'react-native-svg-charts';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation

const TaskDetailScreen = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedChip, setSelectedChip] = useState('');
  const navigation = useNavigation(); // Initialize navigation hook

  const handleCarouselItemPress = index => {
    setCarouselIndex(index);
  };

  const handleChipPress = chipName => {
    setSelectedChip(chipName);
  };

  const ProgressBar = ({ progress, tasksCompleted, teamMembers }) => {
    return (
      <View
        style={{
          backgroundColor: '#756AB6',
          borderRadius: 18,
          overflow: 'hidden',
          width: 333,
          height: 210, // Increased height to accommodate team members
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
          Task Progress
        </Text>
        <ProgressCircle
          progress={progress}
          progressColor="#AC87C5"
          strokeWidth={10}
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
            {Math.round(progress * 100)}%
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
          {tasksCompleted}/10 Tasks Completed
        </Text>
        <View style={{ marginTop: 90, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap' }}>
            {teamMembers.map((member, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (index === teamMembers.length - 1) {
                    navigation.navigate('UserScreen');                   }
                }}>
                <Image // Using Image component for local image assets
                  style={{ width: 40, height: 40, marginRight: -22, marginBottom: 1, borderRadius: 25 }} // Adjust style as needed
                  source={member.avatar} // Assuming each team member object has an 'avatar' property containing the local image asset
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const categories = [
    { name: 'Ongoing', icon: 'circle', color: 'black' },
    { name: 'Pending', icon: 'hourglass', color: 'black' },
    { name: 'Completed', icon: 'check-circle', color: 'black' },
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
          <Text>First Carousel Item</Text>
          <ProgressBar progress={0.9} tasksCompleted={7} teamMembers={[{ avatar: require('../assets/images/male.png') }, { avatar: require('../assets/images/femalee.png') }, { avatar: require('../assets/images/femaleee.png') }, { avatar: require('../assets/images/maleee.png') }]} />
        </View>
        <View style={styles.carouselItem}>
          <Text>Second Carousel Item</Text>
          <ProgressBar progress={0.5} tasksCompleted={5} teamMembers={[{ avatar: require('../assets/images/female.png') }, { avatar: require('../assets/images/malee.png') }, { avatar: require('../assets/images/maleee.png') }, { avatar: require('../assets/images/femaleee.png') }]} />
        </View>
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              selectedChip === category.name && { backgroundColor: '#6146C6' },
            ]}
            onPress={() => handleChipPress(category.name)}>
            <Icon
              name={category.icon}
              size={15}
              color={selectedChip === category.name ? '#FFFFFF' : category.color}
              style={styles.categoryIcon}
            />
            <Text style={{ color: selectedChip === category.name ? '#FFFFFF' : category.color }}>{category.name}</Text>
          </TouchableOpacity>
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
    marginRight: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 399,
    marginTop: 9,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: -850,
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
});

export default TaskDetailScreen;
