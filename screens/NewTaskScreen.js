import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Modal, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';

const tagsData = [
  { name: "IT", color: "#7071E8", icon: "desktop" },
  { name: "Construction", color: "#638889", icon: "building" },
  { name: "Wedding", color: "#C21292", icon: "heart" },
  { name: "Assignments", color: "#F4CE19", icon: "book" },
  { name: "Designing", color: "#65B741", icon: "pencil" },
  { name: "Event Planning", color: "#864AF9", icon: "calendar" },
  { name: "Others", color: "#6895D2", icon: "ellipsis-h" },
];

const statuses = ["To Do", "In Progress", "Completed"];

const NewTaskScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTags, setSelectedTags] = useState([]);
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

      // Handle the selected file, you can store it in the state or process it as needed
      console.log(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error("Error picking file", err);
      }
    }
  };

  const handleTagPress = (tag) => {
    if (selectedTags.includes(tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.name));
    } else {
      setSelectedTags([...selectedTags, tag.name]);
    }
  };

  const renderTag = (tag) => {
    const tagWidth = tag.name.length * 8 + 60;

    return (
      <Text
        key={tag.name}
        style={{
          color: selectedTags.includes(tag.name) ? "white" : tag.color,
          fontFamily: 'serif',
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          margin: 5,
          backgroundColor: selectedTags.includes(tag.name) ? "#6146C6" : "transparent",
          flexWrap: "wrap",
          width: tagWidth,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => handleTagPress(tag)}
      >
        <Icon name={tag.icon} size={15} color={selectedTags.includes(tag.name) ? "white" : tag.color} style={{ marginRight: 10 }} />
        {tag.name}
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
    };
    console.log(newTask);
    navigation.navigate('DoneTask');
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: 'black', fontFamily: 'serif' }}>
        Create new task
      </Text>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'serif' }}>Add title</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, color: 'black', fontFamily: 'serif' }}
          value={title}
          onChangeText={setTitle}
          placeholder="Add a short title"
          placeholderTextColor="black"
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'serif' }}>Add description</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, color: 'black', fontFamily: 'serif' }}
          value={description}
          onChangeText={setDescription}
          placeholder="Add a description "
          placeholderTextColor="black"
          multiline
        />
      </View>
      <View style={{ color: 'black', fontFamily: 'serif', marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={{ fontSize: 18, color: 'black', fontFamily: 'serif' }}>Start</Text>
          <Button title={startDate.toDateString()} onPress={showStartDate} color="#6146C6" />
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
        <View style={{ flex: 1, marginLeft: 5, color: 'black', fontFamily: 'serif' }}>
          <Text style={{ fontSize: 18, color: 'black', fontFamily: 'serif' }}>End</Text>
          <Button title={endDate.toDateString()} onPress={showEndDate} color="#6146C6" />
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
      <View style={{ color: 'black', fontFamily: 'serif', marginVertical: 10, flexDirection: 'column' }}>
        <Text style={{ fontSize: 19, color: 'black', fontFamily: 'serif' }}>Select categories</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {tagsData.map(renderTag)}
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'serif' }}>Attachments</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderStyle: "dashed",
            padding: 20,
            alignItems: "center",
          }}
          onPress={openAttachmentModal}
        >
          <Text style={{ color: 'black', fontFamily: 'serif' }}>Drag and drop files here or browse</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10, alignItems: "center", color: 'black', fontFamily: 'serif' }}>
        <Button title="Create Task" onPress={handleSubmit} color="#6146C6" />
      </View>

      {/* Attachment Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={attachmentModalVisible}
      >
        <View style={{ marginTop: 22, padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', fontFamily: 'serif' }}>Attachment Options</Text>
          <Button title="Pick a File" onPress={handleAttachmentPick} color="#6146C6" fontFamily='serif' />
          <Button title="Cancel" onPress={closeAttachmentModal} color="#6146C6"  fontFamily='serif'/>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default NewTaskScreen;
