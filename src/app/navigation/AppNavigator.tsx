import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAppDispatch, useIsAuthenticated } from "../hooks";
import Login from "@/src/features/auth/screens/Login";
import Products from "@/src/features/products/Products";
import ProductDetails from "@/src/features/products/product-details/ProductDetails";
import { RootStackParamList } from "./types/appNavigatorTypes";
import Button from "@/src/components/ui/button/Button";
import { GestureResponderEvent } from "react-native";
import { logout } from "@/src/features/auth/authSlice";
import { useCallback } from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(
    (_event: GestureResponderEvent) => {
      dispatch(logout());
    },
    [dispatch]
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Products"
              component={Products}
              options={{
                headerRight: () => (
                  <Button
                    title="Logout"
                    variant="secondary"
                    onPress={handleLogout}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{
                title: "Product Details",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
