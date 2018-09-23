import React, { Component } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import RoomStatus from "./RoomStatus";
import { WebBrowser } from "expo";

export default class Login extends Component {
  state = {
    loginPendingStatus: true
  };

  render() {
    const { loginPendingStatus } = this.state;
    return (
      <View>
        {loginPendingStatus && (
          <View style={styles.formContainer}>
            <View style={styles.welcomeContainer}>
              <Image
                source={require("../../assets/images/choice-hotels.png")}
                style={styles.welcomeImage}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email"
              />

              <TextInput
                style={styles.input}
                returnKeyType="go"
                ref={input => (this.passwordInput = input)}
                placeholder="Password"
              />

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onLoginPress}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.helpContainer}>
              <TouchableOpacity
                onPress={this._openChoiceHotels}
                style={styles.helpLink}
              >
                <Text style={styles.helpLinkText}>About, Choice Hotels!</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!loginPendingStatus && (
          <View>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeUserText}> Welcome Arvind</Text>
              <Image
                source={require("../../assets/images/robot-prod.png")}
                style={styles.welcomeUserImage}
              />
            </View>
            <View>
              <RoomStatus />
            </View>

            <View>
              <TouchableOpacity
                style={styles.buttonLogoutContainer}
                onPress={this.onLogoutPress}
              >
                <Text style={styles.buttonText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }

  onLoginPress = event => {
    this.setState({ loginPendingStatus: false });
  };

  onLogoutPress = event => {
    this.setState({ loginPendingStatus: true });
  };

  _openChoiceHotels = () => {
    WebBrowser.openBrowserAsync("https://www.choicehotels.com");
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10
  },
  formContainer: {
    width: 300
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  buttonLogoutContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  welcomeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  welcomeImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  welcomeUserText: {
    fontWeight: "900"
  },
  welcomeUserImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginTop: 10
  },
  helpContainer: {
    paddingTop: 10,
    alignItems: "center"
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
