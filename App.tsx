import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
} from "react-native-paper";
import Chart from "./Components/chart";

export default function App() {
  const [Token, setToken] = useState<string | null>("");
  const [text, settext] = useState("");
  if (Token == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={Colors.blueGrey300}
        />
      </View>
    );
  } else if (Token == "") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: "#eee",
        }}
      >
        <TextInput
          mode="outlined"
          value={text}
          onChangeText={(t) => settext(t)}
          label="Token"
          theme={{
            colors: {
              primary: "darkslategrey",
            },
          }}
        />
        <Button
          style={{ marginVertical: 10 }}
          mode="contained"
          onPress={() => setToken(text)}
          theme={{
            colors: {
              primary: "darkslategrey",
            },
          }}
        >
          Done
        </Button>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "azure",
          marginBottom: 10,
          marginHorizontal: 6,
        }}
      >
        Admin
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "azure",
          marginBottom: 5,
          marginHorizontal: 16,
          alignSelf: "flex-start",
        }}
      >
        Last 7 days activities
      </Text>
      <Chart label="Logins" name="Login" Token={Token} />
      <Chart label="App Opened" name="open" Token={Token} />
      <Chart label="Post Saved" name="save_feed" Token={Token} />
      <Chart label="Post UnSaved" name="remove_feed" Token={Token} />
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingTop: 45,
  },
});
