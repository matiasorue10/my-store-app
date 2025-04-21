import { TextInput, TextInputProps } from "react-native";

const Input: React.FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <TextInput
      className={`border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2 text-base text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 ${className}`}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
};

export default Input;
