import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Card from "@/src/components/ui/card/Card";
import { useForm, Controller } from "react-hook-form";
import { LoginRequest } from "../authTypes";
import Input from "@/src/components/ui/input/Input";
import Button from "@/src/components/ui/button/Button";
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
  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials(data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <View className="flex items-center justify-center flex-1">
      <Card title="Login" className="h-auto w-72">
        <View className="flex gap-4">
          <View>
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
                    textContentType="username"
                    autoComplete="username"
                  />
                </View>
              )}
              name="username"
            />

            {errors.username && (
              <Text className="text-red-500">The username is required.</Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  placeholder="Password"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textContentType="password"
                  autoComplete="password"
                />
              )}
              name="password"
            />

            {errors.password && (
              <Text className="text-red-500">The password is required.</Text>
            )}
          </View>

          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />

          {error && "data" in error && (
            <Text style={{ color: "red" }}>
              Login failed: {(error as any).data}
            </Text>
          )}
        </View>
      </Card>
    </View>
  );
}
