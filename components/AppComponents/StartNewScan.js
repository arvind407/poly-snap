import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { AR, takeSnapshotAsync } from "expo";
import ExpoTHREE, { AR as ThreeAR, THREE } from "expo-three";
import { View as GraphicsView } from "expo-graphics";
import GoogleVisionService from "../services/GoogleVisionService";
import ApiKeys from "../../constants/ApiKeys";

console.disableYellowBox = true;

export default class StartScan extends Component {
  state = {
    cameraRollUri: null,
    labelText: null
  };

  static navigationOptions = {
    title: "StartNewScan"
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
  };

  setTextContent(data) {
    this.setState({
      labelText: data
    });
  }

  onCapture = async () => {
    let result = await takeSnapshotAsync(this._container, {
      format: "png",
      result: "base64"
    });

    let self = this;

    this.setState({ cameraRollUri: result });

    GoogleVisionService.postImageAnalysis(
      {
        requests: [
          {
            image: {
              content: this.state.cameraRollUri
            },
            features: [
              {
                type: "OBJECT_LOCALIZATION",
                maxResults: 10
              }
            ]
          }
        ]
      },
      ApiKeys.GoogleVisionAPIKey
    ).then(function(data) {
      console.log(data);
      self.setTextContent(data);
    });
  };

  render() {
    return (
      <View
        style={styles.mainContainer}
        collapsable={false}
        ref={e => {
          this._container = e;
        }}
      >
        <GraphicsView
          style={styles.cameraContainer}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          isArCameraStateEnabled
          arTrackingConfiguration={AR.TrackingConfigurations.World}
        />
        <View
          style={{
            position: "absolute",
            button: 0,
            paddingTop: 450
          }}
        >
          {this.state.labelText && <Text>{this.state.labelText}</Text>}
          <View>
            <TouchableOpacity onPress={this.onCapture}>
              <Text style={styles.button}>Capture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  cameraContainer: {
    flex: 1
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    borderWidth: 1,
    padding: 5,
    borderColor: "black",
    fontWeight: "bold",
    fontSize: 15,
    borderColor: "#F5FCFF",
    borderRadius: 10,
    borderWidth: 1
  }
});
