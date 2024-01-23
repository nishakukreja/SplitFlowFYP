// Custominput.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Custominput = ({ control, name, rules = {}, placeholder, secureTextEntry, iconName }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : 'black' }]}>
            {iconName && (
              <MaterialCommunityIcons name={iconName} size={24} color="black" style={styles.icon} />
            )}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="black"
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={!isPasswordVisible && secureTextEntry}
            />
            {secureTextEntry && ( // Only show the eye icon for secureTextEntry (password) fields
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <MaterialCommunityIcons
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
          {error && <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    borderColor: 'black',
    borderWidth: 0.3,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});

export default Custominput;
