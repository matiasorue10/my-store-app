import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useGetAllProductsQuery } from "./services/productsApi";
import Card from "@/src/components/ui/card/Card";
import * as Progress from "react-native-progress";
import RemoteImage from "@/src/components/ui/remoteImage/RemoteImage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/app/navigation/types/appNavigatorTypes";

type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Products"
>;

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigation = useNavigation<ProductsScreenNavigationProp>();

  return (
    <View>
      <View className="p-1">
        {error ? (
          <Text className="text-red-500">
            Oh no, there was an error. Please retry
          </Text>
        ) : isLoading ? (
          <View className="flex h-screen items-center justify-center">
            <Progress.Circle
              size={80}
              indeterminate={true}
              testID="progress-indicator"
            />
          </View>
        ) : data ? (
          <>
            <FlatList
              data={data}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View className="p-4">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductDetails", {
                        itemId: item.id,
                      });
                    }}
                  >
                    <Card title={item.title}>
                      <View className="flex flex-col justify-center items-center gap-2">
                        <RemoteImage uri={item.image} />
                        <Text>Category: {item.category}</Text>
                        <Text className="font-bold">Price: {item.price}$</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default Products;
