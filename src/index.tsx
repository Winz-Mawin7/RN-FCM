import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import messaging from "@react-native-firebase/messaging";

const App = () => {
  const [message, setMessage] = useState<Array<string | undefined>>(["Initial Text"]);

  // async function getDeviceToken() {
  //   const token = await messaging().getToken();
  //   console.log(`Device token : ${token}`);
  // }
  // getDeviceToken();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      let { notification } = remoteMessage;
      let { sentTime } = remoteMessage;
      console.log(`Sent Time: ${new Date(sentTime).toLocaleString()}`);

      let body = notification?.body;
      setMessage([...message, body]);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  // Background
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  return (
    <View>
      {message.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
};

export default App;
