import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {allowedAddresses} from '../IPConfig';
import {createTask} from '../redux/actionTypes/action';

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

const NewTaskScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {userAuthToken} = useSelector(state => state.user);
  var {categories, categoriesTemp} = useSelector(state => state.categories);

  console.log(categories);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
    setSelectedCategory(tag._id);
  };

  const renderTag = tag => {
    const tagWidth = tag.title.length * 8 + 50;

    return (
      <Text
        key={tag.name}
        style={{
          color: selectedCategory === tag._id ? 'white' : 'black',
          fontFamily: 'serif',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 5,
          backgroundColor:
            selectedCategory === tag._id ? '#6146C6' : 'transparent',
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

  const handleSubmit = () => {
    const newTask = {
      title,
      description,
      startDate,
      endDate,
      tags: selectedTags,
      status,
      attachments,
      category: selectedCategory,
    };

    // Dispatch the action to save the created task to Redux
    dispatch(createTask(newTask));

    const bodyData = {
      title,
      description,
      category: selectedCategory,
      deadline: endDate,
    };

    createGroupTaskApi(bodyData);

    // Clear form after submission
    setTitle('');
    setDescription('');
    setSelectedCategory('');
    setEndDate(new Date());
    setStartDate(new Date());
  };

  const createGroupTaskApi = async bodyData => {
    try {
      setIsCreating(true);
      const apiResponse = await axios.post(
        `${allowedAddresses.ip}/group-task/create-group-task`,
        bodyData,
        {
          headers: {
            authorization: `Bearer ${userAuthToken}`,
          },
        },
      );

      console.log('on success create: ', apiResponse.data);
      Alert.alert('Group Task Success', apiResponse.data.message);
      setIsCreating(false);
    } catch (error) {
      console.log('error in group task create: ', error);
      setIsCreating(false);
    }
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
        Create new task
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
      <View
        style={{
          color: 'black',
          fontFamily: 'serif',
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, marginRight: 5}}>
          <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
            Start
          </Text>
          <Button
            title={startDate.toDateString()}
            onPress={showStartDate}
            color="#6146C6"
          />
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={handleStartDateChange}
            />
          )}
        </View>
        <View
          style={{flex: 1, marginLeft: 5, color: 'black', fontFamily: 'serif'}}>
          <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
            End
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
          Select categories
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {categories.map(renderTag)}
        </View>
      </View>
      <View style={{color: 'black', fontFamily: 'serif', marginVertical: 10}}>
        <Text style={{fontSize: 19, color: 'black', fontFamily: 'serif'}}>
          Select status
        </Text>
        {statuses.map((statusOption, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setStatus(statusOption)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor:
                status === statusOption ? '#6146C6' : 'transparent',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
              {statusOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18, color: 'black', fontFamily: 'serif'}}>
          Add Attachments
        </Text>
        <Button
          title="Pick File"
          onPress={openAttachmentModal}
          color="#6146C6"
        />
        <Modal
          visible={attachmentModalVisible}
          transparent={true}
          animationType="slide">
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
              <Text style={{fontSize: 18, marginBottom: 10}}>
                Select an Attachment
              </Text>
              <Button
                title="Pick a file"
                onPress={handleAttachmentPick}
                color="#6146C6"
              />
              <Button
                title="Close"
                onPress={closeAttachmentModal}
                color="red"
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={{marginVertical: 10, alignItems: 'center'}}>
        <Button
          title={isCreating ? 'Creating...' : 'Create Task'}
          onPress={handleSubmit}
          color="#6146C6"
          disabled={isCreating}
        />
      </View>
    </ScrollView>
  );
};

export default NewTaskScreen;
