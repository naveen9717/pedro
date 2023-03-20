import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  SafeAreaView,
  Switch,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Load} from '../../components/Button/styles';

import {useIsFocused} from '@react-navigation/native';
// import {Button} from '@components/Button';
// import {ButtonBlack} from '@components/ButtonBlack';
// import {Input} from '@components/Input';
// import InputPassword from '@components/InputPassword';
import {useDispatch, useSelector} from 'react-redux';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  Container,
  ContainerView,
  Label,
  Title,
  ContainerViewButton,
  ContainerViewLabel,
  ResetText,
  ContainerViewLogo,
  ContainerLoading,
} from './styles';
import {Strong} from '../../components/Generic/index';
import {AuthContext, AuthContextProps} from '../../contexts/useAuth';
import {ButtonBlack} from '../../components/ButtonBlack';
import {Input} from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import {Button} from '../../components/Button';
import {AlertModal} from '../../components/Modal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';
// import {USER_INSTALL_ALL_DATA} from '../../redux/actions/actionsTypes';
import TouchID from 'react-native-touch-id';
import {Routes} from '../../routes';
import {RootState} from '../../redux/reducer';
import {ASK_BIOMETRY} from '../../redux/actions/actionsTypes';
import {version} from '../../helpers/version';

interface UserLoginProps {
  email: string;
  password: string;
}

