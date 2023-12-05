import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputMaskProps } from "react-native-masked-text";
import {
  Container,
  Content,
  ErrorInput,
  Input,
  TextCalculater,
} from "./styles";

interface Props extends TextInputMaskProps {
  name: string;
  TitleCalculate: string;
  isActive?: boolean;
  placeholder?: string;
  control: Control<any>;
  errorInput: Object;
}
export function InputCalculations({
  name,
  TitleCalculate,
  isActive = false,
  placeholder,
  control,
  errorInput,
  ...rest
}: Props) {
  return (
    <Container isActive={isActive}>
      <Content>
        <TextCalculater>{TitleCalculate}:</TextCalculater>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              {...rest}
              placeholder={placeholder}
              keyboardType="numeric"
              textAlign="right"
              placeholderTextColor={"#9AA4AC"}
              autoCapitalize="none"
            />
          )}
          name={name}
        />
      </Content>
      {errorInput && <ErrorInput>{errorInput}</ErrorInput>}
    </Container>
  );
}
