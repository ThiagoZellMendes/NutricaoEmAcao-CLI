import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CalculationImc,
  CalculationPgc,
  ListPatients,
  PatientDetails,
  RegisterNutritionists,
  RegisterPatients,
  SignIn
} from '@screens';

import React from 'react';
const { Screen, Navigator } = createNativeStackNavigator();

export function RoutersApp() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="SighIn">
        <Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false
          }}
        />
        <Screen
          name="RegisterNutritionists"
          component={RegisterNutritionists}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#65717B',
            headerTitle: 'Registro Nutricionista',
            headerTransparent: true,
            headerStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
        <Screen
          name="RegisterPatients"
          component={RegisterPatients}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#65717B',
            headerTitle: 'Registro Paciente',
            headerTransparent: true,
            headerStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
        <Screen
          name="ListPatients"
          component={ListPatients}
          options={{
            headerShown: false
          }}
        />
        <Screen
          name="CalculationImc"
          component={CalculationImc}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#65717B',
            headerTitle: 'Índice de massa Corporal',
            headerTransparent: true,
            headerStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
        <Screen
          name="CalculationPgc"
          component={CalculationPgc}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#65717B',
            headerTitle: 'Percentual de Gordura Corporal',
            headerTransparent: true,
            headerStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
        <Screen
          name="PatientDetails"
          component={PatientDetails}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: '#65717B',
            headerTitle: 'Detalhes do Paciente',
            headerTransparent: true,
            headerStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