export function Login({route}) {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {signIn, signInGoogle, signInFacebook} = useContext(
    AuthContext,
  ) as AuthContextProps;
  const isFocused = useIsFocused();
  // const [hasBiometric, setHasBiometric] = useState<boolean>(false);
  // const [checkBiometry, setCheckBiometry] = useState<boolean>(true);

  // useEffect(() => {
  //   dispatch({ type: USER_INSTALL_ALL_DATA, data: {} });
  // }, []);
  const [shoModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<{title: string; msg: string}>({
    title: '',
    msg: '',
  });
  const [switchV, setSwitchV] = useState(false);
  const hideLoading = () => setIsLoading(false);
  const modalShow = () => setShowModal(true);
  const infoModal = (
    msgIfnfo: React.SetStateAction<{title: string; msg: string}>,
  ) => setModalInfo(msgIfnfo);

  const ModalLoading = (loading: boolean) => {
    if (loading) {
      return (
        <ContainerLoading>
          <Load />
        </ContainerLoading>
      );
    }
  };
  // const askBiometry: boolean = useSelector(
  //   (state: RootState) => state.AskBiometry.askBiometry,
  // );
  const optionalConfigObject = {
    title: 'Autenticação necessária', // Android
    imageColor: '#2e2e38', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Sensor de toque', // Android
    sensorErrorDescription: 'Falhou', // Android
    cancelText: 'Cancelar', // Android
    fallbackLabel: 'Mostrar código de acesso', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.emailLogin) {
      errors.emailLogin = 'O campo email deve ser preenchido.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailLogin)
    ) {
      errors.emailLogin = 'Formato de email inválido.';
    }
    if (!values.passLogin) {
      errors.passLogin = 'O campo senha deve ser preenchido.';
    }
    return errors;
  };

  const saveUserLogin = async (email: string, password: string) => {
    const userLogin = {email, password};
    await AsyncStorage.setItem('@CPFL:userlogin', JSON.stringify(userLogin));
  };

  const getUserLogin = async () => {
    AsyncStorage.getItem('@CPFL:userlogin', (err, result) => {
      const USER_LOGIN: UserLoginProps = JSON.parse(result as string);
      if (result && !err) {
        // console.log('UserLogin: ', USER_LOGIN);
        formik.setFieldValue('emailLogin', USER_LOGIN.email);
        formik.setFieldValue('passLogin', USER_LOGIN.password);

        if (
          USER_LOGIN.email &&
          USER_LOGIN.password &&
          route?.params?.cameRoute !== 'loggedInWebView' &&
          route?.params?.cameRoute !== 'selectInstallation'
        ) {
          TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
              // Success code
              // if (biometryType === 'FaceID') {
              //   console.log('FaceID is supported.');
              // } else {
              //   console.log('TouchID is supported.');
              // }
              TouchID.authenticate(
                'Deseja salvar as suas informações?',
                optionalConfigObject,
              )
                .then(() => {
                  formik.handleSubmit();
                })
                .catch((error: any) => {
                  console.log('Auth Failed: ', error);
                });
            })
            .catch(error => {
              // formik.handleSubmit();
              console.log(error);
            });
        }
      }
    });
  };

  const saveSwitchValue = async (value: boolean) => {
    // const userLogin = {email, password};
    await AsyncStorage.setItem('switch', JSON.stringify(value));
  };

  const getSwitchValue = async () => {
    AsyncStorage.getItem('switch', (err, result) => {
      const SWITCH: boolean = JSON.parse(result as string);
      if (result && !err) {
        setSwitchV(SWITCH);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      emailLogin: '',
      passLogin: '',
    },
    validate,
    onSubmit: (values: {emailLogin: any; passLogin: any}, {resetForm}: any) => {
      const params = {
        UsuarioEmail: values.emailLogin.trim(),
        UsuarioSenha: values.passLogin,
        UsuarioProvider: 1,
      };

      setIsLoading(true);

      signIn(params, resetForm, hideLoading, dispatch, modalShow, infoModal);

      const user = switchV ? values.emailLogin : '';
      const pass = switchV ? values.passLogin : '';

      saveUserLogin(user, pass);
      saveSwitchValue(switchV);
    },
  });

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const params = {
        UsuarioGoogle: userInfo?.idToken,
        UsuarioProvider: 2,
      };
      setIsLoading(true);
      signInGoogle(params, hideLoading, dispatch, modalShow, infoModal);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancelado', error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('IN_PROGRESS', error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE', error.code);
      } else {
        console.log('Other');
        // some other error happened
      }
    }
  }

  async function onFacebookButtonPress() {
    try {
      LoginManager.setLoginBehavior('web_only');
      await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited',
        'my_nonce',
      );

      if (Platform.OS === 'ios') {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        const params = {
          UsuarioFacebook: result?.authenticationToken,
          UsuarioProvider: 3,
        };
        // console.log('Facebookparams', params);
        signInFacebook(params, hideLoading, dispatch, modalShow, infoModal);
      } else {
        const result = await AccessToken.getCurrentAccessToken();

        const params = {
          UsuarioFacebook: result?.accessToken,
          UsuarioProvider: 3,
        };
        // console.log('Facebookparams', params);
        signInFacebook(params, hideLoading, dispatch, modalShow, infoModal);
      }
    } catch (error) {
      console.log('catch', error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      getUserLogin();
      getSwitchValue();
    }
  }, [isFocused]);

  useEffect(() => {
    if (formik.values.emailLogin) {
      formik.setFieldValue('emailLogin', formik.values.emailLogin.trim());
    }
  }, [formik.values.emailLogin]);

  const [firstClick, setFirstClicked] = useState(false);

  const handleClick = () => {
    if (!firstClick) {
      formik.validateForm();
    }
    setFirstClicked(true);
    if (!formik.errors.emailLogin && !formik.errors.passLogin) {
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          // if (biometryType === 'FaceID') {
          //   console.log('FaceID is supported.');
          // } else {
          //   console.log('TouchID is supported.');
          // }
          TouchID.authenticate(
            'Deseja salvar as suas informações?',
            optionalConfigObject,
          )
            .then((success: boolean) => {
              formik.handleSubmit();
            })
            .catch((error: any) => {
              console.log('Auth Failed: ', error);
            });
        })
        .catch(error => {
          formik.handleSubmit();
          console.log(error);
        });
    }
    // dispatch({type: ASK_BIOMETRY, askBiometry: true});
    // formik.handleSubmit();
  };

  const handleModal = () => {
    setShowModal(!shoModal);
  };

  const handleSwitchChange = (v: boolean) => {
    setSwitchV(v);
  };

  const text = `Está com dúvidas ou teve\ndificuldades em acessar? `;
  return (
    <>
      <SafeAreaView />
      <Container>
        <ContainerView>
          <ContainerViewLogo>
            <Image source={require('../../assets/Logo_CPFL_Energia.png')} />
          </ContainerViewLogo>
          <ContainerViewLabel>
            <Label>Faça abaixo o seu</Label>
            <Title>Login</Title>
            {/* <TextInput
            placeholder="Endereço de e-mail"
            // type="secondary"
            onBlur={formik.handleBlur('emailLogin')}
            onChangeText={formik.handleChange('emailLogin')}
            value={formik.values.emailLogin}
          /> */}
            <View
              style={{
                marginBottom: formik.errors.emailLogin && firstClick ? 8 : 22,
              }}>
              <Input
                name="emailLogin"
                placeholder="Endereço de e-mail"
                type="secondary"
                autoCorrect={false}
                autoCapitalize="none"
                onBlur={formik.handleBlur('emailLogin')}
                onChangeText={formik.handleChange('emailLogin')}
                value={formik.values.emailLogin}
              />
              {formik.errors.emailLogin && firstClick && (
                <Text style={{fontSize: 12, height: 14}}>
                  * {formik.errors.emailLogin}
                </Text>
              )}

              {/* <Text style={{fontSize: 12}}>
              {formik.errors.emailLogin && firstClick
                ? `* ${formik.errors.emailLogin}`
                : ''}
            </Text> */}
            </View>
            <View
              style={{
                marginBottom: formik.errors.emailLogin && firstClick ? 28 : 42,
              }}>
              <InputPassword
                placeholder="Senha"
                type="secondary"
                onChangeText={formik.handleChange('passLogin')}
                value={formik.values.passLogin}
                valid={false}
              />
              {formik.errors.passLogin && firstClick && (
                <Text style={{fontSize: 12, height: 14}}>
                  * {formik.errors.passLogin}
                </Text>
              )}
              {/* <Text style={{fontSize: 12}}>
              {formik.errors.passLogin && firstClick
                ? `* ${formik.errors.passLogin}`
                : ''}
            </Text> */}
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    paddingRight: 10,
                    paddingTop: 10,
                    alignSelf: 'center',
                  }}>
                  Salvar senha
                </Text>
                <Switch
                  onValueChange={v => handleSwitchChange(v)}
                  // onChange={v => handleSwitchChange(v)}
                  value={switchV}
                  style={{marginTop: 12}}
                />
              </View>
            </View>
          </ContainerViewLabel>
          <TouchableOpacity
            onPress={() => navigate('Tabs' as never)}
            style={{marginLeft: 10, marginBottom: 20}}>
            <ResetText>Esqueceu sua senha ou deseja trocá-la?</ResetText>
          </TouchableOpacity>
          <ContainerViewButton>
            <Button
              title="Entrar"
              type="secondary"
              onPress={handleClick}
              // isLoading={isLoading}
            />
            <View style={{marginTop: 40}}>
              <Text style={{lineHeight: 24, fontSize: 18}}>
                {text}
                <Text
                  onPress={() =>
                    Linking.openURL(
                      'https://www.cpfl.com.br/novoaplicativo' as string,
                    )
                  }
                  style={{textDecorationLine: 'underline'}}>
                  Clique e saiba mais
                </Text>
              </Text>
            </View>
            {/* <Strong>Ou</Strong>
            <ButtonBlack
              title="Login pelo Facebook"
              type="primary"
              onPress={onFacebookButtonPress}
              source={require('../../assets/icons/IconsFacebook.png')}
            />
            <View style={{height: 30}} />
            <ButtonBlack
              title="Login pelo Google"
              type="secondary"
              onPress={onGoogleButtonPress}
              source={require('../../assets/icons/IconsGoogle.png')}
            /> */}
          </ContainerViewButton>
        </ContainerView>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
            // backgroundColor: '#fff',
            padding: Platform.OS === 'ios' ? 40 : 0,
          }}>
          <Text>{version}</Text>
        </View>

        <AlertModal
          showModal={shoModal}
          setShowModal={handleModal}
          msg={modalInfo.msg}
          title={modalInfo.title}
        />
      </Container>
      {ModalLoading(isLoading)}
      <SafeAreaView />
    </>
  );
}
