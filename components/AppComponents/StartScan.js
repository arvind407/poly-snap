import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AR, takeSnapshotAsync } from "expo";
import ExpoTHREE, { AR as ThreeAR, THREE } from "expo-three";
import { View as GraphicsView } from "expo-graphics";

console.disableYellowBox = true;

export default class StartScan extends Component {
  static navigationOptions = {
    title: "StartScan"
  };

  onContextCreate = ({ gl, scale: pixelRatio, width, height }) => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);

    //initialize renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height
    });

    //initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);

    //initialize camera
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
  };

  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    this.renderer.render(this.scene, this.camera);
    console.log(this.camera);
    if (this.camera) {
      this.camera.takePictureAsync().then(data => console.log(data));
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GraphicsView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          isArRunningStateEnabled
          isArCameraStateEnabled
          arTrackingConfiguration={AR.TrackingConfigurations.World}
        />
        <Button title="Capture" onPress={this.onCapture} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
