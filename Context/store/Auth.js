import React, { useEffect, useReducer, useState } from "react";
import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import authReducer from "../reducers/Auth.reducer"
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from "./AuthGlobal";


const Auth = (props) => {
   const [stateUser, dispatch] = useReducer(authReducer, {
      isAuthenticated: null,
      user: {}
   })

   // stateUser Nhận lại giá trị của AuthReducer như store redux 
   const [showChild, setShowChild] = useState(false)


   // Theo tự thấy nếu lúc reducer không lấy ra cả userProfile thì chắc cũng không cần phần dưới xử lý để undefined đi
   useEffect(() => {
      setShowChild(true);
      // Trả về dispatch cho stateUser chỉ có giá trị decode ra từ decode jwt để không nhận vào biến userProfile => undefined tránh lộ mật khẩu
      AsyncStorage.getItem("jwt").then((data) => {
         const token = data ? data : "";
         if(showChild) {
            // Truyền đi giá trị lấy ra được khi login tạo json {isAdmin, userId} đÃ truyền về từ backend
            dispatch(setCurrentUser(jwt_decode(token)))
         }
      }).catch((err) => console.log(err))
      return () => {
         setShowChild(false)
      }
   }, [])


   if(!showChild) {
      return null;
   } else {
      return (
         <AuthGlobal.Provider
            value={{
               stateUser,
               dispatch
            }}
         >
            {props.children}
         </AuthGlobal.Provider>
      )
   }
}

export default Auth
