import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import StartNewScan from "../components/AppComponents/StartNewScan";

export default class ScanScreen extends React.Component {
  static navigationOptions = {
    title: "Scan"
  };

  render() {
    return <StartNewScan />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
