import * as React from "react";
import { View, ScrollView, Text } from "react-native";
import { Context } from "../Context/TokenContext";

import Chart from "../Components/chart";

export default function App() {
  const { Key }: any = React.useContext(Context);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#333",
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "azure",
          marginBottom: 5,
          marginHorizontal: 16,
          marginVertical: 5,
          alignSelf: "flex-start",
        }}
      >
        Last 7 days activities
      </Text>
      <Chart label="Logins" name="login" Token={Key} />
      <Chart label="Anonymous logins" name="anonymous" Token={Key} />
      <Chart label="App Opened" name="open" Token={Key} />
      <Chart label="Logouts" name="logout" Token={Key} />
      <Chart label="Post Saved" name="save_feed" Token={Key} />
      <Chart label="Post UnSaved" name="remove_feed" Token={Key} />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
