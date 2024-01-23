import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React, {useEffect, useState}from 'react'
import { useNavigation } from '@react-navigation/native'

import SplashImage from "../assets/images/splash.jpg"
import LogoImage from "../assets/images/logo.png"



const Splash = () => {

    const navigation = useNavigation();

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate("Welcome")
      }, 3000);


    }, [])
    



  return (
    <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#FFF"}/>
        <Image
        style={{
            resizeMode:"cover",
            width:"100%",
            height: "100%"
        }}
        source={SplashImage}
        />
        <View style={styles.logoContainer}>
        <Image
        style={{
            resizeMode:"cover",
            width:"100%",
            height: "100%"
        }}
        source={LogoImage}
        />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center"
    },
    logoContainer:{
        width:"100%",
        height:"30%",
        // backgroundColor:"red",
        position:"absolute"
    }
})

export default Splash