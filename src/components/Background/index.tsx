import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native';
import BackGround from '../../assets/bgImage.jpg';
import {Bg, Container} from './styles';

export const BackgroundComponent = ({children}: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <Bg source={BackGround} resizeMode="cover">
          {children}
        </Bg>
      </Container>
     </SafeAreaView>
  );
};
