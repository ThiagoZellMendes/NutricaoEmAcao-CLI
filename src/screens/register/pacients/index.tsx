import React, {useRef, useState} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Alert, Dimensions, findNodeHandle} from 'react-native';
import uuid from 'react-native-uuid';
import Logo2 from '../../../assets/Logo2.svg';
import {InputProps, PatientProps, valueName} from './props';
import {
  BackgroundContent,
  ButtonContainer,
  Container,
  ContainerForm,
  ContainerLogo,
  Content,
  ContentRegister,
} from './styles';

import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ToastManager, {Toast} from 'toastify-react-native';
import {
  ButtonComponent,
  FeedbackModal,
  DropdownComponent,
  InputForm,
  LoadingModal,
} from '../../../components';
import {INPUTS as INPUTCOLLECIONS, textInputShapeYup} from './data';

const data = [
  {label: 'Masculino', value: 'M'},
  {label: 'Feminino', value: 'F'},
] as any;

type modalProps = {
  type: string;
  title: string;
};

export function RegisterPatients() {
  const [genre, setGenre] = useState('');
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [, setCurrentInputFocus] = useState(0);
  const {navigate} = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<modalProps>({
    type: '',
    title: '',
  } as modalProps);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const INPUTS: InputProps[] = INPUTCOLLECIONS().map(item =>
    Object.assign(item, {
      ref: useRef(null),
    }),
  );

  async function handleCreatePatient({fullName, cpf, age}: PatientProps) {
    if (!genre) return Toast.error('Selecione um gênero!', 'center');
    setLoading(true);

    try {
      const nutricionistUid = auth().currentUser?.uid.trim();
      const cpfSnapshot = await firestore()
        .collection('patients')
        .where('cpf', '==', cpf)
        .get();

      if (!cpfSnapshot.empty) {
        setModalType({title: 'O Cpf já possui Cadastro', type: 'error'});
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
      } else {
        await firestore()
          .collection('patients')
          .add({
            id: String(uuid.v4()),
            nutricionistUid,
            fullName,
            cpf,
            age,
            genre,
          });
        setModalType({
          title: 'Paciente cadastrado com sucesso',
          type: 'success',
        });
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Ocorreu um erro ao processar o cadastro');
      console.error('Erro:', error);
    }
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(textInputShapeYup()),
  });

  const closeModal = () => {
    if (modalType.type == 'error') {
      setIsModalVisible(false);
      return;
    } else {
      setIsModalVisible(false);
      navigate('ListPatients');
    }
  };

  console.log('🔥', genre);
  return (
    <Container>
      <ToastManager />
      <BackgroundContent>
        <Content showsVerticalScrollIndicator={false}>
          <ContainerLogo>
            <Logo2 />
          </ContainerLogo>
          <ContentRegister>
            <ContainerForm>
              {INPUTS.map((item, index) => {
                const itemName = item.name as valueName;
                return (
                  <InputForm
                    key={item.id}
                    title={item.title}
                    name={item.name}
                    type={item.type}
                    options={item.options}
                    control={control}
                    autoCapitalize={item.autoCapitalize}
                    autoCorrect={item.autoCorrect}
                    placeholder={item.placeholder}
                    typePassword={item.typePassword}
                    returnKeyType={
                      INPUTS.length === index + 1 ? 'send' : 'next'
                    }
                    onFocus={(event: any) => {
                      scrollViewRef.current?.scrollToFocusedInput(
                        findNodeHandle(event.target) || 0,
                        (Dimensions.get('window').height / INPUTS.length) *
                          1.15,
                        0,
                      );
                      setCurrentInputFocus(index);
                    }}
                    errorInput={errors[itemName]?.message}
                  />
                );
              })}
            </ContainerForm>
            <ContainerForm>
              <DropdownComponent
                data={data}
                placeholder=" Escolha o sexo do paciente"
                setValue={setGenre}
                value={genre}
              />
            </ContainerForm>
          </ContentRegister>
          <ButtonContainer>
            <ButtonComponent
              type="default"
              title={'Cadastrar'}
              nameIcon="chevron-right"
              onPress={handleSubmit(handleCreatePatient)}
            />
          </ButtonContainer>
        </Content>
      </BackgroundContent>
      {loading && <LoadingModal loading={loading} />}
      <FeedbackModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        title={modalType.title}
        type={modalType.type}
      />
    </Container>
  );
}
