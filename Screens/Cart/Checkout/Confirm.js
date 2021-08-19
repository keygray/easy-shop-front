import { Body,  Left, ListItem, Right, Thumbnail } from 'native-base'
import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions,Button } from 'react-native'
import {connect} from "react-redux"
import * as actions from '../../../Redux/Actions/cartActions'
import Toast from 'react-native-toast-message';

import axios from "axios";
import baseUrl from '../../../assets/common/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
var {height, width} = Dimensions.get("window")
const Confirm = (props) => {
   const finalOrder = props.route.params
   const confirmOrder = () => {
      const order = finalOrder.order.order;

      AsyncStorage.getItem("jwt")
      .then((res) => {
         axios
         .post(`${baseUrl}orders`, order, {
            headers: { Authorization: `Bearer ${res}` },
         })
         .then((res) => {
            if(res.status == 200 || res.status == 201) {
               Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Order Completed",
                  text2: "",
               })
               setTimeout(() => {
                  props.clearCart();
                  props.navigation.navigate("Cart")
               }, 500)
            } 
         })
         .catch((err) => {
            Toast.show({
               topOffset: 60,
               type: "error",
               text1: "Something went wrong",
               text2: "Pls try again",
            })
         })
      })




   }
   return (
      <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.titleContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Confirm Order</Text>
         </View>
         {props.route.params ? 
         <View style={{fontSize:20, fontWeight: 'bold', borderWidth: 1, borderColor: 'orange'}}>
               <Text style={styles.title}>Shipping to:</Text>
               <View style={{padding: 8}}>
                  <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                  <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                  <Text>City: {finalOrder.order.order.city}</Text>
                  <Text>Zip code: {finalOrder.order.order.zip}</Text>
                  <Text>Country: {finalOrder.order.order.country}</Text>
               </View>
               <Text style={styles.title}>Items:</Text>
               {finalOrder.order.order.orderItems.map((x, index) => {
                  return (
                     <ListItem style={styles.ListItem} key={index} avatar>
                        <Left>
                           <Thumbnail source={{uri: x.product.image}} />
                        </Left>
                        <Body style={styles.body}>
                           <Left>
                              <Text>{x.product.name}</Text>
                           </Left>
                           <Right>
                              <Text>$ {x.product.price}</Text>
                           </Right>
                        </Body>
                     </ListItem>
                  )
               })}
         </View>
         : null}

         <View style={{alignItems: 'center', margin: 20}}>
            <Button title={'place order'} onPress={confirmOrder} />
         </View>
      </ScrollView>
   )
}


const mapDispatchtoProps = (dispatch) => {
   return {
      clearCart: () => {
         dispatch(actions.clearCart())
      }
   }
}


export default connect(null, mapDispatchtoProps) (Confirm)


const styles = StyleSheet.create({
   container: {
      height: height,
      padding: 8,
      alignContent: 'center',
      backgroundColor: 'white'
   },
   titleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 8,
   },
   title: {
      alignSelf: 'center',
      margin: 8,
      fontSize: 16
   },
   body: {
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row'
   },
   listItem: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      width: width/1.2
   }
})
