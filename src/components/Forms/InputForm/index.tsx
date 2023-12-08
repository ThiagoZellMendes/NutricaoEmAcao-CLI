import React, {useRef, useState} from 'react';

import {Controller} from 'react-hook-form';
import {TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../InputDefault';
import {InputProps} from './props';
import {Container, Content, TitleInput} from './styles';

export function InputForm({
  control,
  name,
  errorInput,
  type,
  typePassword,
  title,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <Container>
      <TitleInput error={!!errorInput}>{title}</TitleInput>
      <Content error={!!errorInput}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              type={type}
              onChangeText={onChange}
              value={value}
              placeholder="" // Limpar o placeholder padrão
              placeholderTextColor={errorInput ? 'red' : '#9AA4AC'}
              secureTextEntry={typePassword ? showPassword : false}
              {...rest}
            />
          )}
          name={name}
        />
        {typePassword && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#343A40"
            />
          </TouchableOpacity>
        )}
      </Content>
    </Container>
  );
}
