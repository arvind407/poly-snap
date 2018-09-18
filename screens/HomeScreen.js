import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Expo from "expo";
import { createStackNavigator } from "react-navigation";
import Home from "../components/AppComponents/Home";
import StartScan from "../components/AppComponents/StartScan";
import UploadReferences from "../components/AppComponents/UploadReferences";
import OpenReferences from "../components/AppComponents/OpenReferences";
import About from "../components/AppComponents/About";
import StartNewScan from "../components/AppComponents/StartNewScan";

const ScanApp = createStackNavigator(
  {
    Home: { screen: Home },
    StartScan: { screen: StartScan },
    UploadReferences: { screen: UploadReferences },
    OpenReferences: { screen: OpenReferences },
    StartNewScan: { screen: StartNewScan }
  },
  {
  }
);

export default class HomeScreen extends React.Component {
  render() {
    return <ScanApp />;
  }
}
