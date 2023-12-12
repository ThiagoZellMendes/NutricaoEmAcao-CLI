import { ButtonComponent, FeedbackModal, InputForm, LoadingModal } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ToastManager from 'toastify-react-native';
import { textInputShapeYup } from './data';
import { BackgroundContent, ButtonContainer, Container, ContainerForm, Content, ContentRegister } from './styles';

type modalProps = {
  type: string;
  title: string;
};

export function RecoveryPassword() {
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const { navigate } = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<modalProps>({
    type: '',
    title: ''
  } as modalProps);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(textInputShapeYup()),
    defaultValues: { email: '' }
  });

  interface Prop {
    email: string;
  }

  async function HandleUpdatePassword({ email }: Prop) {
    console.log('Email a ser enviado:', email);
    setLoading(true);
    const emailSnapshot = (await firestore().collection('nutritionist').where('email', '==', email).get()).docs;
    console.log(emailSnapshot);

    if (emailSnapshot.length > 0) {
      try {
        auth().sendPasswordResetEmail(email);
        setModalType({ title: 'Email enviado com sucesso', type: 'success' });
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
      } catch (error) {
        setModalType({ title: 'Erro ao enviar o email', type: 'error' });
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
        console.error('Erro ao enviar o email:', error);
      }
    } else {
      setModalType({ title: 'Email não cadastrado', type: 'error' });
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
      <ToastManager />
      <BackgroundContent>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          extraHeight={100} // Ajuste conforme necessário
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
        >
          <Content showsVerticalScrollIndicator={false}>
            <ContentRegister>
              <ContainerForm>
                <InputForm
                  control={control}
                  title="Email"
                  name="email"
                  type="custom"
                  options={{
                    mask: '*******************************************************'
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  typePassword={false}
                  keyboardType="default"
                  placeholder="Digite um email cadastrado"
                  errorInput={errors.email?.message}
                />
              </ContainerForm>
            </ContentRegister>
            <ButtonContainer>
              <ButtonComponent
                sizeIcon={25}
                type="default"
                title={'Recuperar senha'}
                nameIcon="chevron-right"
                onPress={handleSubmit(HandleUpdatePassword)}
              />
            </ButtonContainer>
          </Content>
        </KeyboardAwareScrollView>
      </BackgroundContent>
      {loading && <LoadingModal loading={loading} />}
      <FeedbackModal isVisible={isModalVisible} closeModal={closeModal} title={modalType.title} type={modalType.type} />
    </Container>
  );
}
