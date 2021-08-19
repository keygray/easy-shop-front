import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import Products from '../Screens/Admin/Products'
import Categories from '../Screens/Admin/Categories'
import Orders from '../Screens/Admin/Orders'
import ProductForm from '../Screens/Admin/ProductForm'

const Stack = createStackNavigator()

function MyStack() {
   return (
      <Stack.Navigator>
         <Stack.Screen 
               name='Products'
               component={Products}
               options={{
                  title: "Product",
               }}
         />
         <Stack.Screen 
               name='Categories'
               component={Categories}
               options={{
                  title: "Categories",
               }}
         />
         <Stack.Screen 
               name='Orders'
               component={Orders}
               options={{
                  title: "Orders",
               }}
         />
         <Stack.Screen 
               name='ProductForm'
               component={ProductForm}
               options={{
                  title: "ProductForm",
               }}
         />
      </Stack.Navigator>
   )
}

export default function AdminNavigators() {
   return <MyStack />;
}

