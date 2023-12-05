import React, { useState } from "react";

import { Control, Controller } from "react-hook-form";
import { TextInputMaskProps } from "react-native-masked-text";
import { Input } from "../Forms/Input";
import { Container, Content, ErrorInput } from "./styles";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props extends TextInputMaskProps {
  control: Control<any>;
  name: string;
  errorInput: Object;
  TypePassword?: boolean;
}

export function InputForm({
  control,
  name,
  errorInput,
  type,
  TypePassword,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container>
      <Content>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type={type}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={"#9AA4AC"}
              secureTextEntry={showPassword}
              {...rest}
            />
          )}
          name={name}
        />
        {TypePassword && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#343A40"
            />
          </TouchableOpacity>
        )}
      </Content>
      {errorInput && <ErrorInput>{errorInput}</ErrorInput>}
    </Container>
  );
}
