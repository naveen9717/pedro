import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
// import {Feather} from '@expo/vector-icons';
import {
  Container,
  ContainerBottom,
  ContainerMenu,
  ContainerMenuBottom,
  ContainerMenuForm,
  ContainerMenuFormLabel,
  ContainerMenuLabel,
  ContainerMenuText,
  ContainerMenuTitle,
  Footer,
  IconMenu,
} from './styles';

function CustomMenu() {
  const {navigate} = useNavigation();

  // function hadleNavigatePagaments() {
  //   // navigate('Pagaments');
  // }

  // function hadleNavigateSuporte() {
  //   // navigate('Suporte')
  // }

  function handleNavigatToConfiguration() {
    navigate('configuration');
  }
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <ContainerMenuForm>
          <ContainerMenu>
            <ContainerBottom
              onPress={() => navigation.dispatch(DrawerActions.closeDrawer)}>
              {/* <Feather name="arrow-left" size={23} color="#ffff" /> */}
            </ContainerBottom>
            <ContainerMenuBottom>
              <ContainerMenuTitle>Olá, Gustavo!</ContainerMenuTitle>
              <ContainerMenuLabel>Instalação: 0123456789</ContainerMenuLabel>
            </ContainerMenuBottom>
          </ContainerMenu>
        </ContainerMenuForm>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('../../assets/images/person.png')}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Meus dados</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('../../assets/images/iconSquare.png')}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Serviços</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('../../assets/images/square.text.square.png')}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Meus pedidos</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('../../assets/images/square.3.layers.3d.down.right.png')}
          />
          <TouchableOpacity
            onPress={() => navigate('login')}
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Instalações</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('../../assets/images/personquestionmark.png')}
          />
          <TouchableOpacity
            onPress={() => navigate('login')}
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Ajuda</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>
      </Container>

      <Footer>
        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('../../assets/images/gearshape.png')}
          />
          <TouchableOpacity
            onPress={handleNavigatToConfiguration}
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Configurações</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('../../assets/images/ipad.and.arrow.forward-1.png')}
          />
          <TouchableOpacity
            onPress={() => navigate('welcome' as never)}
            // onPress={() => navigate('login')}
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Sair</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>
      </Footer>
    </>
  );
}
export default CustomMenu;
