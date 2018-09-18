import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Icon name="report-problem" size={30} color="#4F8EF7" onPress={() => navigate("StartNewScan")} />
        <Icon name="camera-alt" size={30} color="#4F8EF7" onPress={() => navigate("StartNewScan")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    height: 500
  },
});
