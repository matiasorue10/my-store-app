import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/features/auth/screens/Login";
import { store } from "./src/app/store";
import { Provider } from "react-redux";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
