import { ImageBackground, Platform, StatusBar } from "react-native"
import styled from "styled-components/native"

export const isHasNotch = () => {
  if (Platform.OS === "android") {
    return (StatusBar.currentHeight && StatusBar.currentHeight + 10) || 10
  }
  return 10
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-self: center;
  align-items: center;
  padding-top: ${isHasNotch()}px;
  `
export const Bg = styled(ImageBackground)`
  flex: 1;
  width: 100%;
`;
