import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { StyledLoadingContainer, StyledModalContainer } from './styleds';

type Props = {
  loading: boolean
}

export const LoadingModal = ( {loading}: Props) => {
  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <StyledModalContainer>
        <StyledLoadingContainer>
          <ActivityIndicator size="large" color="green" />
        </StyledLoadingContainer>
      </StyledModalContainer>
    </Modal>
  );
};