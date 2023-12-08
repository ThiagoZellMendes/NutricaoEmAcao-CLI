import { Control } from "react-hook-form";
import { TextInputMaskProps } from "react-native-masked-text";

export interface InputProps extends TextInputMaskProps {
  control: Control<any>;
  name: string;
  errorInput?: string;
  typePassword?: boolean;
  title: string;
}

export interface InputFormStyles {
  error: boolean
}