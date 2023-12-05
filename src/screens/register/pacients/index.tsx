import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Logo2 from "../../../assets/Logo2.svg";
import uuid from "react-native-uuid";
import { ButtonComponent } from "../../../components/ButtonComponent";
import { DropdownComponent } from "../../../components/DropDonwList";
import { InputForm } from "../../../components/InputForm";
import firestore from "@react-native-firebase/firestore";
import {
  BackgroundContent,
  ButtonContainer,
  Container,
  ContainerForm,
  ContainerLogo,
  Content,
  ContentRegister,
} from "./styles";
import { PatientProps } from "./props";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { ConfirmationModal } from "../../../components/modal";
import { validateNationalRegistry } from "../../../utils/ValidateCPF-CNPJ";

const data = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
] as any;

type modalProps = {
  type: string;
  title: string;
};

export function RegisterPatients() {
  const [genre, setGenre] = useState("");
  const { navigate } = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<modalProps>({
    type: "",
    title: "",
  } as modalProps);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const schema = Yup.object().shape({
    cpf: Yup.string()
      .required("digite seu CPF")
      .trim()
      .test(
        "cpf",
        "cpf Invalido",
        (value) => !!value && validateNationalRegistry(value)
      ),
    fullName: Yup.string().required("digite o nome do paciente"),
    age: Yup.string().required("digite seu sobrenome"),
  });

  async function handleCreatePatient({ fullName, cpf, age }: PatientProps) {
    setLoading(true);
    try {
      const cpfSnapshot = await firestore()
        .collection("patients")
        .where("cpf", "==", cpf)
        .get();

      if (!cpfSnapshot.empty) {
        setModalType({ title: "O Cpf já possui Cadastro", type: "error" });
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
      } else {
        await firestore()
          .collection("patients")
          .add({
            id: String(uuid.v4()),
            fullName,
            cpf,
            age,
            genre,
          });
        setModalType({
          title: "Paciente Cadastrado com sucesso",
          type: "success",
        });
        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setIsModalVisible(true), 2000);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Ocorreu um erro ao processar o cadastro");
      console.error("Erro:", error);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const closeModal = () => {
    if (modalType.type == "error") {
      setIsModalVisible(false);
      return;
    } else {
      setIsModalVisible(false);
      navigate("ListPatients");
    }
  };

  console.log("🔥", genre);
  return (
    <Container>
      <BackgroundContent>
        <Content showsVerticalScrollIndicator={false}>
          <ContainerLogo>
            <Logo2 />
          </ContainerLogo>
          <ContentRegister>
            <ContainerForm>
              <InputForm
                type="cpf"
                name="cpf"
                control={control}
                autoCapitalize="none"
                placeholder={" Digite seu cpf"}
                keyboardType="number-pad"
                errorInput={(errors.cpf && errors.cpf.message) || ""}
              />
            </ContainerForm>
            <ContainerForm>
              <InputForm
                name="fullName"
                type="custom"
                options={{
                  mask: "*******************************************",
                }}
                control={control}
                placeholder={" Digite o nome completo do paciente"}
                errorInput={(errors.fullName && errors.fullName.message) || ""}
              />
            </ContainerForm>
            <ContainerForm>
              <InputForm
                name="age"
                type="custom"
                options={{
                  mask: "999",
                }}
                control={control}
                autoCapitalize="none"
                placeholder={" Digite o a idade do paciente"}
                keyboardType="number-pad"
                errorInput={(errors.age && errors.age.message) || ""}
              />
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
              title={"Cadastrar"}
              nameIcon="chevron-right"
              onPress={handleSubmit(handleCreatePatient)}
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
