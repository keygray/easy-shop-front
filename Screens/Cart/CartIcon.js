import { Badge } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
const CartIcon = (props) => {
   return (
      <>
         {props.cartItems.length ? (
            <Badge style={styles.badge}>
               <Text style={styles.text}>{props.cartItems.length}</Text>
            </Badge>
         ) : null}
      </>
   )
}

const mapStateToProps = (state) => {
   const {cartItems} = state;
   return {
      cartItems: cartItems
   }
}

export default connect(mapStateToProps, null) (CartIcon)


const styles = StyleSheet.create({
   badge: {
      width: 26,
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      top: -4,
      right: -15
   },
   text: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white'
   }
})
