import React from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'

const Header = () => {
   return (
      <SafeAreaView style={styles.Header}>
         <Image
            source={require("../assets/favicon.png")}
            resizeMode="contain"
            style={{height: 50}}
         />
      </SafeAreaView>
   )
}

export default Header

const styles = StyleSheet.create({
   Header: {
      width: '100%',
      flexDirection: 'row',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center'
   }
})
