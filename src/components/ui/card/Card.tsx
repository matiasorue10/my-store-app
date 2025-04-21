import { View, Text, ViewProps } from "react-native";
import React from "react";

interface CardProps extends ViewProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <View
      className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-4 my-2 ${className}`}
      {...props}
    >
      <Text className="text-lg font-semibold text-zinc-800 dark:text-white">
        {title}
      </Text>
      {description && (
        <Text className="text-sm text-zinc-500 dark:text-zinc-300 mt-1">
          {description}
        </Text>
      )}
      <View className="mt-3">{children}</View>
    </View>
  );
};

export default Card;
