/* eslint-disable no-console */
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Button} from '@components/Button';
import {ButtonBlack} from '@components/ButtonBlack';
import {Input} from '@components/Input';
import InputPassword from '@components/InputPassword';

import axios from 'axios';
import {useAuth} from '../../contexts/useAuth';
import {
  Container,
  ContainerView,
  Label,
  Title,
  Strong,
  ContainerViewButton,
  ContainerViewLabel,
  ResetText,
  ContainerViewLogo,
} from './styles';

export function Login() {
  // const baseUrl = 'https://api-connect.i4happ.com.br/dev';
  // const endpoint = '/auth/login';
  // const dataSend = { email: 'tele@i4h.com.br', password: 'Mudar@123' };
  const [isLogging] = useState(false);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {signIn} = useAuth();

  const {control, handleSubmit} = useForm();

  function handleSignIn() {
    navigate('routesmenu');
  }

  const dataSend = {
    UsuarioEmail: 'gdruidasilva@gmail.com',
    UsuarioSenha: '123123',
    UsuarioProvider: 1,
  };
  // const baseUrl = 'https://servicosonlineq.cpfl.com.br:8443/agencia-webapi/api/chatboot/';
  const baseUrl =
    'http://servicosonlineq.cpfl.com.br:7171/agencia-webapi/api/chatboot/';
  // const baseUrl = 'http://servicosonlineq.cpfl.com.br:7171/agencia-webapi/api/criptografia';
  // const baseUrl = 'https://servicosonlineq.cpfl.com.br:7173/agencia-webapi/api/criptografia';
  // const baseUrl = 'http://servicosonlineq.cpfl.com.br:7377/agencia-webapi/api/criptografia';
  // const baseUrl = 'https://servicosonline.cpfl.com.br/agencia-webapi/api/criptografia';
  // const baseUrl = 'https://servicosonlineq.cpfl.com.br:8443/agencia-webapi/api/criptografia';
  //  const baseUrl = 'https://servicosonlineq.cpfl.com.br:8443/agencia-webapi/api/chatboot/';
  // const baseUrl = 'https://servicosonline.cpfl.com.br/agencia-webapi/api/chatboot/';

  // const endpoint = 'retorna-desliga-programado';
  // const endpoint = '';
  const authorization =
    'MIIFyzCCA7OgAwIBAgIQXnH1NvyZbrRFeRAA0yYAIzANBgkqhkiG9w0BAQsFADBZMRIwEAYKCZImiZPyLGQBGRYCYnIxEzARBgoJkiaJk/IsZAEZFgNjb20xFDASBgoJkiaJk/IsZAEZFgRjcGZsMRgwFgYDVQQDEw9DUEZMIEVuZXJnaWEgQ0EwHhcNMTkwNTMwMTcwOTAyWhcNMjkwNTMwMTcxODU5WjBZMRIwEAYKCZImiZPyLGQBGRYCYnIxEzARBgoJkiaJk/IsZAEZFgNjb20xFDASBgoJkiaJk/IsZAEZFgRjcGZsMRgwFgYDVQQDEw9DUEZMIEVuZXJnaWEgQ0EwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCXvA136Mw5SD8icoABfop2NTIHWMEsw6C/6Mtq5r/BTZoDXkzgq8izeyODb1HZVYsCR3gjDSdhYPmMDK5Hxxkz10x3rpDZ/UXN/YhQzRXpE+I8ISUUtjxumyuwZBwqhyhA0l5SWuLb9OSPcI8wjcNvIGUyNtfIN0zOZp61TnsvPgnMAbD0MIIkHKKTiCZ2KQGuV89SJqX8+D6W/z5NHBwC3wdTLIfJAp6tImboSmBI5Iq2QIcTDHDTS7fNsb5LKcFcVk0QcuGpQREB4Mgzlc2hyiDLUrqlt9A8OVh0X0hjvMOzM814/FOywSk0FPnFF7ied0Aa8p7PYFXRRBplT43ZF6cXBTzBTD8UM7OelpWIlIibzMYQz+v38AEKzHmkJx46eFWJKkEBG4dEh8ZIAqT9o6omw87H33+l/SWRRo+5aONvNMYkcL8A2aF27mTcFG2Hw8Z9hqBL7LixydEqbAURyVicKHlAk2VYOCNOIQQkjdm4CvQSYEwC8GzlIS+pNQwgZDaLE2g6ta83AUHbD86TNcOQUc2hqhRzAtKmyPuQEiqlWmO7LxHao6eNwF9CfNTeZm4IPEYItnR7lTfv92AmaaPhPIJ8RAuE+2jUw0Yvh+zXzvhU5KWWu8ePg1jlZNWHONa0yJlpzIVWRyPmbHhlMoegmnJuVPt1ri1RF4v95wIDAQABo4GOMIGLMBMGCSsGAQQBgjcUAgQGHgQAQwBBMAsGA1UdDwQEAwIBhjAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTi23KVGVN873KfE4uIW8sGZl2X3TASBgkrBgEEAYI3FQEEBQIDAQABMCMGCSsGAQQBgjcVAgQWBBTpDjoscWom9hbZXfvGR1JQFgXsczANBgkqhkiG9w0BAQsFAAOCAgEAO+Q7hDWHc1wUlUAhzA7pwIdGbdZM4LnE3Do6fzL0fI9AOSmcCgUFIzyTcmEfZiamXY87Gh5SAn/u0+ChfFW0agO3wOsqoPCIlLDQyw7BunFL7C8YVzsw4ekqeV+Dpwx1nBL3XrlDN0esv8eLwARfip7V7ulgJX2TOHb2urT08EGovZA2HKcY/UYv9/DUlIdKbf3SzpeVNiTIj58VydoKEY3XckZ7RrWmvDg6q4rAN+xTKFa9laY7ncV4ICjCIucYJtajR/7eNa2WJY13nefh/SxUCNPuCUw0grmpjXn/iDVOYKYfmqlx7UPyhpR89z763pzOHSOaHy+dr+P9JPM5GFBXFc5NH5LjZB+LBWKqHEtm3BTKcRey3uVuFOtV7GCbZbBFKlJ0Dg7KQxpQStUgMOqsbs6WcmOVv6sHgt20pFM+hIwoVhIvfKPX9HhWQwKq5H9R3gSweNb66UmyXDulw8ExhHQa0DKsbsBVXGIVsvruufTDj30FDOIkZHE55/7xpy9vBeFPG8sYuEny8noflbC2TF5icXJtiXwdgsaIn2bH7YcqmAeMc10slw891JemXp849GbQ/qLAr95Sbvis9xoDe4JvaziwP7Zm9wTvnEgaDAIIa8hc+sYTO0nkbW9Wump2OpO6hsHv4+iDPoMCr/d8lojynSQjZ5kGRkJW4OE=';
  const endpoint = 'login-app';
  // const dataSend = {
  //   Instalacao: '3081583850',

  //   DataInicial: '01/07/2020',

  //   DataFinal: '30/07/2020',
  // };
  const callApi = async (data: any) => {
    try {
      await axios
        .post(`${baseUrl}${endpoint}`, data, {
          // headers: {
          //   Authorization: authorization,
          //   // Profile: 'Teleatendimento',
          // },
          headers: {
            // Accept: 'application/json',
            clienId: 'agencia-virtual-cpfl-bot',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then(response => {
          console.log('Response:', response);
        })
        .catch(e => {
          console.log('Error: ', e);
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error: ', e);
    }
  };
  const handleCallApi = async () => {
    console.log('Call -------');
    try {
      const response = await callApi(dataSend)
        .then(data => console.log('Data: ', data))
        .catch(e => console.log('Error: ', e));
      console.log('Response: ', response);
    } catch (e) {
      console.log('Error: ', e);
    }
    console.log('end Call -------');
  };
  // const apiclient =()

  // const api = axios.create({
  //   baseURL: 'http://servicosonlineq.cpfl.com.br:7171/agencia-webapi/api/chatboot/',
  //   proxy: {
  //     host: '192.168.0.4',
  //     port: 8081,
  //   },
  //   headers: {
  //     // Accept: 'application/json',
  //     clienId: 'agencia-virtual-cpfl-bot',
  //     'Content-Type': 'pplication/x-www-form-urlencoded',
  //   },
  // });

  // const handleSignUp = async (data: any) => {
  //   try {
  //     const response = await api.post('login-app', data);
  //     console.log('data', response.data);
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  //   // const dataUser = {
  //   //   UsuarioEmail: 'gdruidasilva@gmail.com',
  //   //   UsuarioSenha: '123123',
  //   //   UsuarioProvider: 1,
  //   // };
  //   // console.log('-------', data);
  //   // dispatch(authRequest(dataUser));
  //   // // signIn(dataUser);
  // };

  return (
    <Container>
      <ContainerView>
        <ContainerViewLogo>
          <Image source={require('../../assets/Logo_CPFL_Energia.png')} />
        </ContainerViewLogo>
        <ContainerViewLabel>
          <Label>Faça abaixo o seu</Label>
          <Title>Login</Title>
          <Controller
            control={control}
            name="UsuarioEmail"
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Endereço de e-mail"
                type="secondary"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="UsuarioSenha"
            render={({field: {onChange, value}}) => (
              <InputPassword
                placeholder="Senha"
                type="secondary"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </ContainerViewLabel>
        <TouchableOpacity
          onPress={() => navigate('resetpassword')}
          style={{marginLeft: 10, marginBottom: 20}}>
          <ResetText>Esqueceu sua senha ou deseja trocá-la?</ResetText>
        </TouchableOpacity>
        <ContainerViewButton>
          <Button
            title="Entrar"
            type="secondary"
            // onPress={handleSubmit(handleSignUp)}
            onPress={handleCallApi}
            isLoading={isLogging}
          />
          <Strong>Ou</Strong>
          <ButtonBlack
            title="Login pelo Facebook"
            type="primary"
            onPress={() => ''}
            isLoading={isLogging}
          />
          <View style={{height: 30}} />
          <ButtonBlack
            title="Login pelo Google"
            type="secondary"
            onPress={() => ''}
            isLoading={isLogging}
          />
        </ContainerViewButton>
      </ContainerView>
    </Container>
  );
}
