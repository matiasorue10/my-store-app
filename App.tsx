import "./global.css";
import AppNavigator from "./src/app/navigation/AppNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
