import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useIsAuthenticated } from "../hooks";
import Login from "@/src/features/auth/screens/Login";
import Products from "@/src/features/products/Products";
import ProductDetails from "@/src/features/products/product-details/ProductDetails";
import { RootStackParamList } from "./types/appNavigatorTypes";

const AppNavigator = () => {
  const isAuthenticated = useIsAuthenticated();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ title: "Product Details" }}
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
