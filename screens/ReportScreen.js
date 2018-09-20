import React from "react";
import { ExpoConfigView } from "@expo/samples";
import ReportPage from "../components/AppComponents/ReportPage";
import { Button } from "react-native-elements";
import { Text, View, StyleSheet } from "react-native";

export default class ReportScreen extends React.Component {
  static navigationOptions = {
    title: "Report Issue"
  };

  render() {
    return (
      <View>
        <Text>Report Issue</Text>
        <Button title='Submit'/>
      </View>
    );
  }
}
