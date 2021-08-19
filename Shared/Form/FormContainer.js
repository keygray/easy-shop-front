import React from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'


const {width, height} = Dimensions.get("window");
const FormContainer = (props) => {
   return (
      <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.title}>{props.title}</Text>
         {props.children}
      </ScrollView>
   )
}



export default FormContainer


const styles = StyleSheet.create({
   container: {
      marginTop: 30,
      marginBottom: 400,
      width: width,
      justifyContent: 'center',
      alignItems: 'center'
   },
   title: {
      fontSize: 30
   }
})
