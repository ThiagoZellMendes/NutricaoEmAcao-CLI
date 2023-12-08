import { Modal, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

export const StyledModal = styled(Modal)`
  flex: 1;
`;

export const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled(View)`
  width: 300px;
  height: 180px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const SuccessText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
  color: black;
`;

export const OkButton = styled(TouchableOpacity)`
  background-color: green;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const ErrorButton = styled(OkButton)`
  background-color: red;
`;

export const OkButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;