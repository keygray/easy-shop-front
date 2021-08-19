
import React, { useEffect, useState } from "react"
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet 
} from "react-native"
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { add } from "react-native-reanimated";
import Toast from 'react-native-toast-message';

var { width } = Dimensions.get("window")

const Item = (props) => {
   return (
      <View style={styles.item}>
         <Text>{props.item.name}</Text>
         <EasyButton
            danger
            medium
            onPress={() => {
               props.delete(props.item._id)
               Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: "Delete Success",
                  text2: `${props.item.name} be deleted`
               })
            }}
         >
            <Text style={{color: "white", fontWeight: "bold"}}>Delete</Text>
         </EasyButton>
      </View>
   )
}


const Categories = () => {
   const [categories, setCategories] = useState([])
   const [categoryName, setCategoryName] = useState();
   const [token, setToken] = useState();

   useEffect(() => {
      AsyncStorage.getItem("jwt")
         .then((res) => {
            setToken(res)
         })
         .catch((err) => console.log("Admin Categories:" + err));
      

      axios.get(`${baseURL}categories`)
         .then((res) => {
            setCategories(res.data)
         })
         .catch((err) => console.log(err));
      return () => {
         setCategories([]);
         setToken();
      }
   }, [])


   const addCategory = () => {
      if(categoryName) {
         const category = {
            name: categoryName
         }
   
         const config = {
            headers: {Authorization: `Bearer ${token}`}
         }
   
         axios.post(`${baseURL}categories`,category,config)
         .then((res) => setCategories([...categories, res.data]))
         .catch((err) => alert("Error to add category" + err));
   
         setCategoryName("");
      } else {
         Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Don't exist category name",
            text2: ""
         });
      }
   }


   const deleteCategory = (id) => {
      const config = {
         headers: {Authorization: `Bearer ${token}`}
      };

      axios.delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
         const newCategories =  categories.filter((i) => i._id !== id);
         setCategories(newCategories);
      })
      .catch((err) => alert("Something wrong!!!" + err))
   }

   return (
      <View style={{position: "relative", height: "100%"}}>
         <View style={{marginBottom: 60}}>
            <FlatList 
               data={categories}
               renderItem={({item, index}) => (
                  <Item key={index} item={item} delete={deleteCategory} />
               )}
            />
         </View>
         <View style={styles.bottomBar}>
            <View>
               <Text>Add Category</Text>
            </View>
            <View style={{width: width / 2.5}}>
               <TextInput 
                  value={categoryName}
                  style={styles.input}
                  onChangeText={(text) => setCategoryName(text)}
               />
            </View>
            <View>
               <EasyButton
                  medium
                  primary
                  onPress={() => addCategory()}
               >
                  <Text style={{color: "white", fontWeight: "bold"}}>Submit</Text>
               </EasyButton>
            </View>
         </View>
      </View>
   )
}

export default Categories


const styles = StyleSheet.create({
   bottomBar: {
      backgroundColor: "white",
      width: width,
      height: 60,
      padding: 2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: "absolute",
      bottom: 0,
      left: 0
   },
   input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1
   },
   item: {
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 1,
      padding: 5,
      margin: 5,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
   }
})
