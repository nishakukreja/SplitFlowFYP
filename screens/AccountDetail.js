import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Display } from '../constants/Utils';

const AccountDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.PRIMARY}
        translucent
      />

      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={Colors.White}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Account Details</Text>
        <View>
          <Feather name="bell" size={20} color={Colors.White} />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
      </View>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={require('../assets/images/femalee.png')}
          />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.nameText}>Nisha Kukreja</Text>
          <Text style={styles.emailText}>nishakukreja@gmail.com</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <HeaderAndSubheader header="First Name" subheader="Nisha" />
        <HeaderAndSubheader header="Last Name" subheader="Kukreja" />
        <HeaderAndSubheader header="Email" subheader="nishakukreja@gmail.com" />
        <HeaderAndSubheader header="Phone No" subheader="03127030691" />
        {/* Add more headers and subheaders as needed */}
      </View>
    </View>
  );
};

const HeaderAndSubheader = ({ header, subheader }) => {
  return (
    <View style={styles.detailsRow}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.subheader}>{subheader}</Text>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.PRIMARY,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "serif",
    lineHeight: 20 * 1.1,
    color: Colors.White,
  },
  alertBadge: {
    backgroundColor: Colors.SECONDARY,
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    fontSize: 10,
    fontFamily: "serif",
    lineHeight: 10 * 1.4,
    color: Colors.White,
  },
  profileHeaderContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  profileImageContainer: {
    backgroundColor: Colors.White,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    elevation: 4,
  },
  profileImage: {
    width: Display.setWidth(33),
    height: Display.setWidth(33),
    borderRadius: 32,
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'serif',
    lineHeight: 14 * 1.4,
    color: Colors.White,
  },
  emailText: {
    fontSize: 10,
    fontFamily: 'serif',
    lineHeight: 10 * 1.4,
    color: Colors.White,
  },
  detailsContainer: {
    margin: 20,
  },
  detailsRow: {
    flexDirection: 'column', // Change to column for subheader below header
    alignItems: 'flex-start', // Align to the start for subheader below header
    marginVertical: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
    marginBottom:17,
    marginTop:24,
  
  },
  subheader: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'serif',
    marginTop:-19,
  },
  });

export default AccountDetail;
