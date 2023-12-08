import {yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Dimensions, TextInput, findNodeHandle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
import Logo2 from '../../../assets/Logo2.svg';
import {
  ButtonComponent,
  FeedbackModal,
  InputForm,
  LoadingModal,
} from '../../../components';
import {INPUTS as INPUTCOLLECIONS, textInputShapeYup} from './data';
import {InputProps, NutritionistProps, valueName} from './props';
import {
  BackgroundContent,
  ButtonContainer,
  Container,
  ContainerForm,
  ContainerLogo,
  Content,
} from './styles';

type modalProps = {
  type: string;
  title: string;
};

export function RegisterNutritionists() {
  const {navigate} = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [, setCurrentInputFocus] = useState(0);
  const [modalType, setModalType] = useState<modalProps>({
    type: '',
    title: '',
  } as modalProps);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const INPUTS: InputProps[] = INPUTCOLLECIONS().map(item =>
    Object.assign(item, {
      ref: useRef<TextInput>(null),
    }),
  );
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(textInputShapeYup()),
  });

  async function handleCreateNutritionist({
    firstName,
    lastName,
    cpf,
    email,
    password,
  }: NutritionistProps) {
    try {
      setLoading(true);
      const emailSnapshot = await firestore()
        .collection('nutritionist')
        .where('email', '==', email)
        .get();

      if (!emailSnapshot.empty) {
        setModalType({title: 'O Email já possui cadastro', type: 'error'});
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
      } else {
        const RegisterNutritionist =
          await auth().createUserWithEmailAndPassword(email, password);

        if (RegisterNutritionist) {
          await firestore()
            .collection('nutritionist')
            .add({
              id: String(uuid.v4()),
              firstName,
              lastName,
              cpf,
              email,
              password,
            });
          setModalType({
            title: 'Nutricionista cadastrado com sucesso',
            type: 'success',
          });
          setTimeout(() => setLoading(false), 1000);
          setTimeout(() => setIsModalVisible(true), 2000);
        }
      }
    } catch (error) {
      console.log(error);
      setModalType({title: 'O Email já possui cadastro', type: 'error'});
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
    }
  }

  const closeModal = () => {
    if (modalType.type == 'error') {
      setIsModalVisible(false);
      return;
    } else {
      setIsModalVisible(false);
      navigate('SignIn');
    }
  };

  return (
    <Container>
      <BackgroundContent>
        <Content showsVerticalScrollIndicator={false}>
          <ContainerLogo>
            <Logo2 />
          </ContainerLogo>
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
                  keyboardType={item.keyboardType}
                  typePassword={item.typePassword}
                  returnKeyType={INPUTS.length === index + 1 ? 'send' : 'next'}
                  onFocus={(event: any) => {
                    scrollViewRef.current?.scrollToFocusedInput(
                      findNodeHandle(event.target) || 0,
                      (Dimensions.get('window').height / INPUTS.length) * 1.15,
                      0,
                    );
                    setCurrentInputFocus(index);
                  }}
                  errorInput={errors[itemName]?.message}
                />
              );
            })}
          </ContainerForm>

          <ButtonContainer>
            <ButtonComponent
              type="default"
              title={'Cadastrar'}
              nameIcon="chevron-right"
              onPress={handleSubmit(handleCreateNutritionist)}
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
