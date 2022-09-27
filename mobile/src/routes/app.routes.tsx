import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../screens/SignIn";
import { Home } from "../screens/Home";
import { Game } from "../screens/Game";
import { useState } from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="auth" component={SignIn} />
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>
  );
}
