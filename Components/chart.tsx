import React, { useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ActivityIndicator, IconButton } from "react-native-paper";
import axios from "axios";
import config from "./config";

const Axios = axios.create({
  baseURL: config.BaseUrl,
});
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

export default function chart({
  Token,
  name,
  label,
}: {
  Token: string;
  label: string;
  name: string;
}) {
  const { width } = useWindowDimensions();
  const [Data, setData] = useState<LineChartData>();

  useEffect(() => {
    login_an();
  }, [Token, name]);
  async function login_an() {
    try {
      const data = await Axios.get(`analytics/2/${name}`, {
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
        labels: t.reverse(),
        datasets: [
          {
            data: dataset.reverse(),
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }
  function refresh() {
    setData(undefined);
    login_an();
  }

  if (Data !== undefined) {
    return (
      <View style={{ marginVertical: 7 }}>
        <LineChart
          data={{
            labels: Data.labels,
            datasets: [
              {
                data: Data.datasets[0].data,
              },
            ],
            legend: [label],
          }}
          width={width - width * 0.06} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartconfig}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
        <IconButton
          icon="refresh"
          color="#31d843"
          style={{ position: "absolute", right: -5, top: -5 }}
          onPress={() => refresh()}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} color={"#44cf6c"} />
    </View>
  );
}

const chartconfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.9,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 5,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "1",
    stroke: "#31d843",
  },
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    backgroundColor: "#1E2923",
    borderRadius: 5,
  },
});
