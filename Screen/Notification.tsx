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
  const [loading, setloading] = useState(false);

  async function SendNotif() {
    if (text.length < 3) {
      ToastAndroid.show("Message is too short", ToastAndroid.SHORT);
      return;
    }
    try {
      setloading(true);
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
      setloading(false);
    } catch (e) {
      setloading(false);
      ToastAndroid.show("something went wrong", ToastAndroid.LONG);
      console.log(e);
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
        loading={loading}
        disabled={loading}
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
