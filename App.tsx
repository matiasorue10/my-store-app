import "./global.css";
import { verifyInstallation } from "nativewind";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/login/Login";

export default function App() {
  const Stack = createNativeStackNavigator();
  verifyInstallation();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
