import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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
          marginHorizontal: 20,
        }}
      >
        <TextInput
          mode="outlined"
          value={text}
          onChangeText={(t) => settext(t)}
          label="Token"
        />
        <Button
          style={{ marginVertical: 10 }}
          mode="contained"
          onPress={() => setToken(text)}
        >
          Done
        </Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Chart name="Login" Token={Token} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
