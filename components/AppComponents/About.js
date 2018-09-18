import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class About extends Component {
  static navigationOptions = {
    title: "About"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> About </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    height: 500
  }
});
