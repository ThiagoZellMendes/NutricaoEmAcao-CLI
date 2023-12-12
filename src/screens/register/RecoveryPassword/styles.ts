import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { BackgroundComponent } from '../../../components/Background';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
`;

export const BackgroundContent = styled(BackgroundComponent)``;

export const Content = styled.ScrollView`
  margin: ${RFValue(20)}px;
`;

export const ContentRegister = styled.View`
  width: 100%;
`;

export const ContainerForm = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(16)}px;
`;
export const ButtonContainer = styled.View`
  width: 100%;
  margin-bottom: ${() => (Platform.OS === 'android' ? '16px' : '0px')};
`;
