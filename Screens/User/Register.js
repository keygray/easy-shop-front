import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Button, StyleSheet, ToastAndroid } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../../Shared/Form/Input'
import baseUrl from '../../assets/common/baseUrl';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import EasyButton from '../../Shared/StyledComponents/EasyButton'
const Register = (props) => {
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const register = () => {
      if(email == "" || phone == "" || name == "" || password == "" ) {
         setError("Please check to fill Input");
      }

      let user = {
         email,
         phone,
         name,
         password
      }

      axios
         .post(`${baseUrl}users/register`, user)
         .then((res) => {
            if(res.status == 200) {
               Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Registration Succeeded",
                  text2: "Please login into your account"
               })
               setTimeout(() => {
                  props.navigation.navigate("Login")
               }, 500);
            }
         })
         .catch((err) => {
            Toast.show({
               topOffset: 60,
               type: "error",
               text1: "Something went wrong",
               text2: "Please try again"
            })
         })
   }
   return (
      <KeyboardAwareScrollView
         viewIsInsideTabBar={true}
         extraHeight={200}
         enableOnAndroid={true}
      >
         <FormContainer title={"Register"}>
            <Input 
               placeholder={"Email"}
               name={"email"}
               id={"email"}
               value={email}
               onChangeText = {(text) => setEmail(text.toLowerCase())}
            />
            <Input 
               placeholder={"Name"}
               name={"name"}
               id={"name"}
               value={name}
               onChangeText = {(text) => setName(text)}
            />
            <Input 
               placeholder={"Phone"}
               name={"phone"}
               id={"phone"}
               value={phone}
               keyboardType={"numeric"}
               onChangeText = {(text) => setPhone(text)}
            />
            <Input 
               placeholder={"Password"}
               name={"password"}
               id={"password"}
               value={password}
               secureTextEntry={true}
               onChangeText = {(text) => setPassword(text)}
            />
             <View style={styles.buttonGroup}>
               {error ? <Error message={error} /> : null}

               <EasyButton
                  primary
                  large
                  onPress={
                     () => register()
                  }
               >
                  <Text style={{color: "white"}}>Register</Text>
               </EasyButton>
            </View>
            <View>
               <EasyButton
                  secondary
                  large
                  onPress={ () => {
                     props.navigation.navigate("Login");
                  }}
               >
                  <Text style={{color: "white"}}>Back to Login</Text>
               </EasyButton>
            </View>
         </FormContainer>
      </KeyboardAwareScrollView>
   )
}

export default Register

const styles = StyleSheet.create({
   buttonGroup: {
      width: '80%',
      alignItems: 'center'
   },
   middleText: {
      marginBottom: 20,
      alignSelf: 'center'
   }
})
