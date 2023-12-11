import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ButtonComponent, Container, Icon } from './styles';

const icons = {
  Masculino: 'man',
  Feminino: 'woman'
};

interface Props extends RectButtonProps {
  type: 'Masculino' | 'Feminino';
  isActive: boolean;
}
export function GenreButton({ type, isActive, ...rest }: Props) {
  return (
    <Container isActive={isActive} type={type}>
      <ButtonComponent {...rest}>
        <Icon name={icons[type]} type={type} />
      </ButtonComponent>
    </Container>
  );
}
