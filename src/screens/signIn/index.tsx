import React, {useRef, useState} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import auth from '@react-native-firebase/auth';
import Logo2 from '../../assets/Logo2.svg';
import {
  ButtonComponent,
  FeedbackModal,
  InputForm,
  LoadingModal,
} from '../../components';

import {Dimensions, findNodeHandle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {INPUTS as INPUTCOLLECIONS, textInputShapeYup} from './data';
import {InputProps, PropsSignIn, valueName} from './props';
import {
  BackgroundContent,
  ButtonContainer,
  Container,
  ContainerForm,
  ContainerLink,
  ContainerLogo,
  Content,
  TextLink,
} from './styles';

export function SignIn() {
  const {navigate} = useNavigation<any>();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [, setCurrentInputFocus] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState('');

  const INPUTS: InputProps[] = INPUTCOLLECIONS().map(item =>
    Object.assign(item, {
      ref: useRef(null),
    }),
  );

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(textInputShapeYup()),
  });

  async function handleSignIn(form: PropsSignIn) {
    setLoading(true);
    if (form.email && form.password) {
      try {
        await auth().signInWithEmailAndPassword(form.email, form.password);
        setTimeout(() => setLoading(false), 1000);
        navigate('ListPatients');
      } catch (error) {
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
        setModalType('error');
      }
    }
  }
  return (
    <Container>
      <BackgroundContent>
        <Content>
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
              title={'Acessar'}
              nameIcon="chevron-right"
              onPress={handleSubmit(handleSignIn)}
            />
          </ButtonContainer>
          <ContainerLink onPress={() => navigate('RegisterNutritionists')}>
            <TextLink>Efetuar Cadastro de Nutricionista</TextLink>
          </ContainerLink>
          {/* <ContainerLink onPress={() => console.log("Press 2")}>
            <TextLink>Esqueceu a senha?</TextLink>
          </ContainerLink> */}
        </Content>
      </BackgroundContent>
      {loading && <LoadingModal loading={loading} />}
      <FeedbackModal
        type={modalType}
        isVisible={isModalVisible}
        closeModal={closeModal}
        title={'Erro ao fazer login: \n verificar senha e email'}
      />
    </Container>
  );
}
