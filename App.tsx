import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
} from "react-native-paper";

import axios from "axios";

const Axios = axios.create({
  baseURL: "https://notify-blog.herokuapp.com/",
});
//@ts-ignore
// A.defaults.headers.common["Authorization"] = `Token ${config.api_key}`;
type obj = {
  name: string;
  time: string;
};

export default function App() {
  const [Token, setToken] = useState<string | null>("");
  const [text, settext] = useState("");
  const [Data, setData] = useState<number[]>([]);
  const [Label, setLabel] = useState<string[]>([]);

  async function login_an() {
    try {
      const data = await Axios.get("analytics/2/open", {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });
      //@ts-ignore
      const da: obj[] = data.data;
      let a: string[] = [];
      da.map((val) => {
        const ll = new Date(val.time);
        a.push(ll.toISOString().split("T")[0]);
      });
      const counts: any = {};
      a.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });
      setLabel(Object.keys(a));
      setData(Object.values(a).map(Number));
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (Token == null || Token == "") {
      return;
    }
    login_an();
  }, [Token]);
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
  if (Data.length > 0 && Label.length > 0) {
    return (
      <View style={styles.container}>
        <LineChart
          data={{
            labels: [...Label],
            datasets: [
              {
                data: [...Data],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
