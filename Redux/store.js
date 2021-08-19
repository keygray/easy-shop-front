import { createHistogram, applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import cartItems from "./Reducers/cartItem";

const reducers = combineReducers({
   //cartReducer
   cartItems
})

const store = createStore(
   reducers,
   composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;