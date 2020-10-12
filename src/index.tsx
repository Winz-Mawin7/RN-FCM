import React, { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const initialState = [{ time: new Date().toLocaleTimeString(), title: 'Title', data: 'Waiting for messages...' }];
  const [messages, setMessages] = useState(initialState);

  // async function getDeviceToken() {
  //   const token = await messaging().getToken();
  //   console.log(`Device token : ${token}`);
  // }
  // getDeviceToken();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(`MESSAGE: ${remoteMessage}`);
      const time = new Date(remoteMessage.sentTime).toLocaleTimeString();
      const title = remoteMessage.notification.title;
      const data = remoteMessage.notification.body;

      setMessages((prev) => [...prev, { time, title, data }]);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <ScrollView>
      {messages.map((item, index) => (
        <Text key={index}>
          Time: {item.time + '\t'} Title: {item.title + '\t'} Data: {item.data}
        </Text>
      ))}
    </ScrollView>
  );
};

export default App;

// Background
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });
