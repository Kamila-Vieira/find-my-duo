// import { useRef, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";
import { Background } from "./src/components/Background";

// import { Subscription } from "expo-modules-core";
// import * as Notifications from "expo-notifications";
// import "./src/services/NotificationConfigs";
// import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  //TODO: V2 -> Adicionar envio de push quando houverem novos anúncios (https://docs.expo.dev/push-notifications/sending-notifications/#http2-api) (https://expo.dev/notifications)
  // const getPushNotificationListener = useRef<Subscription>();
  // const responseNotificationListener = useRef<Subscription>();

  // useEffect(() => {
  //   getPushNotificationToken();
  // }, []);

  // useEffect(() => {
  //   getPushNotificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log(notification);
  //     }
  //   );

  //   responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (notification) => {
  //       console.log(notification);
  //     }
  //   );

  //   return () => {
  //     if (getPushNotificationListener.current && responseNotificationListener.current) {
  //       Notifications.removeNotificationSubscription(getPushNotificationListener.current);
  //       Notifications.removeNotificationSubscription(responseNotificationListener.current);
  //     }
  //   };
  // }, []);

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
