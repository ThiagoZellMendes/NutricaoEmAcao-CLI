import React, { useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo2 from '../../assets/Logo2.svg';
import { ButtonComponent } from '../../components';
import {
  BackgroundContent,
  Container,
  ContainerAddPatients,
  ContainerList,
  ContainerLogo,
  ContainerTitle,
  Content,
  ControllerView,
  FeedBackWithoutPatients,
  IconAdd,
  IconFeedBack,
  PatientsList,
  Separator,
  Title
} from './styles';

export function ListPatients() {
  const [pacientsData, setPacientsData] = useState([]);
  const navigation = useNavigation<any>();

  function getPatients() {
    try {
      const nutricionistUid = auth().currentUser?.uid.trim();
      firestore()
        .collection('patients')
        .where('nutricionistUid', '==', nutricionistUid) //.where(Filter('age', '==', '38' ))
        .onSnapshot((onSnapshot) => {
          const patientsForData = [] as any;
          onSnapshot.forEach((documentSnapshot) => {
            patientsForData.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id
            });
          });
          setPacientsData(patientsForData);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPatients();
  }, []);

  console.log(pacientsData);

  return (
    <Container>
      <BackgroundContent>
        <ControllerView>
          <Content>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginRight: 20,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => console.log('User signed out!'));
                navigation.navigate('SignIn');
              }}
            >
              <Text style={{ color: 'green', marginRight: 10, fontWeight: 'bold' }}>Logout</Text>
              <Ionicons name="exit" size={30} color="green" />
            </TouchableOpacity>
            <ContainerLogo>
              <Logo2 />
            </ContainerLogo>
            <ContainerTitle>
              <Title>Lista de Pacientes:</Title>
              <ContainerAddPatients onPress={() => navigation.navigate('RegisterPatients')}>
                <IconAdd name={'plus'} />
              </ContainerAddPatients>
            </ContainerTitle>
            <ContainerList>
              {!pacientsData || pacientsData.length === 0 ? (
                <>
                  <IconFeedBack name={'activity'} />
                  <FeedBackWithoutPatients>{`Não existem pacientes cadastrados`}</FeedBackWithoutPatients>
                </>
              ) : (
                <PatientsList
                  data={pacientsData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <ButtonComponent
                      type="default"
                      title={item.fullName}
                      nameIcon="chevron-right"
                      sizeIcon={25}
                      onPress={() => navigation.navigate('PatientDetails', { patient: item })}
                    />
                  )}
                  ItemSeparatorComponent={() => <Separator />}
                />
              )}
            </ContainerList>
          </Content>
        </ControllerView>
      </BackgroundContent>
    </Container>
  );
}
