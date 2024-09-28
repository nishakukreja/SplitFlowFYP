import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {allowedAddresses} from '../IPConfig';
import Modal from 'react-native-modal';
import {colors} from 'react-native-elements';
import {createSubTask} from '../services/api';
import {getUserData} from '../redux/slices/UserSlice';

const tagsData = [
  {name: 'IT', color: '#7071E8', icon: 'desktop'},
  {name: 'Construction', color: '#638889', icon: 'building'},
  {name: 'Wedding', color: '#C21292', icon: 'heart'},
  {name: 'Assignments', color: '#F4CE19', icon: 'book'},
  {name: 'Designing', color: '#65B741', icon: 'pencil'},
  {name: 'Event Planning', color: '#864AF9', icon: 'calendar'},
  {name: 'Others', color: '#6895D2', icon: 'ellipsis-h'},
];

const statuses = ['To Do', 'In Progress', 'Completed'];

const NewSubTaskScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector(getUserData);

  const route = useRoute();

  const {groupTask} = route.params;
  console.log('This is from params ', JSON.stringify(groupTask, null, 2));

  const [selectedGroupTask, setSelectedGroupTask] = useState(
    route.params.groupTask,
  );

  const {userAuthToken, currentUser} = useSelector(state => state.user);

  const [showGroupTasks, setShowGroupTasks] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subTaskFare, setSubTaskFare] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [status, setStatus] = useState(statuses[0]);
  const [attachments, setAttachments] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [groupTaskId, setGroupTaskId] = useState('');
  const [groupTaskCategory, setGroupTaskCategory] = useState('');

  const [allTags, setAllTags] = useState([]);

  const openAttachmentModal = () => {
    setAttachmentModalVisible(true);
  };

  const closeAttachmentModal = () => {
    setAttachmentModalVisible(false);
  };

  const handleAttachmentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Handle the selected file, you can store it in the state or process it as needed
      console.log(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error('Error picking file', err);
      }
    }
  };

  const handleTagPress = tag => {
    if (selectedTags.includes(tag._id)) {
      setSelectedTags(selectedTags.filter(t => t !== tag._id));
    } else {
      setSelectedTags([...selectedTags, tag._id]);
    }
    // setSelectedCategory(tag._id);
  };

  const renderTag = tag => {
    const tagWidth = tag.title.length * 8 + 50;

    return (
      <Text
        key={tag.title}
        style={{
          color: selectedTags.includes(tag._id) ? 'white' : 'black',
          fontFamily: 'serif',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 5,
          backgroundColor: selectedTags.includes(tag._id)
            ? '#6146C6'
            : 'transparent',
          //   backgroundColor: selectedCategory === tag._id ? "#6146C6" : "transparent",

          flexWrap: 'wrap',
          width: tagWidth,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => handleTagPress(tag)}>
        {tag.title}
      </Text>
    );
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const showStartDate = () => {
    setShowStartDatePicker(true);
  };

  const showEndDate = () => {
    setShowEndDatePicker(true);
  };

  const handleSubmit = async () => {
    // Check if required fields are filled
    if (
      !title ||
      !description ||
      !endDate ||
      !groupTask?._id ||
      !groupTask?.category ||
      !selectedTags ||
      subTaskFare === undefined
    ) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newTask = {
      title,
      description,
      startDate,
      endDate,
      tags: selectedTags,
      status,
      attachments,
    };

    const bodyData = {
      title,
      description,
      groupTask: groupTask?._id, // Assume groupTask always exists
      deadline: endDate, // Ensure date is in the correct format
      category: groupTask?.category, // Ensure category is not empty or provide default
      tags: selectedTags,
      price: subTaskFare, // Ensure price is a number
    };
    try {
      setIsCreating(true);
      const result = await createSubTask(bodyData, userAuthToken);
      console.log('on success create: ', result);
      Alert.alert('Sub Task Success', result.message);
      setDescription('');
      setTitle('');
      setSelectedTags('');
      setEndDate(new Date());
      setStartDate(new Date());
      setIsCreating(false);
      setSubTaskFare(0);
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error creating sub-task:', error);
      setIsCreating(false);
    }
  };
  const createSubTaskApi = async bodyData => {
    try {
      setIsCreating(true);
      const apiResponse = await axios
        .post(`${allowedAddresses.ip}/sub-task/create-sub-task`, bodyData, {
          headers: {
            authorization: `Bearer ${userAuthToken}`,
          },
        })
        .then(onSuccess => {
          console.log('on success create: ', onSuccess.data);
          Alert.alert('Sub Task Success', onSuccess.data.message);
          setDescription('');
          setTitle('');
          setSelectedTags('');
          setEndDate(new Date());
          setStartDate(new Date());
          setIsCreating(false);
          setSubTaskFare(0);
          // navigation.navigate('TaskDetailScreen', {
          //   groupTask: selectedGroupTask,
          // });
        })
        .catch(onError => {
          console.log('on error create: '.onError.response.data);
          setIsCreating(false);
        });
      console.log('this is the api respones::: ', apiResponse);
    } catch (error) {
      console.log('error in group task create: ', error);
      setIsCreating(false);
    }
  };

  const getAllInterests = async () => {
    try {
      console.log('ip: ', allowedAddresses.ip);
      const apiResponse = await axios.get(
        `${allowedAddresses.ip}/tag/get-all-tags`,
      );
      console.log('api response in area of interests: ', apiResponse.data);
      if (apiResponse.data.status == 200 && apiResponse.data.success) {
        setAllTags(apiResponse.data.data);
      }
    } catch (error) {
      console.log('error in getting interests: ', error);
    }
  };

  useEffect(() => {
    getAllInterests();
  }, []);

  // const [grouptaskname, setGroupTaskName] = useState('');

  const handlePress = (taskId, title, category) => {
    setGroupTaskId(taskId);
    setGroupTaskName(title);
    setGroupTaskCategory(category);
    console.log('Selected Task ID:', taskId);
    setShowGroupTasks(false);
    // You can also navigate to another screen with the selected taskId or perform other actions
    // Example: navigation.navigate('TaskDetails', { taskId });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handlePress(item._id, item.title, item.category)}
      style={styles.taskItem}>
      <Text style={styles.title}>Title: {item.title}</Text>
      <Text style={styles.progress}>Progress: {item.progress * 100}%</Text>
    </TouchableOpacity>
  );

  const handleCloseModal = () => {
    setShowGroupTasks(false);
  };

  return (
    <ScrollView style={{padding: 20}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'black',
          fontFamily: 'serif',
        }}>
        Create new sub task
      </Text>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
          Add title
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            color: 'black',
            fontFamily: 'serif',
          }}
          value={title}
          onChangeText={setTitle}
          placeholder="Add a short title"
          placeholderTextColor="black"
        />
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
          Select A Group Task
        </Text>
        <TouchableOpacity onPress={() => setShowGroupTasks(true)}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              color: 'black',
              fontFamily: 'serif',
            }}>
            <Text style={{color: colors.black}}>{groupTask?.title}</Text>
          </View>
        </TouchableOpacity>
        {/* <Modal isVisible={showGroupTasks} onBackdropPress={handleCloseModal}>
          <View
            style={{
              backgroundColor: colors.white,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 400,
            }}>
            <ScrollView>
              <View>
                <FlatList
                  data={grouptask}
                  keyExtractor={item => item._id}
                  renderItem={renderItem}
                />
              </View>
            </ScrollView>
          </View>
        </Modal> */}
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
          Add description
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            color: 'black',
            fontFamily: 'serif',
          }}
          value={description}
          onChangeText={setDescription}
          placeholder="Add a description "
          placeholderTextColor="black"
          multiline
        />
      </View>

      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
          Add Fare
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            color: 'black',
            fontFamily: 'serif',
          }}
          value={subTaskFare}
          onChangeText={setSubTaskFare}
          placeholder="Add a sub task fare "
          placeholderTextColor="black"
          multiline
        />
      </View>
      <View
        style={{
          color: 'black',
          fontFamily: 'serif',
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{flex: 1, marginLeft: 5, color: 'black', fontFamily: 'serif'}}>
          <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
            Deadline
          </Text>
          <Button
            title={endDate.toDateString()}
            onPress={showEndDate}
            color="#6146C6"
          />
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </View>
      </View>
      <View
        style={{
          color: 'black',
          fontFamily: 'serif',
          marginVertical: 10,
          flexDirection: 'column',
        }}>
        <Text style={{fontSize: 19, color: 'black', fontFamily: 'serif'}}>
          Select tags
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {allTags.map(renderTag)}
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
          alignItems: 'center',
          color: 'black',
          fontFamily: 'serif',
        }}>
        <Button
          title={isCreating ? 'Creating' : 'Create Sub Task'}
          onPress={handleSubmit}
          color="#6146C6"
          disabled={isCreating}
        />
      </View>

      {/* Attachment Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={attachmentModalVisible}>
        <View style={{marginTop: 22, padding: 20}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'black',
              fontFamily: 'serif',
            }}>
            Attachment Options
          </Text>
          <Button
            title="Pick a File"
            onPress={handleAttachmentPick}
            color="#6146C6"
            fontFamily="serif"
          />
          <Button
            title="Cancel"
            onPress={closeAttachmentModal}
            color="#6146C6"
            fontFamily="serif"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  taskItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 14,
    color: '#666',
  },
});

export default NewSubTaskScreen;
