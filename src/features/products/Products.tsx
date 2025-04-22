import { View, Text, FlatList, Image } from "react-native";
import { useGetAllProductsQuery } from "./services/productsApi";
import Card from "@/src/components/ui/card/Card";
import * as Progress from "react-native-progress";
import RemoteImage from "@/src/components/ui/remoteImage/RemoteImage";

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  return (
    <View>
      <View className="p-1">
        {error ? (
          <Text>Oh no, there was an error</Text>
        ) : isLoading ? (
          <View className="flex h-screen items-center justify-center">
            <Progress.Circle size={80} indeterminate={true} />
          </View>
        ) : data ? (
          <>
            <FlatList
              data={data}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View className="p-4">
                  <Card title={item.title}>
                    <View className="flex flex-col justify-center items-center gap-2">
                      <RemoteImage uri={item.image} />
                      <Text>Category: {item.category}</Text>
                      <Text className="font-bold">Price: {item.price}$</Text>
                    </View>
                  </Card>
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
