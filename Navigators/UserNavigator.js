import React, { useContext } from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';
import AuthGlobal from "../Context/store/AuthGlobal";

const Stack = createStackNavigator()

function MyStack() {
   const context = useContext(AuthGlobal);
   return (
      <Stack.Navigator>


      {context.stateUser.isAuthenticated ? (
         <Stack.Screen 
               name='User Profile'
               component={UserProfile}
               options={{
                  headerShown: false,
               }}
         />
   
      ) : (
         <Stack.Screen 
            name='Login'
            component={Login}
            options={{
               headerShown: false,
            }}
         />

      )}

         <Stack.Screen 
               name='Register'
               component={Register}
               options={{
                  headerShown: false,
               }}
         />
         
      </Stack.Navigator>
   )
}

export default function UserNavigator() {
   return <MyStack />;
}