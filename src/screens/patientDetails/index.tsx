import React, { useRef, useState } from 'react';

import {
  AvatarComponent,
  BackgroundComponent,
  ButtonComponent,
  FeedbackModal,
  LoadingModal,
  PatientCardDetailComponent
} from '@components';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PatientProps } from 'screens/globalProps';
import {
  ButtonContainer,
  ButtonContainerSave,
  Container,
  ContainerAvatar,
  ContainerCalculate,
  ContainerInputsdoubles,
  Content,
  TextTitleCalculate,
  TextTitleData
} from './styles';

type modalProps = {
  type: 'success' | 'error';
  title: string;
};

export function PatientDetails() {
  const route = useRoute();
  const { patient } = route.params as { patient: PatientProps };
  const [patientData, setPatientData] = useState<PatientProps>(patient);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [avatarImage, setAvatarImage] = useState<string | undefined>(patient.avatarUrl);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<modalProps>({} as modalProps);
  const navigation = useNavigation<any>();

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const updatePatientData = (field: keyof PatientProps, value: string) => {
    console.log('💮', 'Field:', field, 'Value:', value);
    setPatientData((prevData) => ({ ...prevData, [field]: value }));
  };

  async function handleSavePatient() {
    setLoading(true);

    try {
      const patientDataToUpdate: Partial<PatientProps> = {
        fullName: patientData.fullName,
        age: patientData.age,
        cpf: patientData.cpf,
        genre: patientData.genre
      };

      if (avatarImage !== patient.avatarUrl) {
        const reference = storage().ref(`avatars/${patient.key}`);
        await reference.putFile(avatarImage || '');
        const url = await reference.getDownloadURL();
        patientDataToUpdate.avatarUrl = url || undefined;
      }

      await firestore().collection('patients').doc(patient.key).update(patientDataToUpdate);

      setModalType({ title: 'Paciente salvo com sucesso', type: 'success' });
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
    } catch (error) {
      setLoading(false);
      setModalType({ title: 'Erro ao salvar paciente', type: 'error' });
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
      console.error('Erro:', error);
    }
  }

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
  console.log(patientData);
  return (
    <Container>
      <BackgroundComponent>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          extraHeight={100}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
        >
          <ContainerAvatar>
            <AvatarComponent avatarImage={avatarImage} setAvatarImage={setAvatarImage} />
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
            <PatientCardDetailComponent
              titleCard="Nome:"
              iconName="user"
              iconSize={30}
              textCard={`${patientData?.fullName}` || ''}
              updateData={(value) => updatePatientData('fullName', value)}
            />
            <PatientCardDetailComponent
              titleCard="Cpf:"
              iconName="check-square"
              iconSize={30}
              textCard={`${patientData?.cpf}` || ''}
              updateData={(value) => updatePatientData('cpf', value)}
              // updateData={(value) => {
              //   const formattedCPF = masks.cpf(value).value;
              //   updatePatientData('cpf', formattedCPF);
              // }}
            />
            <PatientCardDetailComponent
              titleCard="Idade:"
              iconName="calendar"
              iconSize={30}
              textCard={`${patientData?.age}` || ''}
              updateData={(value) => updatePatientData('age', value)}
            />
            <PatientCardDetailComponent
              titleCard="Gênero:"
              iconName="user-check"
              iconSize={30}
              textCard={`${patientData?.genre}` || ''}
              updateData={(value) => updatePatientData('genre', value)}
            />
            <ButtonContainerSave>
              <ButtonComponent title={'Salvar Edição'} type="save" onPress={handleSavePatient} />
            </ButtonContainerSave>
          </Content>
        </KeyboardAwareScrollView>
      </BackgroundComponent>
      {loading && <LoadingModal loading={loading} />}
      <FeedbackModal type={modalType.type} isVisible={isModalVisible} closeModal={closeModal} title={modalType.title} />
    </Container>
  );
}
