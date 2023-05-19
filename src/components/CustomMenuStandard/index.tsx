import React from 'react';
import {TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  ContainerBottom,
  ContainerMenu,
  ContainerMenuBottom,
  ContainerMenuForm,
  ContainerMenuFormLabel,
  ContainerMenuText,
  ContainerMenuTitle,
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

  // function handleNavigatToConfiguration() {
  //   navigate('configuration');
  // }
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
              <ContainerMenuTitle>Seja bem-vindo!</ContainerMenuTitle>
              {/* <ContainerMenuLabel>Instalação: 0123456789</ContainerMenuLabel> */}
            </ContainerMenuBottom>
          </ContainerMenu>
        </ContainerMenuForm>

        <ContainerMenuFormLabel>
          <Ionicons name="person-circle-outline" color="#02ade1" size={25} />
          <TouchableOpacity
            onPress={() => navigate('welcome')}
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Home</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
        <Ionicons name="grid" color="#02ade1" size={25} />
          <TouchableOpacity
            onPress={() => navigate('login')}
            style={{
              paddingHorizontal: 20,
            }}>
            <ContainerMenuText>Login</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        {/* <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('@assets/images/square.text.square.png')}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
            }}
          >
            <ContainerMenuText>Meus pedidos</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('@assets/images/square.3.layers.3d.down.right.png')}
          />
          <TouchableOpacity
            onPress={() => navigate('login')}
            style={{
              paddingHorizontal: 20,
            }}
          >
            <ContainerMenuText>Instalações</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('@assets/images/personquestionmark.png')}
          />
          <TouchableOpacity
            onPress={() => navigate('login')}
            style={{
              paddingHorizontal: 20,
            }}
          >
            <ContainerMenuText>Ajuda</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel> */}
      </Container>
      {/* 
      <Footer>
        <ContainerMenuFormLabel>
          <IconMenu resizeMode="contain" source={require('@assets/images/gearshape.png')} />
          <TouchableOpacity
            onPress={handleNavigatToConfiguration}
            style={{
              paddingHorizontal: 20,
            }}
          >
            <ContainerMenuText>Configurações</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>

        <ContainerMenuFormLabel>
          <IconMenu
            resizeMode="contain"
            source={require('@assets/images/ipad.and.arrow.forward-1.png')}
          />
          <TouchableOpacity
            onPress={() => navigate('welcome' as never)}
            // onPress={() => navigate('login')}
            style={{
              paddingHorizontal: 20,
            }}
          >
            <ContainerMenuText>Sair</ContainerMenuText>
          </TouchableOpacity>
        </ContainerMenuFormLabel>
      </Footer> */}
    </>
  );
}
export default CustomMenu;
