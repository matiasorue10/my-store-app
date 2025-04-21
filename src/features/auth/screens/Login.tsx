import { View, Text } from "react-native";
import React from "react";
import Card from "@/src/components/ui/Card";
import { useForm, Controller } from "react-hook-form";
import { LoginRequest } from "../authTypes";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import { useLoginMutation } from "../authApi";
import { setCredentials } from "../authSlice";
import { useAppDispatch } from "@/src/app/hooks";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response));
      console.log(response);
    } catch (err) {
      console.log(data);
      console.error("Error logging in:", err);
    }
  };
  return (
    <View className="flex items-center justify-center flex-1">
      <Card title="Login" className="h-72 w-72 flex gap-4">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                className="mb-8"
              />
            </View>
          )}
          name="username"
        />

        {errors.username && (
          <Text className="text-red-500">This is required.</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="mb-8"
            />
          )}
          name="password"
        />

        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />

        {error && <Text style={{ color: "red" }}>Login failed.</Text>}
      </Card>
    </View>
  );
}
