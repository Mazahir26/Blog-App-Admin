import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analytics from "./analytics";
import Token from "./TokenInput";
import Notification from "./Notification";

import { Context } from "../Context/TokenContext";
import { NavigationContainer } from "@react-navigation/native";

import Header from "../Components/Header";

const Stack = createNativeStackNavigator();

function App() {
  const { Key }: any = React.useContext(Context);
  if (Key == null || Key == "") {
    return <Token />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: Header,
        }}
      >
        <Stack.Screen name="analytics" component={Analytics} />
        <Stack.Screen name="notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
