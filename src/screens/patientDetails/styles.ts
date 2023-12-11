import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
`;

export const Content = styled.ScrollView`
  margin: 0px 14px;
`;
export const ContainerAvatar = styled.View`
  margin: 30px 0px;
  height: 150px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ContainerCalculate = styled.View`
  margin: 0 14px;
`;

export const TextTitleCalculate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.title_dark};
`;
export const TextTitleData = styled.Text`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.title_dark};
`;

export const ButtonContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 15px;
`;

export const ContainerInputsdoubles = styled.View`
  width: 50%;
  /* margin-right: 5px; */
`;

export const ButtonContainerSave = styled.View`
  margin-top: ${RFValue(10)}px;
  margin-bottom: ${() => (Platform.OS === 'android' ? '16px' : '0px')};
`;
