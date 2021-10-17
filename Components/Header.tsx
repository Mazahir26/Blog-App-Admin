import * as React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

function Header(props: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        paddingHorizontal: 15,
        backgroundColor: "#333",
        paddingTop: 30,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "azure",
          marginBottom: 10,
          marginHorizontal: 15,
        }}
      >
        Admin
      </Text>
      <IconButton
        icon={props.route.name == "analytics" ? "bell" : "graph"}
        color="#31d843"
        onPress={() =>
          props.route.name == "analytics"
            ? props.navigation.navigate("notification")
            : props.navigation.navigate("analytics")
        }
      />
    </View>
  );
}

export default Header;
