import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles = "px-6 py-3 rounded-2xl items-center justify-center";
  const variants = {
    primary: "bg-indigo-600 dark:bg-indigo-500",
    secondary:
      "bg-white border border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700",
  };
  const textVariants = {
    primary: "text-white font-semibold",
    secondary: "text-zinc-900 dark:text-white font-semibold",
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <Text className={textVariants[variant]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
