import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { allowedAddresses } from '../IPConfig';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const ProjectList = () => {
  const tasks = useSelector(state => state.tasks);
  const [groupTask, setSelectedGroupTask] = useState([]);

  const renderItem = ({ item }) => (
    <View style={styles.projectCard}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>{item.startDate}</Text>
        <Text style={styles.dateText}>{item.endDate}</Text>
      </View>
    </View>
  );

  const getdata = async () => {
    try {
      const response = await axios.get(`${allowedAddresses.ip}/group-task/get-group-tasks-by-category/663181c398678211e89b62d6`);
      console.log("Response Data:", response.data); // Log response data
      setSelectedGroupTask(response.data);
    } catch (error) {
      console.error("Error fetching group tasks:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 500) {
        // Handle server error
        console.error("Server error, possibly an issue with the endpoint.");
      }
    }
  };
  

  useEffect(() => {
    getdata();
  }, []);

  return (
    <View style={styles.container}>
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

      <FlatList
        data={groupTask}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const CompletedList = () => {
  const [groupTask, setSelectedGroupTask] = useState([]);

  const renderItem = ({ item }) => (
    <View style={styles.projectCard}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>{item.startDate}</Text>
        <Text style={styles.dateText}>{item.endDate}</Text>
      </View>
    </View>
  );

  const getdata = async () => {
    try {
      const response = await fetch(`${allowedAddresses.ip}/get-my-group-tasks`);
      
      if (!response.ok) {
        // Log the status code and status text for better debugging
        console.error(`Server returned an error: ${response.status} ${response.statusText}`);
        return;
      }
  
      const responseText = await response.text();
      
      try {
        const data = JSON.parse(responseText);
        setSelectedGroupTask(data);  // Set the data to state
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        console.error("Response was:", responseText);
      }
    } catch (error) {
      console.error("Error fetching group tasks:", error);
    }
  };
  
  useEffect(() => {
    getdata();
  }, []);

  return (
    <View style={styles.container}>
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

      <FlatList
      contentContainerStyle={{flex:1}}
        data={groupTask}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const renderScene = SceneMap({
  first: ProjectList,
  second: CompletedList,
});

export default function ViewTaskScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Created Task' },
    { key: 'second', title: 'Performed Task' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: 'white' }}
          activeColor="purple"
          inactiveColor="black"
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  projectCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  dateText: {
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  greenBox: {
    backgroundColor: '#d0f0c0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  purpleBox: {
    backgroundColor: '#e0aaff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greyBox: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 24,
    marginRight: 10,
  },
  circle: {
    fontSize: 24,
    marginRight: 10,
  },
  details: {
    flexDirection: 'column',
  },
});
