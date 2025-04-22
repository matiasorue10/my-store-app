import { useState } from "react";
import { View, Image } from "react-native";

type RemoteImageProps = {
  uri: string;
};

export default function RemoteImage({ uri }: RemoteImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View className="items-center justify-center w-48 h-48 relative">
      {loading && (
        <Image
          source={require("../../../../assets/images/spinner.gif")}
          className="h-48 w-48 absolute"
        />
      )}
      <Image
        source={{ uri }}
        onLoadEnd={() => setLoading(false)}
        className="h-48 w-48"
      />
    </View>
  );
}
