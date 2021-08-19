import { Body, Left, ListItem, Right, Thumbnail } from 'native-base'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CartItem = (props) => {
   //Chỗ này phải lấy dữ liệu qua item.item vì khi sử dụng renderItem của SwipeListView
   // Sẽ trả về các object được cấu trúc là "Tên prop" (Ở đây là Item) và thành phần cố định của renderItem chứa giá trị truyền vào đó là Item => "Tên prop": { item : {Giá trị}}


   const data = props.item.item.product
   const [quantity, setQuantity] = useState(props.item.item.quantity)

  
   return (
      <ListItem
         style={styles.listItem}
         key={Math.random()}
         avatar
      >
         <Left>
            <Thumbnail 
               source={{uri: data.image ? data.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
            />
         </Left>
         <Body style={styles.body}>
            <Left>
               <Text>{data.name}</Text>
            </Left>
            <Right>
               <Text>$ {data.price}</Text>
            </Right>
         </Body>
      </ListItem>
   )
}

export default CartItem




const styles = StyleSheet.create({
   listItem: {
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center'
   },
   body: {
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row'
   },
})
