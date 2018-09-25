import React from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import { View as GraphicsView } from "expo-graphics";
import { AR, takeSnapshotAsync } from "expo";
import ExpoTHREE, { AR as ThreeAR, THREE } from "expo-three";
export default class ReportScreen extends React.Component {
  static navigationOptions = {
    title: 'Report Issue',
  };
  state = {
    cameraRollUri: null,
    description: '',
    roomNumber: '',
    priority: 'Select Priority',
  }

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

  handleSubmit = () => {
    Alert.alert(
      'Report Submitted',
      '',
      [
        {text: 'OK', onPress: () => {
          this.lookaheadFilter.select(-1);
          this.setState({
            cameraRollUri: null,
            description: '',
            roomNumber: '',
            priority: 'Select Priority',
          })
        }},
      ],
      { cancelable: false }
    )
  }

  onCapture = async () => {
    let result = await takeSnapshotAsync(this._container, {
    format: "png",
    result: "file"
    });
    let self = this;
    this.setState({ cameraRollUri: result });
    };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.roomNumber}
          onChangeText={(roomNumber) => this.setState({roomNumber})}
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="next"
          placeholder="Room Number"
          placeholderTextColor="black"
        />
        <ModalDropdown
          onSelect={(priority) => this.setState({priority})}
          defaultValue={this.state.priority}
          options={['Low', 'Medium', 'High']}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
          dropdownTextStyle={styles.dropdownTextStyle}
          dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
          ref={ (ref) => this.lookaheadFilter = ref}
        />
        <TextInput
          value={this.state.description}
          onChangeText={(description) => this.setState({description})}
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          placeholder="Description"
          placeholderTextColor="black"
        />
        {this.state.cameraRollUri &&
        <Image style={{width: 50, height: 50}} source={{uri: this.state.cameraRollUri}} />}
        <View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.onLogoutPress}>
            <Text style={styles.buttonText} onPress={this.handleSubmit}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.mainCameraContainer}
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

          <View style={{ bottom: 0, height: 60, borderBottomWidth: .5, borderBottomColor: "#d3d3d3"}}>
          <View style={{flex: 1, flexDirection: 'column', backgroundColor: "white" , alignItems: "center"}}>
            <TouchableOpacity style={{position: "absolute", top: -55}} onPress={this.onCapture}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/images/camera.png')} />
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 23
  },
  mainCameraContainer: {
    flex: 1,
    marginTop: 30,
  },
  cameraContainer: {
    flex: 1
  },
  cameraContainer: {
    flex: 1
  },
  dropdown: {
    backgroundColor: "rgba(225,225,225,0.2)",
    borderColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
  },
  dropdownText: {
    color: 'black',
    fontSize: 15,
  },
  dropdownStyle: {
    width: 150,
    height: 116,
  },
  dropdownTextStyle: {
    borderWidth: 0,
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  dropdownTextHighlightStyle: {
    backgroundColor: '#e26811',
    color: 'white'
  },
  label: {
    width: 400,
  },
  input: {
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10
  },
  submitButton: {
     backgroundColor: '#e26811',
     height: 40,
     padding: 10
  },
  buttonText:{
     color: 'white',
     textAlign: 'center'
  }
})
