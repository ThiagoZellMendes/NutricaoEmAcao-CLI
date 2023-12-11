import IconComponent from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const TitleCard = styled.Text`
  color: green;
  font-weight: bold;
  font-size: 16px;
`;
export const TextCard = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.title_dark};
  flex: 1;
`;
export const TextInputEditing = styled.TextInput`
  color: ${({ theme }) => theme.colors.title_dark};
  font-weight: bold;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const Icon = styled(IconComponent)`
  color: green;
  margin-right: 10px;
`;
export const IconRight = styled(IconComponent)`
  margin-right: 10px;
`;
export const ContainerIconRight = styled.TouchableOpacity`
  align-items: flex-end;
`;
// // export const TextContent = styled.Text`
// //   color: ${({ theme }) => theme.colors.title_dark};
// //   font-weight: bold;
// //   font-size: 16px;
// //   justify-content: flex-start;
// //   flex: 1;
// `;
