import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Logo2 from "../../assets/Logo2.svg";
import { ButtonComponent } from "../../components/ButtonComponent";
import { InputForm } from "../../components/InputForm";
import auth from "@react-native-firebase/auth";


import {
  BackgroundContent,
  ButtonContainer,
  Container,
  ContainerForm,
  ContainerLink,
  ContainerLogo,
  Content,
  TextLink,
} from "./styles";
import { PropsSignIn } from "./props";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { ConfirmationModal } from "../../components/modal";

export function SignIn() {
  const { navigate } = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const schema = Yup.object().shape({
    email: Yup.string().required("digite seu Email").trim(),
    password: Yup.string().required("Campo obrigatorio"),
  });

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSignIn(form: PropsSignIn) {
    setLoading(true);
    if (form.email && form.password) {
      try {
        await auth().signInWithEmailAndPassword(form.email, form.password);
        setTimeout(() => setLoading(false), 1000);
        navigate("ListPatients");
      } catch (error) {
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
        setModalType("error");
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
            <InputForm
              name="email"
              type="custom"
              options={{
                mask: "******************************",
              }}
              control={control as any}
              autoCapitalize={"none"}
              autoCorrect={false}
              placeholder={" Digite seu email"}
              errorInput={errors.email && (errors.email.message as any)}
            />
          </ContainerForm>
          <ContainerForm>
            <InputForm
              type="custom"
              options={{
                mask: "************************************",
              }}
              name="password"
              TypePassword
              autoCapitalize={"none"}
              autoCorrect={false}
              control={control as any}
              placeholder={" Digite sua senha"}
              errorInput={errors.password && (errors.password.message as any)}
            />
          </ContainerForm>
          <ButtonContainer>
            <ButtonComponent
              type="default"
              title={"Acessar"}
              nameIcon="chevron-right"
              onPress={handleSubmit(handleSignIn)}
            />
          </ButtonContainer>
          <ContainerLink onPress={() => navigate("RegisterNutritionists")}>
            <TextLink>Efetuar Cadastro de Nutricionista</TextLink>
          </ContainerLink>
          {/* <ContainerLink onPress={() => console.log("Press 2")}>
            <TextLink>Esqueceu a senha?</TextLink>
          </ContainerLink> */}
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
        type={modalType}
        isVisible={isModalVisible}
        closeModal={closeModal}
        title={"Erro ao fazer login: \n verificar senha e email"}
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
