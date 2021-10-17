import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context/TokenContext";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [text, settext] = useState("");
  const { Key, setKey }: any = useContext(Context);
  useEffect(() => {
    getValueFor();
  }, []);
  async function save(value: string) {
    await SecureStore.setItemAsync("Token", value);
  }

  async function getValueFor() {
    let result = await SecureStore.getItemAsync("Token");
    if (result) {
      setKey(result);
    } else {
      setKey("");
    }
  }
  if (Key == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={Colors.blueGrey300}
        />
      </View>
    );
  }
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
        onPress={() =>
          save(text)
            .then(() => setKey(text))
            .catch((e) => console.log(e))
        }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 45,
  },
});
