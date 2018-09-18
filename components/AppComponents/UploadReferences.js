import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CameraRollPicker from "react-native-camera-roll-picker";

export default class UploadReferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    };
  }

  static navigationOptions = {
    title: "UploadReferences"
  };

  getImages(images) {
    this.setState({ num: images.length });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.num}
        <Text style={styles.textstyle}> Images Selected </Text>
        <Text>This is</Text>
        <CameraRollPicker callback={this.getImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  }
});
