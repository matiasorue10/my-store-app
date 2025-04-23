import { useEffect, useState } from "react";
import "./global.css";
import AppNavigator from "./src/app/navigation/AppNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { initializeAuth } from "./src/features/auth/authSlice";
import { useAppDispatch } from "./src/app/hooks";
import * as Progress from "react-native-progress";

function Root() {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(initializeAuth()).finally(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return (
      <Progress.Circle
        size={40}
        indeterminate={true}
        className="absolute"
        testID="progress-circle"
      />
    );
  }
  return <AppNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
