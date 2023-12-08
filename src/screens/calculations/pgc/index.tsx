import React, {useState} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Alert, Text} from 'react-native';
import uuid from 'react-native-uuid';
import ToastManager, {Toast} from 'toastify-react-native';
import * as Yup from 'yup';
import {
  ButtonComponent,
  ConfirmationModal,
  GenreButton,
  InputCalculations,
  LoadingModal,
  ResultCalculationsComponent,
} from '../../../components';
import {PatientProps} from '../../globalProps';
import {calcularGorduraCorporal} from './functions';
import {Sexo} from './props';
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
  PatientTitle,
} from './styles';

type modalProps = {
  type: 'success' | 'error';
  title: string;
};

export function CalculationPgc() {
  const route = useRoute();
  const {patient} = route.params as {patient: PatientProps};
  const [genre, setGenre] = useState<Sexo | null>(patient.genre || ('' as any));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<modalProps>({} as modalProps);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    age: '',
    biceps: '',
    subescapular: '',
    triceps: '',
    supraIliaca: '',
    categoryPcg: patient.categoryPcg,
    pgc: patient.pgc,
  });

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const schema = Yup.object().shape({
    age: Yup.string()
      .required('Digite sua idade')
      .min(1)
      .max(3)
      .required()
      .matches(/^[0-9]+$/, 'Só pode serem usando numeros'),
    triceps: Yup.string().required('Digite triceps').min(1),
    biceps: Yup.string().required('Digite biceps').min(1),
    subescapular: Yup.string().required('Digite subescapular').min(1),
    supraIliaca: Yup.string().required('Digite suprailiaca').min(1),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      age: patient.age || '',
      biceps: patient.biceps || '',
      subescapular: patient.subescapular || '',
      triceps: patient.triceps || '',
      supraIliaca: patient.supraIliaca || '',
      categoryPcg: patient.categoryPcg || '',
      pgc: patient.pgc || '',
    } as PatientProps,
    resolver: yupResolver(schema),
  });

  const handleCalculate = (form: PatientProps) => {
    if (!genre) return Alert.alert('Selecione um gênero');

    const newCalculation = {
      id: String(uuid.v4()),
      age: form.age || '',
      genre: genre || '',
      dobras: {
        triceps: parseFloat(form.triceps || ''),
        biceps: parseFloat(form.biceps || ''),
        subescapular: parseFloat(form.subescapular || ''),
        supraIliaca: parseFloat(form.supraIliaca || ''),
      },
    };

    try {
      const result = calcularGorduraCorporal(
        genre,
        parseInt(newCalculation.age),
        newCalculation.dobras,
      );
      setFormValues(prevFormValues => ({
        ...prevFormValues,
        age: newCalculation.age,
        biceps: String(newCalculation.dobras.biceps),
        subescapular: String(newCalculation.dobras.subescapular),
        triceps: String(newCalculation.dobras.triceps),
        supraIliaca: String(newCalculation.dobras.supraIliaca),
        categoryPcg: result.categoria,
        pgc: result.percentual,
      }));
      if (!result) {
        reset();
      }

      console.log('🔥', result);

      Toast.success('Cálculos concluídos!');
    } catch (err) {
      Toast.error('Erro ao calcular PGC!', 'top');
      console.log(err);
    }
  };

  function handleSavePatient() {
    setLoading(true);

    try {
      firestore().collection('patients').doc(patient.key).update({
        age: formValues.age,
        genre: genre,
        biceps: formValues.biceps,
        subescapular: formValues.subescapular,
        triceps: formValues.triceps,
        supraIliaca: formValues.supraIliaca,
        categoryPcg: formValues.categoryPcg,
        pgc: formValues.pgc,
      });
      setModalType({title: 'Paciente salvo com sucesso', type: 'success'});
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
    } catch (error) {
      setLoading(false);
      setModalType({title: 'Erro ao salvar paciente', type: 'error'});
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
      console.error('Erro:', error);
    }
  }

  function handlegenreButton(type: Sexo) {
    setGenre(type);
  }

  function handleClean() {
    setGenre(null),
      setFormValues({
        age: '',
        biceps: '',
        subescapular: '',
        triceps: '',
        supraIliaca: '',
        categoryPcg: '',
        pgc: 0,
      });
    reset({
      age: '',
      biceps: '',
      subescapular: '',
      triceps: '',
      supraIliaca: '',
    });
    Toast.warn('Cálculos resetados', 'top');
  }

  console.log(formValues);

  return (
    <Container>
      <BackgroundContent>
        <ToastManager />
        <Content showsVerticalScrollIndicator={false}>
          <ContainerCalculaters>
            <ResultCalculationsComponent
              colorResult={formValues.categoryPcg as any}
              percentageResult={
                formValues.pgc ? (
                  formValues.pgc?.toFixed(2) + '%'
                ) : (
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'gray',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    {`Paciente não possui cálculos`}
                  </Text>
                )
              }
              tableResult={formValues.categoryPcg || ''}
            />
            <ContainerPatient>
              <PatientTitle>Paciente: </PatientTitle>
              <PatientName>{`${patient.fullName}`}</PatientName>
            </ContainerPatient>

            <Containergenre>
              <GenreButton
                isActive={genre === 'M'}
                type="M"
                onPress={() => handlegenreButton(Sexo.masculino)}
              />
              <GenreButton
                isActive={genre === 'F'}
                type="F"
                onPress={() => handlegenreButton(Sexo.feminino)}
              />
            </Containergenre>
            <ContainerAge>
              <InputCalculations
                name="age"
                type="custom"
                options={{
                  mask: '999',
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
                  name="triceps"
                  type="custom"
                  options={{
                    mask: '9999999',
                  }}
                  TitleCalculate="Tríceps"
                  isActive={true}
                  control={control}
                  placeholder="0"
                  errorInput={(errors.triceps && errors.triceps.message) || ''}
                />
              </ContainerInputsdoubles>
              <ContainerInputsdoubles>
                <InputCalculations
                  name="biceps"
                  type="custom"
                  options={{
                    mask: '9999999',
                  }}
                  TitleCalculate="Bíceps"
                  isActive={true}
                  control={control}
                  placeholder="0"
                  errorInput={(errors.biceps && errors.biceps.message) || ''}
                />
              </ContainerInputsdoubles>
            </ContainerSkinFolds>
            <ContainerSkinFolds>
              <ContainerInputsdoubles>
                <InputCalculations
                  name="subescapular"
                  type="custom"
                  options={{
                    mask: '9999999',
                  }}
                  TitleCalculate="subescapular"
                  isActive={true}
                  control={control}
                  placeholder="0"
                  errorInput={
                    (errors.subescapular && errors.subescapular.message) || ''
                  }
                />
              </ContainerInputsdoubles>
              <ContainerInputsdoubles>
                <InputCalculations
                  name="supraIliaca"
                  type="custom"
                  options={{
                    mask: '9999999',
                  }}
                  TitleCalculate="Supra Íliaca"
                  isActive={true}
                  control={control}
                  placeholder="0"
                  errorInput={
                    (errors.supraIliaca && errors.supraIliaca.message) || ''
                  }
                />
              </ContainerInputsdoubles>
            </ContainerSkinFolds>
          </ContainerCalculaters>
          <ButtonContainer>
            <ContainerInputsdoubles>
              <ButtonComponent
                title={'Limpar'}
                type="clean"
                onPress={() => handleClean()}
              />
            </ContainerInputsdoubles>
            <ContainerInputsdoubles>
              <ButtonComponent
                title={'Calcular'}
                type="default"
                onPress={handleSubmit(handleCalculate)}
              />
            </ContainerInputsdoubles>
          </ButtonContainer>
          <ButtonContainerSave>
            <ButtonComponent
              title={'Salvar cálculos do paciente'}
              type="save"
              onPress={handleSavePatient}
            />
          </ButtonContainerSave>
        </Content>
      </BackgroundContent>
      {loading && <LoadingModal loading={loading} />}
      <ConfirmationModal
        type={modalType.type}
        isVisible={isModalVisible}
        closeModal={closeModal}
        title={modalType.title}
      />
    </Container>
  );
}
