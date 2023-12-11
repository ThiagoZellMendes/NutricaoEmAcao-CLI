import { Control } from 'react-hook-form';
import { TextInput } from 'react-native';
import { TextInputMaskProps } from 'react-native-masked-text';

export interface InputProps extends TextInputMaskProps {
  control: Control<any>;
  name: string;
  errorInput?: string;
  typePassword?: boolean;
  title: string;
  forwardedRef?: React.RefObject<TextInput>;
}

export interface InputFormStyles {
  error: boolean;
}
