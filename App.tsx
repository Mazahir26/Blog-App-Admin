import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
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
type LineChartData = {
  labels: string[];
  datasets: [
    {
      data: number[];
    }
  ];
};
var monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function Last7Days() {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().split("T")[0]);
  }
  return result;
}

export default function App() {
  const { width } = useWindowDimensions();
  const [Token, setToken] = useState<string | null>("");
  const [text, settext] = useState("");
  const [Data, setData] = useState<LineChartData>();

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
      const lable = Last7Days();
      let dataset: number[] = [];
      lable.map((val) => {
        if (val in counts) {
          dataset.push(parseInt(counts[val]));
        } else dataset.push(0);
      });
      const t = lable.map(
        (val) =>
          val.split("-")[2] + "-" + monthShortNames[new Date(val).getMonth()]
      );
      setData({
        labels: t,
        datasets: [
          {
            data: dataset,
          },
        ],
      });
      // console.log(Object.values(counts).map(Number));
      // console.log(Object.keys(counts));
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
  if (Data !== undefined) {
    return (
      <View style={styles.container}>
        <LineChart
          data={{
            labels: Data.labels,
            datasets: [
              {
                data: Data.datasets[0].data,
              },
            ],
          }}
          width={width} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartconfig}
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

const chartconfig = {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
