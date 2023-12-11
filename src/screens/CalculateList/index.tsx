import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import Logo2 from '../../assets/Logo2.svg';
import { ButtonComponent } from '../../components';
import { PatientProps } from '../globalProps';
import { BackgroundContent, ButtonContainer, Container, ContainerLogo, ContainerTitle, Title } from './styles';

export function CalculateList() {
  const navigation = useNavigation<any>();

  const route = useRoute();
  const { patient } = route.params as { patient: PatientProps };

  console.log(patient);
  return (
    <Container>
      <BackgroundContent>
        <ContainerLogo>
          <Logo2 />
        </ContainerLogo>
        <ContainerTitle>
          <Title>Escolha uma opção</Title>
        </ContainerTitle>
        <ButtonContainer>
          <ButtonComponent
            type="default"
            title={'Índice de Massa \n Corporal'}
            nameIcon="chevron-right"
            onPress={() => navigation.navigate('CalculationImc', { patient: patient })}
          />
        </ButtonContainer>
        <ButtonContainer>
          <ButtonComponent
            type="default"
            title={'Percentual de \n Gordura Corporal'}
            nameIcon="chevron-right"
            onPress={() => navigation.navigate('CalculationPgc', { patient: patient })}
          />
        </ButtonContainer>
      </BackgroundContent>
    </Container>
  );
}
