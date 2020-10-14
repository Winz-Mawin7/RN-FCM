import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const initialState = [{ time: new Date().toLocaleTimeString(), title: 'Title', body: 'Waiting for messages...', data: 'Data' }];
  const [messages, setMessages] = useState(initialState);

  // async function getDeviceToken() {
  //   const token = await messaging().getToken();
  //   console.log(`Device token : ${token}`);
  // }
  // getDeviceToken();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const time = new Date(remoteMessage.sentTime).toLocaleTimeString();
      const title = remoteMessage.notification.title;
      const body = remoteMessage.notification.body;
      const data = JSON.stringify(remoteMessage.data);

      setMessages((prev) => [{ time, title, body, data }, ...prev]);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <ScrollView>
      {messages.map((item, index) => (
        <React.Fragment key={index}>
          <View style={{ height: 1, width: '100%', backgroundColor: '#000', marginVertical: 7 }} />
          <Text>
            Time: {item.time + '\t'} Title: {item.title + '\t'} Body: {item.body + '\n'}
            Data: {item.data}
          </Text>
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

export default App;

// Background
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });
