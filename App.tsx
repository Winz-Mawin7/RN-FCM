import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AppIndex from "./src";

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <AppIndex />
      </SafeAreaView>
    </>
  );
};

export default App;
