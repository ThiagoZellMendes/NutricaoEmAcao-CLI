import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {ModalProps} from './props';
import {
  ErrorButton,
  ModalContainer,
  ModalContent,
  OkButton,
  OkButtonText,
  StyledModal,
  SuccessText,
} from './styles';

export function FeedbackModal({
  isVisible,
  closeModal,
  title,
  type,
}: ModalProps) {
  return (
    <StyledModal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        closeModal();
      }}>
      <ModalContainer>
        <ModalContent>
          <Feather
            name={type === 'success' ? 'check-circle' : 'alert-circle'}
            size={30}
            color={type === 'success' ? 'green' : 'red'}
          />
          <SuccessText>{title}</SuccessText>
          {type === 'success' ? (
            <OkButton onPress={closeModal}>
              <OkButtonText>OK</OkButtonText>
            </OkButton>
          ) : (
            <ErrorButton onPress={closeModal}>
              <OkButtonText>OK</OkButtonText>
            </ErrorButton>
          )}
        </ModalContent>
      </ModalContainer>
    </StyledModal>
  );
}
