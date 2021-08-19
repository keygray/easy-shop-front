import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { loginUser } from '../../Context/actions/Auth.actions'
import AuthGlobal from '../../Context/store/AuthGlobal'
import Error from '../../Shared/Error'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
const Login = (props) => {
   const context = useContext(AuthGlobal)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')


   useEffect(() => {
      if(context.stateUser.isAuthenticated === true) {
         props.navigation.navigate("User Profile")
      }
   }, [context.stateUser.isAuthenticated])

   const handleSubmit = () => {
      const user = {
         email,
         password
      }
      if(email === "" || password === "") {
         setError("Please check to fill Input");
      } else {
         loginUser(user, context.dispatch)
      }
   }
   return (
      <FormContainer title={'Login'}>
         <Input 
            placeholder={"Email"}
            name={"email"}
            id={"email"}
            value={email}
            onChangeText = {(text) => setEmail(text)}
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
                  () => handleSubmit()
               } 
            >
               <Text style={{color: "white"}}>Login</Text>
            </EasyButton>
         </View>
         <View style={[{marginTop: 40},styles.buttonGroup]}>
            <Text style={styles.middleText}>Don't have an account yet?</Text>

            <EasyButton
               secondary
               large
               onPress={ () => {
                  props.navigation.navigate("Register");
               }}
            >
               <Text style={{color: "white"}}>Register</Text>
            </EasyButton>
         </View>
      </FormContainer>
   )
}

export default Login



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
