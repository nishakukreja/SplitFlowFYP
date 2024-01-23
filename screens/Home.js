import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ProgressCircle } from 'react-native-svg-charts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Card, Avatar } from 'react-native-elements';
import * as Progress from 'react-native-progress';

const bellIconName = 'bell';

const ProgressBar = ({ progress, tasksCompleted }) => (
  <View>
    <View style={{ backgroundColor: '#756AB6', borderRadius: 18, overflow: 'hidden', width: 333, height: 180, position: 'relative', marginBottom: 399 }}>
      <Text style={{ marginLeft: 151, fontFamily: 'serif', position: 'absolute',fontWeight:'bold',marginTop:22,fontSize:22, }}>Task Progress</Text>
      <ProgressCircle
        // style={styles.circle}
        progress={progress}
        progressColor="#AC87C5"
        strokeWidth={10}
        style={{ width: 107.5, height: 110, position: 'absolute', marginLeft: 39, top: 30 }}
      />
      <Text style={{ fontWeight:'bold',marginLeft: 12, fontFamily: 'serif', position: 'absolute', marginLeft: 160, top: 60 }}>
        {Math.round(progress * 100)}%
      </Text>
      <Text style={{ fontWeight:'bold', marginLeft: 12, fontFamily: 'serif', position: 'absolute', marginLeft: 160, top: 90,fontSize:12 }}>
        {tasksCompleted}/10 Tasks Completed
      </Text>
    </View>
  </View>
);

const Home = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigation = useNavigation();

  const handleCarouselItemPress = (index) => {
    setCarouselIndex(index);
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToNotifications = () => {
    navigation.navigate('Notification');
  };

  const navigateToNewTask = () => {
    navigation.navigate('NewTaskScreen');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'serif', fontWeight: 'bold' }}>Hello, Nisha</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={navigateToNotifications}>
                <FontAwesome name={bellIconName} size={24} color="black" style={styles.bell} />
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToProfile}>
                <Image
                  source={require('../assets/images/female.png')}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subHeader}>Let's complete your today tasks!</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setCarouselIndex(newIndex);
          }}
        >
          <View style={styles.carouselItem}>
            <Text>First Carousel Item</Text>
            <ProgressBar progress={0.6} tasksCompleted={7} />
          </View>
          <View style={styles.carouselItem}>
            <Text>Second Carousel Item</Text>
            <ProgressBar progress={0.5} tasksCompleted={5} />
          </View>
        </ScrollView>

        <TouchableOpacity onPress={navigateToNewTask} style={styles.newTaskButton}>
          <FontAwesome name="plus-circle" size={40} color="#756AB6" />
        </TouchableOpacity>
      </View>

      <RecentProjects />

      <TodayTasks />
    </ScrollView>
  );
};

const RecentProjects = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Suggested Tasks</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>

      <View style={styles.projectContainer}>
        {/* Left Box */}
        <View style={[styles.projectBox, styles.leftBox, { backgroundColor: '#82A0D8', width: 489, height: 269, }]}>
          <FontAwesome name="calendar-check-o" size={24} color="black" style={styles.icon} />
          <Text style={styles.projectTitle}>Event Management</Text>
          <Text style={styles.priority}>High Priority</Text>
          <Text style={styles.dueDate}>June 10, 2022 - 10 Tasks</Text>
          <Text style={{ color: 'black', fontFamily: 'serif' }}>78%</Text>
          {/* Additional details/icons can be added here */}
        </View>

        {/* Right Boxes */}
        <View style={styles.rightBoxes}>
          {/* Top Right Box */}
          <View style={[styles.projectBox, { backgroundColor: '#F875AA', width: 140, height: 129.9,marginBottom:2, }]}>
            <FontAwesome name="cutlery" size={24} color="black" style={styles.icon} />
            <Text style={styles.projectTitle}>Catering</Text>
            <Text style={styles.dueDate}>June 10, 2022 - 10 Tasks</Text>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>56%</Text>
          </View>

          <View style={[styles.projectBox, { backgroundColor: '#FFBB64', width: 140, height: 129.9, }]}>
            <FontAwesome name="camera" size={24} color="black" style={styles.icon} />
            <Text style={styles.projectTitle}>Photography</Text>
            <Text style={styles.dueDate}>June 10, 2022 - 10 Tasks</Text>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>31%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const TodayTasks = () => {
  return (
    <View style={styles.container}>
    <View style={[styles.header, { marginBottom: -10,marginTop:1, }]}>
      <Text style={styles.headerText}>Today Tasks</Text>
      <Text style={styles.viewAll}>ViewAll</Text>
    </View>

      <View style={styles.content}>
        <View style={styles.greenBox}>
          <Text style={styles.checkmark}>✓</Text>
          <View style={styles.details}>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>Photography</Text>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>Tomorrow</Text>
          </View>
        </View>
        <View style={styles.purpleBox}>
          <Text style={styles.circle}>●</Text>
          <View style={styles.details}>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>Choreographer</Text>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>Sep 7</Text>
          </View>
        </View>
        <View style={styles.greyBox}>
          <Text style={styles.circle}>●</Text>
          <View style={styles.details}>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>Decoration</Text>
            <Text style={{ color: 'black', fontFamily: 'serif' }}>Sep 8</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    marginBottom:7,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -19,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  subtitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    // marginTop: 5,
    // fontFamily: 'serif',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // marginTop: 10,
  },
  date: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'serif',
  },
  
  progress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  progressText: {
    marginLeft: 12,
    fontFamily: 'serif',
    position: 'absolute',
  },
  percentage: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
  },
  bell: {
    marginLeft: 131,
  },
  subHeader: {
    marginLeft: -390,
    marginRight:109,
    fontFamily: 'serif',
    color: 'black',
    marginTop: -6,
    marginBottom: -35,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 8,
  },
  carouselItem: {
    width: 353,
    marginRight: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:-399,
    marginTop:2,
  },
  newTaskButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily:'serif',
    marginBottom:-8,
  },
  viewAll: {
    color: '#6146C6',
    fontFamily:'serif',
    fontWeight:'bold',
    marginBottom:-4,
  },
  projectContainer: {
    flexDirection: 'row',
  },
  projectBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  leftBox: {
    flex: 1.2, // Adjust the flex to make the left box larger
  },
  rightBoxes: {
    flex: 1,
    marginLeft: 15,
    

  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  priority: {
    color: 'red',
  },
  dueDate: {
    marginTop: 8,
    color: '#888',
  },
  status: {
    marginTop: 8,
    color: 'green',
  },
  progress: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  checkbox: {
    width: 40,
    height: 40,
    // backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    padding: 1,
  },
  dueDate: {
    color:'black',
    fontFamily:'serif'
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    fontFamily:'serif',
    color:'black',
    marginBottom: 12,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  greenBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  purpleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  greyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
  },
  circle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0',
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 10,
  },
});

export default Home;
