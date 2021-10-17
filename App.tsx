import * as React from "react";
import MainFlow from "./Screen/Main";
import { Provider } from "./Context/TokenContext";
function App() {
  return (
    <Provider>
      <MainFlow />
    </Provider>
  );
}

export default App;
