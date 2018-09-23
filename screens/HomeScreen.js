import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from "react-native";
import { AR, takeSnapshotAsync } from "expo";
import ExpoTHREE, { AR as ThreeAR, THREE } from "expo-three";
import { View as GraphicsView } from "expo-graphics";
import Login from "../components/AppComponents/Login";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <KeyboardAvoidingView behavior="padding">
            <View>
              <Login />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});
