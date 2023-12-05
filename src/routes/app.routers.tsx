import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { SignIn } from "../screens/signIn"
import { RegisterNutritionists } from "../screens/register/nutritionists"
import { RegisterPatients } from "../screens/register/pacients"
import { ListPatients } from "../screens/listPatients"
import { CalculationImc } from "../screens/calculations/imc"
import { CalculationPgc } from "../screens/calculations/pgc"
import { CalculateList } from "../screens/CalculateList"




const { Screen, Navigator } = createNativeStackNavigator()

export function RoutersApp() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="SignIn">
        <Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="RegisterNutritionists"
          component={RegisterNutritionists}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: "#65717B",
            headerTitle: "Registro Nutricionista",
            headerTransparent: true,
            headerStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        <Screen
          name="RegisterPatients"
          component={RegisterPatients}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: "#65717B",
            headerTitle: "Registro Paciente",
            headerTransparent: true,
            headerStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        <Screen
          name="CalculateList"
          component={CalculateList}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: "#65717B",
            headerTitle: " ",
            headerTransparent: true,
            headerStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        <Screen
          name="ListPatients"
          component={ListPatients}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="CalculationImc"
          component={CalculationImc}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: "#65717B",
            headerTitle: "Índice de massa Corporal",
            headerTransparent: true,
            headerStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
        <Screen
          name="CalculationPgc"
          component={CalculationPgc}
          options={{
            headerBackTitleVisible: false,
            headerTintColor: "#65717B",
            headerTitle: "Percentual de Gordura Corporal",
            headerTransparent: true,
            headerStyle: { backgroundColor: "#FFFFFF" },
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}
