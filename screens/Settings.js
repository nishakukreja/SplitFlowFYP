import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

const Settings = () => {
  const navigation = useNavigation();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleOptionPress = (screen) => {
    if (screen === 'TwoFactorAuthentication') {
      setIs2FAEnabled(true);
    }
    if (screen) {
      navigation.navigate(screen, { is2FAEnabled });
    } else {
     
    }
  };

  const options = [
    { icon: 'edit', title: 'AccountDetail', screen: 'AccountDetail' },
    { icon: 'settings', title: 'Two Factor Authentication', screen: 'TwoFactorAuthentication' },
    { icon: 'credit-card', title: 'Payment', screen: 'PaymentScreen' },
    { icon: 'privacy-tip', title: 'Privacy and Policy' , screen: 'PrivacyAndPolicy'},
    { icon: 'edit', title: 'EditProfile', screen: 'EditProfile' },
    { icon: 'notifications-on', title: 'Notification', screen: 'Notification' },
    { icon: 'sign-out', title: 'Logout' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
        <Text style={styles.headerText}>
          Settings
        </Text>
      </View>
      <View style={styles.options}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handleOptionPress(option.screen)}
          >
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
      return <MaterialIconsIcon name={iconName} style={styles.icon} />;
    case 'credit-card':
      return <FeatherIcon name={iconName} style={styles.icon} />;
    case 'privacy-tip':
      return <MaterialIconsIcon name={iconName} style={styles.icon} />;
    case 'notifications-on':
      return <MaterialIconsIcon name={iconName} style={styles.icon} />;
    case 'sign-out':
      return <FontAwesomeIcon name={iconName} style={styles.icon} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
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
  },
  arrow: {
    fontSize: 18,
    color: 'black',
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: 'black',
  },
});

export default Settings;
