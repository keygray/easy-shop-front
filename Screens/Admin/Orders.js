import React, { useState, useCallback} from "react"
import { View, FlatList, Text} from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"

import OrderCard from "../../Shared/OrderCard"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Orders = (props) => {

    const [orderList, setOrderList] = useState();

    useFocusEffect(
        useCallback(
            () => {
                getOrders();
            return () => {
                setOrderList();
            }
            },
            [],
        )
    )


    const getOrders = () => {
        AsyncStorage.getItem("jwt")
        .then((res) => {
            axios
            .get(`${baseURL}orders`,{
                headers: { Authorization: `Bearer ${res}` },
            })
            .then((x) => {
                setOrderList(x.data);
            })
            .catch((error) => console.log(error))
        })
        
    }

    return (
        <View>
            <FlatList 
                data={orderList}
                renderItem={({ item }) => (
                    <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Orders;