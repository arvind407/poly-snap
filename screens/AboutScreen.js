import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return <ExpoConfigView />;
  }
}
