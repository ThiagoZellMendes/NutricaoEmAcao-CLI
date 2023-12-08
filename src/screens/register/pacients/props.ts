export interface PatientProps {
  fullName: string
  cpf: string
  age: string
}

export type InputProps = {
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
  keyboardType: string;
  placeholder: string;
  onChangeText?: (item: string) => void;
  typePassword?: boolean;
  returnKeyType: 'next' | 'done'
};

export type valueName = 'fullName' | 'cpf' | 'age';

