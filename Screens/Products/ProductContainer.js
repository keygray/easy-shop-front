import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ProductList from './ProductList'
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import baseUrl from '../../assets/common/baseUrl';
import axios from 'axios';
var { height } = Dimensions.get('window')
// const data = require('../../assets/data/products.json')
//const productsCategories = require('../../assets/data/categories.json')
const ProductContainer = ({navigation}) => {
   const [products, setProducts] = useState([])
   const [productsFiltered, setProductsFiltered] = useState([])
   const [focus, setFocus] = useState()
   const [categories, setCategories] = useState([])
   const [productsCtg, setProductsCtg] = useState([])
   const [active, setActive] = useState()
   const [initialState, setInitialState] = useState([])
   const [loading, setLoading] = useState(true)

   // This hook returns `true` if the screen is focused, `false` otherwise
   // const isFocused = useIsFocused();
   // console.log(isFocused);

   // Diễn ra khi được Focus vào màn hình productContainer
   // useFocusEffect Hữu ích để thực hiện các lệnh gọi API bổ sung khi người dùng truy cập lại một màn hình cụ thể trong Bộ điều hướng tab

   useFocusEffect((
      useCallback(
         () => {
            setFocus(false)
            setActive(-1)
      
            //Products
            axios
               .get(`${baseUrl}products`)
               .then((res) => {
                  setProducts(res.data)
                  setProductsFiltered(res.data)
                  setProductsCtg(res.data)
                  setInitialState(res.data)
                  setLoading(false)
               })
            
      
            // Categories
            axios
               .get(`${baseUrl}categories`)
               .then((res) => {
                  setCategories(res.data)
               })
               .catch((err) => {
                  console.log(err);
               })
      
      
      
            return () => {
               setProducts([])
               setProductsFiltered([])
               setFocus();
               setCategories([])
               setActive()
               //setProductsCtg([])
               setInitialState([])
            }
         }, 
         [],
      )
   ))
   // useEffect(() => {
     
   //    setFocus(false)
   //    setActive(-1)

   //    //Products
   //    axios
   //       .get(`${baseUrl}products`)
   //       .then((res) => {
   //          setProducts(res.data)
   //          setProductsFiltered(res.data)
   //          setProductsCtg(res.data)
   //          setInitialState(res.data)
   //          setLoading(false)
   //       })
      

   //    // Categories
   //    axios
   //       .get(`${baseUrl}categories`)
   //       .then((res) => {
   //          setCategories(res.data)
   //       })
   //       .catch((err) => {
   //          console.log(err);
   //       })



   //    return () => {
   //       setProducts([])
   //       setProductsFiltered([])
   //       setFocus();
   //       setCategories([])
   //       setActive()
   //       //setProductsCtg([])
   //       setInitialState([])
   //    }
   // }, [])


   const searchProduct = (text) => {
      setProductsFiltered(
         products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
      )
   }

   const openList = () => {
      setFocus(true);
   }

   const onBlur = () => {
      setFocus(false);
   }


   // Categoriess
   const changeCtg = (ctg) => {
      {
         ctg === 'all'
            ? [setProductsCtg(initialState), setActive(true)]
            : [
               setProductsCtg(products.filter((i) => i.category._id === ctg)),
               setActive(true)
            ]
      }

   }


   return (

      <>
      {loading == false ? (
         // Đã load dữ liệu xong
         <Container>
         <Header searchBar rounded>
            <Item>
               <Icon name="ios-search" />
               <Input 
                  placeholder="Search" 
                  onFocus = {openList}
                  onChangeText = {(text) => searchProduct(text)}
               />
               { focus ==true ? (
                  <Icon onPress={onBlur} name="ios-close" />
               ) : null}
            </Item>
         </Header>


         {focus== true ? (
            <SearchedProduct navigation={navigation} productsFiltered={productsFiltered} />
         ) : (
            <ScrollView>
               <View>
                     <View>
                        <Banner />
                     </View>

                     <View>
                        <CategoryFilter 
                           categories = {categories}
                           categoryFilter = {changeCtg}
                           productsCtg={productsCtg}
                           active={active}
                           setActive={setActive}
                        />
                     </View>

                     {productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>

                           
                           {productsCtg.map((item) => {
                              return(
                                 <ProductList 
                                 navigation = {navigation}
                                 key={item._id} 
                                 item={item}
                                 />
                              )
                           })}

                        </View>
                     ) : (
                        
                        <View style={[styles.center, {height: height / 2}]}>
                           <Text>No products found</Text>
                        </View>

                     )}

                  
                     
               </View>
            </ScrollView>

            
         )}

      </Container>
      ) : (
         //Loading
         <Container style={[styles.center, {backgroundColor: '#f2f2f2'}]}>
            <ActivityIndicator size="large" color="red" />
         </Container>
      )}
      </>

     
   )
}

export default ProductContainer

const styles = StyleSheet.create({
   container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
   },
   listContainer: {

      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-around",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
   },
   center: {
      justifyContent: 'center',
      alignItems: 'center',
   }
})



