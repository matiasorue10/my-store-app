import { View, Text } from "react-native";
import React from "react";
import { RootStackParamList } from "@/src/app/navigation/types/appNavigatorTypes";
import { RouteProp } from "@react-navigation/native";
import { useGetProductByIdQuery } from "../services/productsApi";
import Card from "@/src/components/ui/card/Card";
import RemoteImage from "@/src/components/ui/remoteImage/RemoteImage";
import * as Progress from "react-native-progress";

type DetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

type Props = {
  route: DetailsRouteProp;
};

const ProductDetails = ({ route }: Props) => {
  const { itemId } = route.params;
  const { data, error, isLoading } = useGetProductByIdQuery(itemId);

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
            <View className="p-4">
              <Card title={data.title} description={data.description}>
                <View className="flex flex-col justify-center items-center gap-2">
                  <RemoteImage uri={data.image} />
                  <Text>Category: {data.category}</Text>
                  <Text className="font-bold">Price: {data.price}$</Text>
                </View>
              </Card>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default ProductDetails;
