import { View, Text } from "react-native";
import React from "react";
import { RootStackParamList } from "@/src/app/navigation/types/appNavigatorTypes";
import { RouteProp } from "@react-navigation/native";

type DetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

type Props = {
  route: DetailsRouteProp;
};

const ProductDetails = ({ route }: Props) => {
  const { itemId } = route.params;
  console.log(itemId);
  return (
    <View>
      <Text>ProductDetail</Text>
    </View>
  );
};

export default ProductDetails;
