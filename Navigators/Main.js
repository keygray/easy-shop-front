import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigators";
import CartIcon from "../Screens/Cart/CartIcon";
import UserNavigator from "./UserNavigator";
import AdminNavigators from "./AdminNavigators";
import AuthGlobal from "../Context/store/AuthGlobal";


const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
            headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
         headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigators}
          options={{
          headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : null}
        
        {/* <Tab.Screen
          name="Admin"
          component={AdminNavigators}
          options={{
          headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        /> */}

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
         headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;