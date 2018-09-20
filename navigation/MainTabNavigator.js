import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ScanScreen from "../screens/ScanScreen";
import ReportScreen from "../screens/ReportScreen";
import AboutScreen from "../screens/AboutScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const ScanStack = createStackNavigator({
  Links: ScanScreen
});

ScanStack.navigationOptions = {
  tabBarLabel: "StartScan",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-reverse-camera"} />
  )
};

const ReportStack = createStackNavigator({
  Report: ReportScreen
});

ReportStack.navigationOptions = {
  tabBarLabel: "Report Issue",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-bug${focused ? "" : "-outline"}`
          : "ios-bug"
      }
    />
  )
};

const AboutStack = createStackNavigator({
  About: AboutScreen
});

AboutStack.navigationOptions = {
  tabBarLabel: "About",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-settings"} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ScanStack,
  ReportStack,
  AboutStack
});
