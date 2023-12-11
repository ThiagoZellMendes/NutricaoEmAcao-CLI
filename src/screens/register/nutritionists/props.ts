import { TextInput } from "react-native";

export interface NutritionistProps {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  password: string;
}

export type valueName = 'firstName' | 'lastName' | 'cpf' | 'email' | 'password' | 'password';

export type InputProps = {
  forwardedRef: React.RefObject<TextInput>;
  id: number;
  title: string;
  name: string;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  type:
    | 'credit-card'
    | 'cpf'
    | 'cnpj'
    | 'zip-code'
    | 'only-numbers'
    | 'money'
    | 'cel-phone'
    | 'datetime'
    | 'custom';
  options?: object;
  autoCorrect: boolean;
  keyboardType:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  placeholder: string;
  onChangeText: (item: string) => void;
  typePassword: boolean;
  returnKeyType: 'next' | 'done'
};
