import React, { Component } from "react";
import {
  Alert,
  FlatList,
  ListView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

export default class RoomStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Room Number", "Room Name", "Status"],
      tableData: [
        ["212", "1 King Bed", "Completed"],
        ["213", "1 Queen Bed", "Pending"],
        ["214", "2 Double Bed", "Pending"],
        ["215", "1 King Suite", "In Progress"]
      ]
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.headText}
          />
          <Rows data={state.tableData} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { width: 350, padding: 16, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  headText: { fontWeight: "700", textAlign: 'center' },
  text: { margin: 6, textAlign: 'center'}
});
