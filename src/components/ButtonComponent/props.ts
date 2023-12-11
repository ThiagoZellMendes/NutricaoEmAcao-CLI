import { RectButtonProps } from 'react-native-gesture-handler';

export interface ButtonComponentProps extends RectButtonProps {
  title: string;
  nameIcon?: string;
  onPress: () => void;
  sizeIcon?: number;
  type: 'clean' | 'default' | 'save';
}

export interface ButtonComponentPropsStyles extends RectButtonProps {
  type: 'clean' | 'default' | 'save';
}
