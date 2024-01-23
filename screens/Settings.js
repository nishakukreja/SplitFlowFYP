import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

const Settings = () => {
  const navigation = useNavigation();

  const handleOptionPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    } else {
      // Handle logout or other actions
    }
  };

  const options = [
    { icon: 'edit', title: 'AccountDetail', screen: 'AccountDetail' },
    { icon: 'settings', title: 'Two factor Authentication', screen: 'Two factor Authentication' },
    { icon: 'notifications-on', title: 'Change Password', screen: 'Change Password' },
    { icon: 'sign-out', title: 'Privacy and Policy' , screen: 'Privacy and Policy'},
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center", color: 'black' }}>
          Settings
        </Text>
      </View>
      <View style={styles.options}>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => handleOptionPress(option.screen)}>
            {getOptionIcon(option.icon)}
            <Text style={styles.title}>{option.title}</Text>
            <FontAwesomeIcon name="angle-right" style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getOptionIcon = (iconName) => {
  switch (iconName) {
    case 'edit':
      return <FontAwesomeIcon name={iconName} style={styles.icon} />;
    case 'settings':
      return <IoniconsIcon name={iconName} style={styles.icon} />;
    case 'notifications-on':
      return <MaterialIconsIcon name={iconName} style={styles.icon} />;
    case 'sign-out':
      return <FontAwesomeIcon name={iconName} style={styles.icon} />;
    default:
      return null;
  }
};

const styles = {
  options: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    fontSize: 24,
    color: '#6146C6',
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: 'black',
    fontFamily: 'serif',
  },
  arrow: {
    fontSize: 18,
    color: 'black',
  },
};

export default Settings;