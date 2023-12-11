import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 150px;
  height: 150px;
  /* background-color: red; */
`;
export const AvatarContainer = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border: 3px;
  overflow: hidden;
`;

export const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const AddImageButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 5px;
  right: -15px;
  background-color: green;
  border-radius: 50px;
  padding: 15px;
`;
