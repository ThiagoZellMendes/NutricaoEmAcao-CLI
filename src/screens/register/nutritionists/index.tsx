import { yupResolver } from "@hookform/resolvers/yup";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import * as Yup from "yup";
import Logo2 from "../../../assets/Logo2.svg";
import { ButtonComponent } from "../../../components/ButtonComponent";
import { InputForm } from "../../../components/InputForm";
import { NutritionistProps } from "./props";
import {
  BackgroundContent,
  ButtonContainer,
  Container,
  ContainerForm,
  ContainerLogo,
  Content,
} from "./styles";
import { ConfirmationModal } from "../../../components/modal";
import { validateNationalRegistry } from "../../../utils/ValidateCPF-CNPJ";

type modalProps = {
  type: string;
  title: string;
};

export function RegisterNutritionists() {
  const { navigate } = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<modalProps>({
    type: "",
    title: "",
  } as modalProps);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const schema = Yup.object().shape({
    firstName: Yup.string().required("digite seu nome").trim(),
    lastName: Yup.string().required("digite seu sobrenome").trim(),
    cpf: Yup.string().required("digite seu CPF").trim().test(
      'cpf',
      'cpf Invalido',
      value => !!value && validateNationalRegistry(value),
    ),
    email: Yup.string()
      .email("email obrigatário")
      .required("digite seu email")
      .trim(),
    password: Yup.string().required("digite sua senha").trim().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    passwordConfirmation: Yup.string()
      .required("confirme sua senha")
      .oneOf([Yup.ref("password")], "As senhas não coincidem ")
      .trim().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
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
        .collection("nutritionist")
        .where("email", "==", email)
        .get();

      if (!emailSnapshot.empty) {
        setModalType({ title: "O Email já possui cadastro", type: "error" });
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
      } else {
        const RegisterNutritionist =
          await auth().createUserWithEmailAndPassword(email, password);

        if (RegisterNutritionist) {
          await firestore()
            .collection("nutritionist")
            .add({
              id: String(uuid.v4()),
              firstName,
              lastName,
              cpf,
              email,
              password,
            });
          setModalType({
            title: "Nutricionista cadastrado com sucesso",
            type: "success",
          });
          setTimeout(() => setLoading(false), 1000);
          setTimeout(() => setIsModalVisible(true), 2000);
        }
      }
    } catch (error) {
      console.log(error)
      setModalType({ title: "O Email já possui cadastro", type: "error" });
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => setIsModalVisible(true), 2000);
    }
  }

  const closeModal = () => {
    if (modalType.type == "error") {
      setIsModalVisible(false);
      return;
    } else {
      setIsModalVisible(false);
      navigate("SignIn");
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
            <InputForm
              type="custom"
              options={{
                mask: "*******************************************************",
              }}
              name="firstName"
              control={control}
              placeholder={"Digite seu nome"}
              errorInput={errors.firstName && errors.firstName.message || '' }
            />
          </ContainerForm>
          <ContainerForm>
            <InputForm
              type="custom"
              options={{
                mask: "*******************************************************",
              }}
              name="lastName"
              control={control}
              placeholder={"Digite seu sobrenome"}
              errorInput={errors.lastName && errors.lastName.message || ''}
            />
          </ContainerForm>
          <ContainerForm>
            <InputForm
              name="cpf"
              type="cpf"
              control={control}
              autoCapitalize="none"
              placeholder={"Digite seu cpf"}
              errorInput={errors.cpf && errors.cpf.message || ''}
              keyboardType="number-pad"
            />
          </ContainerForm>
          <ContainerForm>
            <InputForm
              type="custom"
              options={{
                mask: "*******************************************************",
              }}
              autoCapitalize="none"
              name="email"
              control={control}
              placeholder={"Digite seu e-mail"}
              errorInput={errors.email && errors.email.message || ''}
            />
          </ContainerForm>
          <ContainerForm>
            <InputForm
              name="password"
              type="custom"
              options={{
                mask: "*******************************************************",
              }}
              control={control}
              TypePassword
              autoCapitalize="none"
              placeholder={"Digite sua senha"}
              errorInput={errors.password && errors.password.message || ''}
            />
          </ContainerForm>
          <ContainerForm>
            <InputForm
              name="passwordConfirmation"
              type="custom"
              options={{
                mask: "*******************************************************",
              }}
              TypePassword
              control={control}
              autoCapitalize="none"
              placeholder={"Confirme sua senha"}
              errorInput={
                errors.passwordConfirmation &&
                errors.passwordConfirmation.message || ''
              }
            />
          </ContainerForm>

          <ButtonContainer>
            <ButtonComponent
              type="default"
              title={"Cadastrar"}
              nameIcon="chevron-right"
              onPress={handleSubmit(handleCreateNutritionist)}
            />
          </ButtonContainer>
        </Content>
      </BackgroundContent>
      {loading && (
        <Modal transparent={true} animationType="fade" visible={loading}>
          <Modal transparent={true} animationType="fade" visible={loading}>
            <View style={styles.modalContainer}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" />
              </View>
            </View>
          </Modal>
        </Modal>
      )}
      <ConfirmationModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        title={modalType.title}
        type={modalType.type}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
