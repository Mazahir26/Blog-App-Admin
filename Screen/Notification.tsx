import React, { useState, useContext } from "react";
import { Context } from "../Context/TokenContext";
import { View, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import config from "../Components/config";
const Axios = axios.create({
  baseURL: config.BaseUrl,
});
export default function Notification() {
  const [text, settext] = useState("");
  const { Key }: any = useContext(Context);

  async function SendNotif() {
    if (text.length < 3) return;
    try {
      await Axios.post(
        "send/notification",
        {
          title: text,
        },
        {
          headers: {
            Authorization: `Token ${Key}`,
          },
        }
      );
      ToastAndroid.show("Sent Successfully", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show(e, ToastAndroid.LONG);
    }
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
        label="Send Notification"
        theme={{
          colors: {
            primary: "darkslategrey",
          },
        }}
      />
      <Button
        style={{ marginVertical: 10 }}
        mode="contained"
        onPress={() => SendNotif()}
        theme={{
          colors: {
            primary: "darkslategrey",
          },
        }}
      >
        Send
      </Button>
    </View>
  );
}
