import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import {
  ButtonComponent,
  FeedbackModal,
  GenreButton,
  InputCalculations,
  LoadingModal,
  ResultCalculationsComponent
} from '../../../components';

import { useNavigation, useRoute } from '@react-navigation/native';
import ToastManager, { Toast } from 'toastify-react-native';
import { PatientProps } from '../../globalProps';
import { calcularIMC } from './functions';
import { Sexo } from './props';
import {
  BackgroundContent,
  ButtonContainer,
  ButtonContainerSave,
  Container,
  ContainerAge,
  ContainerCalculaters,
  ContainerInputsdoubles,
  ContainerPatient,
  ContainerSkinFolds,
  Containergenre,
  Content,
  PatientName,
  PatientTitle
} from './styles';

type modalProps = {
  type: 'success' | 'error';
  title: string;
};

export function CalculationImc() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { patient } = route.params as { patient: PatientProps };
  const [genre, setGenre] = useState<Sexo>(patient.genre || ('' as any));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<modalProps>({} as modalProps);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    age: '',
    weight: '',
    height: '',
    imc: patient.imc,
    diagnosticImc: patient.diagnosticImc
  } as PatientProps);

  const schema = Yup.object().shape({
    age: Yup.string()
      .required('Digite sua idade')
      .min(1)
      .max(3)
      .required()
      .matches(/^[0-9]+$/, 'So pode ser usando numeros'),
    weight: Yup.string().required('Digite o peso').min(1),
    height: Yup.string().required('Digite a altura').min(1)
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      age: patient.age,
      weight: patient.weight,
      height: patient.height,
      imc: patient.imc,
      diagnosticImc: patient.diagnosticImc
    } as PatientProps,
    resolver: yupResolver(schema)
  });

  const handleCalculate = (form: PatientProps) => {
    if (!genre) return Toast.error('Selecione um gênero!', 'top');

    const newCalculation = {
      id: String(uuid.v4()),
      age: form.age,
      genre: genre,
      weight: form.weight,
      height: form.height,
      imc: form.imc,
      diagnosticImc: form.diagnosticImc
    };

    try {
      const result = calcularIMC(
        parseFloat(form.weight || ''),
        parseFloat(form.height || ''),
        parseInt(form.age),
        genre
      );
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        age: form.age,
        genre: genre,
        weight: form.weight,
        height: form.height,
        imc: result.imc,
        diagnosticImc: result.diagnostico
      }));
      if (!result) {
        reset();
      }
      console.log(result);
      Toast.success('Cálculos concluídos!');
    } catch (err) {
      Toast.error('Erro ao calcular IMC!', 'top');
      console.log(err);
    }
  };

  function handleSavePatient() {
    setLoading(true);

    try {
      firestore().collection('patients').doc(patient.key).update({
        age: formValues.age,
        genre: genre,
        weight: formValues.weight,
        height: formValues.height,
        imc: formValues.imc,
        diagnosticImc: formValues.diagnosticImc
      });
      setModalType({ title: 'Paciente salvo com sucesso', type: 'success' });
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
    } catch (error) {
      setModalType({ title: 'Erro ao salvar paciente', type: 'error' });
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
      console.error('Erro:', error);
    }
  }

  function handlegenreButton(type: Sexo) {
    setGenre(type);
  }

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate('PatientDetails', { patient: { ...patient, ...formValues } });
  };

  function handleClean() {
    setGenre(null),
      setFormValues({
        age: '',
        weight: '',
        height: '',
        imc: '',
        diagnosticImc: ''
      } as unknown as PatientProps);
    reset({
      age: '',
      weight: '',
      height: ''
    });
    Toast.warn('Cálculos resetados', 'top');
  }

  console.log('🔥', formValues);

  return (
    <Container>
      <BackgroundContent>
        <ToastManager />
        <Content showsVerticalScrollIndicator={false}>
          <ContainerCalculaters>
            <ResultCalculationsComponent
              colorResult={(formValues?.diagnosticImc as any) || ''}
              percentageResult={
                formValues?.imc ? (
                  formValues?.imc.toString()
                ) : (
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'gray',
                      alignSelf: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {`Paciente não possui cálculos`}
                  </Text>
                )
              }
              tableResult={formValues?.diagnosticImc || ''}
            />
            <ContainerPatient>
              <PatientTitle>Paciente:</PatientTitle>
              <PatientName>{` ${patient.fullName}`}</PatientName>
            </ContainerPatient>
            <Containergenre>
              <GenreButton
                isActive={genre === 'Masculino'}
                type="Masculino"
                onPress={() => handlegenreButton(Sexo.Masculino)}
              />
              <GenreButton
                isActive={genre === 'Feminino'}
                type="Feminino"
                onPress={() => handlegenreButton(Sexo.Feminino)}
              />
            </Containergenre>
            <ContainerAge>
              <InputCalculations
                name="age"
                type="custom"
                options={{
                  mask: '999'
                }}
                TitleCalculate="Idade"
                isActive={true}
                control={control}
                placeholder="0"
                errorInput={(errors.age && errors.age.message) || ''}
              />
            </ContainerAge>
            <ContainerSkinFolds>
              <ContainerInputsdoubles>
                <InputCalculations
                  name="weight"
                  type="custom"
                  options={{
                    mask: '999'
                  }}
                  TitleCalculate="Peso"
                  isActive={true}
                  control={control}
                  placeholder="0"
                  errorInput={(errors.weight && errors.weight.message) || ''}
                />
              </ContainerInputsdoubles>
              <ContainerInputsdoubles>
                <InputCalculations
                  name="height"
                  type="custom"
                  options={{
                    mask: '9.99'
                  }}
                  TitleCalculate="Altura"
                  isActive={true}
                  control={control}
                  placeholder="0"
                  errorInput={(errors.height && errors.height.message) || ''}
                />
              </ContainerInputsdoubles>
            </ContainerSkinFolds>
          </ContainerCalculaters>
          <ButtonContainer>
            <ContainerInputsdoubles>
              <ButtonComponent title={'Limpar'} type="clean" onPress={() => handleClean()} />
            </ContainerInputsdoubles>
            <ContainerInputsdoubles>
              <ButtonComponent title={'Calcular'} type="default" onPress={handleSubmit(handleCalculate)} />
            </ContainerInputsdoubles>
          </ButtonContainer>
          <ButtonContainerSave>
            <ButtonComponent title={'Salvar cálculos do paciente'} type="save" onPress={handleSavePatient} />
          </ButtonContainerSave>
        </Content>
      </BackgroundContent>
      {loading && <LoadingModal loading={loading} />}
      <FeedbackModal type={modalType.type} isVisible={isModalVisible} closeModal={closeModal} title={modalType.title} />
    </Container>
  );
}
