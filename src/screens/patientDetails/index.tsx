import React, { useState } from 'react';

import { AvatarComponent, BackgroundComponent, ButtonComponent, PatientCardDetailComponent } from '@components';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Text } from 'react-native';
import { PatientProps } from 'screens/globalProps';
import { ButtonContainer, ButtonContainerSave, Container, ContainerAvatar, ContainerCalculate, ContainerInputsdoubles, Content, TextTitleCalculate, TextTitleData } from './styles';

export function PatientDetails() {
  const route = useRoute();
  const { patient } = route.params as { patient: PatientProps };
  const [patientData, setPatientData] = useState<PatientProps>(patient);
  const navigation = useNavigation<any>();

  console.log(patient);

  useFocusEffect(
    React.useCallback(() => {
      if (patient) {
        setPatientData(patient);
      } else {
        const { patient } = route.params as { patient: PatientProps };
        setPatientData(patient);
        console.log('🆎', patient);
      }
    }, [route.params])
  );
  return (
    <Container>
      <BackgroundComponent>
        <ContainerAvatar>
          <AvatarComponent />
        </ContainerAvatar>
        <ContainerCalculate>
          <TextTitleCalculate>Cálculos:</TextTitleCalculate>
          <ButtonContainer>
            <ContainerInputsdoubles style={{ marginRight: 2 }}>
              <ButtonComponent
                sizeIcon={20}
                nameIcon="chevron-right"
                title={patientData?.imc === undefined ? `Imc \nNão calculado` : `Imc \n ${patientData.imc}`}
                type="clean"
                onPress={() => navigation.navigate('CalculationImc', { patient: patientData })}
              />
              <Text style={{ fontSize: 13, color: 'black', alignSelf: 'center' }}>Índice de massa corporal</Text>
            </ContainerInputsdoubles>
            <ContainerInputsdoubles>
              <ButtonComponent
                sizeIcon={20}
                nameIcon="chevron-right"
                title={patientData?.pgc === undefined ? `Pgc \nNão calculado` : `Pgc \n ${patientData.pgc?.toFixed(2)}%`}
                type="default"
                onPress={() => navigation.navigate('CalculationPgc', { patient: patientData })}
              />
              <Text style={{ fontSize: 13, color: 'black', alignSelf: 'center' }}>Percentual de gordura corporal</Text>
            </ContainerInputsdoubles>
          </ButtonContainer>
        </ContainerCalculate>
        <Content>
          <TextTitleData>Dados Paciente:</TextTitleData>
          <PatientCardDetailComponent titleCard="Nome:" iconName="user" iconSize={30} textCard={`${patientData?.fullName}` || ''} />
          <PatientCardDetailComponent titleCard="Cpf:" iconName="check-square" iconSize={30} textCard={`${patientData?.cpf}` || ''} />
          <PatientCardDetailComponent titleCard="Idade:" iconName="calendar" iconSize={30} textCard={`${patientData?.age}` || ''} />
          <PatientCardDetailComponent titleCard="Gênero:" iconName="user-check" iconSize={30} textCard={`${patientData?.genre}` || ''} />
          <ButtonContainerSave>
            <ButtonComponent title={'Salvar Edição'} type="save" onPress={() => {}} />
          </ButtonContainerSave>
        </Content>
      </BackgroundComponent>
    </Container>
  );
}
