import { useState } from "react";
import { View, Image } from "react-native";
import * as Progress from "react-native-progress";

type RemoteImageProps = {
  uri: string;
};

export default function RemoteImage({ uri }: RemoteImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View className="items-center justify-center w-48 h-48 relative">
      {loading && (
        <Progress.Circle
          size={40}
          indeterminate={true}
          className="absolute"
          testID="progress-circle"
        />
      )}
      <Image
        source={{ uri }}
        onLoadEnd={() => setLoading(false)}
        className="h-48 w-48"
        testID="image"
      />
    </View>
  );
}
