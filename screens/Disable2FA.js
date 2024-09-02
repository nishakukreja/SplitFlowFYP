import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Custombutton from '../components/Custombutton'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setCurrentUser, setCurrentUserAuthToken } from '../redux/slices/UserSlice'
import { allowedAddresses } from '../IPConfig'

const Disable2FA = () => {
    
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
  const {currentUser, userAuthToken} = useSelector((state)=>state.user);

  const [loading, setLoading] = useState(false);

const getUserDataAndUpdateRedux = async()=>{
    console.log("currentUser: ". currentUser)
      try {
        const apiResponse = await axios.get(`${allowedAddresses.ip}/user/get-profile/${currentUser.userId}`, {
          headers:{
            authorization: `Bearer ${userAuthToken}`
          }
        })
  
        .then(onSuccess=>{
          console.log("on success: ", onSuccess.data.data);
          console.log("redux updated before: ", currentUser.isTwoFactorEnabled)
  
          dispatch(setCurrentUser(apiResponse?.data?.data))
          console.log("redux updated after: ", currentUser.isTwoFactorEnabled)
        })
        .catch(onError=>{
          console.log("on error: ", onError.response.data.statusCode);
          if(onError.response.data.statusCode == 401){
            Alert.alert("2FA Verification Error", onError.response.data.message);
          }
          
          if(onError.response.data.statusCode == 400){
            Alert.alert("2FA Verification Error", onError.response.data.message);
          }
        })
  
  
      } catch (error) {
        console.log("error in sending otp verification for 2fa: ", error);
      }
    }
  
    const disable2FA = async()=>{
        try {
            setLoading(true);
          const apiResponse = await axios.post(`${allowedAddresses.ip}/user/change-2fa-status`, {
            isTwoFactorEnabled:false,
          }, {
            headers:{
              authorization: `Bearer ${userAuthToken}`
            }
          })
    
          .then(onSuccess=>{
            console.log("on success: ", onSuccess.data);
            // Alert.alert("2FA Verification", onSuccess.data.message);
            getUserDataAndUpdateRedux();
            setLoading(false);
            navigation.navigate('Settings');
          })
          .catch(onError=>{
            console.log("on error: ", onError.response.data);
            setLoading(false);

          })
    
    
        } catch (error) {
          console.log("error in sending otp verification for 2fa: ", error);
          setLoading(false);

        }
      }
  return (
    <View>
      <TouchableOpacity>
        <Text>Disable 2FA</Text>
      </TouchableOpacity>

      <Custombutton
        text={loading ? 'Loading...' : 'Disable 2FA'}
        onPress={disable2FA}
        style={{marginVertical: 50}}
      />
    </View>
  )
}

export default Disable2FA

const styles = StyleSheet.create({})