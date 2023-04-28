import React, {useContext, useEffect, useState} from 'react';

// import { Button } from '@components/Button';
// import { Input } from '@components/Input';

import {
  Container,
  ContainerView,
  ContainerViewButton,
  ContainerViewLabel,
} from './styles';
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {SafeAreaView, Text, View} from 'react-native';
import {useTheme} from 'styled-components/';
import {useFormik} from 'formik';
import {
  RegistrationFormData,
  RegistrationInitialData,
  RegistrationTypeData,
} from '../../../models/components/registration/registrationData';
import {RegistrationTitle} from '../../../components/Registration/RegistrationTitle';
import {RegistrationFactory} from '../../../models/components/registration/factory';
import {RegistrationInfo} from '../../../components/Registration/RegistrationInfo';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducer';

import {validateFormErrors} from '../../../helpers/functions/validators/errors';
import {DecodedB2cData} from '../../../models/b2c/data';
import {AuthContext, AuthContextProps} from '../../../contexts/useAuth';
import {useNavigation} from '@react-navigation/native';
import {AlertModal} from '../../../components/Modal/AlertModal';
import {myPublicIP} from '../../../helpers/functions/net';
import {UserInstBffDataReducer} from '../../../models/reducer/userDataInstall';
import {UserDataCreate} from '../../../models/userDataInstall/userDataInstallData';

// interface FinishRegistrationProps {
//   type: RegistrationTypeData;
// }

export function FinishRegistration() {
  const {getUserBffDataCPF, createBffUser, updateBffUser} = useContext(
    AuthContext,
  ) as AuthContextProps;
  const [isLogging] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const b2cData: DecodedB2cData = useSelector((state: RootState) => state.B2C);
  const userData: UserInstBffDataReducer = useSelector(
    (state: RootState) => state.UserBffDataInstall,
  );
  const regType: RegistrationTypeData = useSelector(
    (state: RootState) => state.RegistrationType.regType,
  );
  const [step, setStep] = useState(0);
  const [data, setData] = useState<
    [RegistrationFormData[], RegistrationInitialData]
  >(
    RegistrationFactory.makeRegistrationFields(
      regType,
      step,
      b2cData?.email,
      userData.data,
      // userData.data.numeroCelular,
      // userData.data.dataNascimento,
      // userData.data.documentoIdentificacao.numero,
      // userData.data.documentoIdentificacao.tipoDocumentoIdentificacaoId,
    ),
  );
  const [firstClick, setFirstClick] = useState(false);
  const handleFirstClick = () => {
    setFirstClick(true);
  };

  const [clicked, setClicked] = useState(false);
  console.log('CLICKED FOOOORAAAAAAAAAA!: ', clicked);
  // const handleClicked = () => {
  //   setClicked(true);
  //   console.log('CLICKED!!!!: ', clicked);
  // };
  const [modalInfo, setModalInfo] = useState<{title: string; msg: string}>({
    title: '',
    msg: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [myIp, setMyIp] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const getIp = async () => {
    // const userLogin = {email, password};
    let ip = await myPublicIP();
    // return ip;
    setMyIp(ip);
  };
  useEffect(() => {
    if (step && step > 0) {
      setFirstClick(false);
    }
  }, [step]);

  const validate = (values: any) => {
    let errors: any = {};

    let localData: string[];

    if (
      (regType === 'instalation' || regType === 'notInstalation') &&
      step === 0
    ) {
      localData = ['email', 'cpf'];
    } else if (regType === 'instalation' || regType === 'migrated') {
      localData = [
        'email',
        'cpf',
        'name',
        'phone',
        'birthdate',
        'doc',
        'termoMaioridade',
        'termoAceite',
        'termoCompartilhamento',
        'politicaPrivacidade',
      ];
    } else {
      localData = [
        'email',
        'cpf',
        'name',
        'phone',
        'termoMaioridade',
        'termoAceite',
        'termoCompartilhamento',
        'politicaPrivacidade',
      ];
    }
    errors = validateFormErrors(localData, values);
    console.log('ERRORSSSSSSSSSSS: ', errors);
    console.log('Clicked dentro: ', clicked);
    if ((step > 0 || regType === 'migrated') && firstClick) {
      if (clicked) {
        console.log('ENTROUUUUUUUUUU!!!');

        let termsErrors = '';
        let contTermsError = 0;
        if (errors?.termoMaioridade) {
          contTermsError += 1;
          termsErrors += '- termo de maioridade\n';
        }

        if (errors?.termoAceite) {
          contTermsError += 1;
          termsErrors += '- termo de aceite\n';
        }

        if (errors?.politicaPrivacidade) {
          contTermsError += 1;
          termsErrors += '- termos de uso e aviso de privacidade';
        }
        console.log('TERMS errorrrrrr: ', termsErrors);

        if (contTermsError > 0) {
          if (contTermsError === 1) {
            termsErrors =
              'Você deve aceitar o seguinte termo:\n\n' + termsErrors;
          } else {
            termsErrors =
              'Você deve aceitar os seguintes termos:\n\n' + termsErrors;
          }
          setModalInfo({
            title: 'Obrigatório o aceite de termos',
            msg: termsErrors,
          });
          setShowModal(true);
          setClicked(false);
        }
      }
    }

    return errors;
  };

  console.log('CPF no finish registration', userData.data.cpf);
  console.log('DATA: ', userData);
  // >([[], {}]);
  useEffect(() => {
    console.log('Registration TYPE!!!: ', regType);
    console.log('Registration TYPE STEP!!!: ', step);
    console.log('Registration TYPE STEP!!!: ', b2cData?.email);
    console.log('Registration TYPE STEP!!!: ', userData?.data?.cpf);
    if (b2cData?.email) {
      setData(
        RegistrationFactory.makeRegistrationFields(
          regType,
          step,
          b2cData?.email,
          userData?.data,
        ),
      );
    }
  }, [regType, step, b2cData?.email, userData]);

  const formik = useFormik({
    initialValues: data[1],

    validate,
    onSubmit: (values, {resetForm}) => {
      // const params = RegistrationFactory.makeRegistrationParamsData(
      //   step,
      //   regType,
      //   values,
      // );
      if (step === 0 && regType !== 'migrated') {
        console.log('Get CPF Info');
        getUserBffDataCPF(
          dispatch,
          navigation,
          setModalInfo,
          setShowModal,
          values.cpf.replace(/\./g, '').replace(/-/g, '') as string,
          b2cData.sub,
        );
      } else {
        const sendData =
          RegistrationFactory.makeRegistrationUpdateCreateUserData(
            values,
            b2cData.sub,
            myIp,
            regType === 'migrated' ? userData.data.id : undefined,
            regType === 'migrated' ? 'update' : 'create',
          );
        console.log('MY IPPPPPPP!: ', myIp);
        if (regType === 'instalation' || regType === 'migrated') {
          console.log('DataType: ', regType);
          console.log('Valida os dados no SAP: ', sendData);
          updateBffUser(
            dispatch,
            navigation,
            setModalInfo,
            setShowModal,
            sendData as UserDataCreate,
            b2cData.sub,
          );
        } else {
          console.log('Cria novo usuário com dados simples: ', sendData);
          createBffUser(
            dispatch,
            navigation,
            setModalInfo,
            setShowModal,
            sendData as UserDataCreate,
            b2cData.sub,
          );
        }
      }
      if (step < 1) {
        setStep(step + 1);
      }
    },
  });
  const {COLORS} = useTheme();

  const shareAccept = 'Desejo aceitar os termos de compartilhamento (opcional)';

  const privacyAccept = 'Concordo com os Termos de uso e Aviso de Privacidade';

  const acceptTerm = 'Concordo com o Termo de Aceite';

  const notUnderAge = 'Concordo com o Termo de Maioridade';

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <AlertModal
        showModal={showModal}
        setShowModal={handleModal}
        msg={modalInfo.msg}
        title={modalInfo.title}
      />
      <SafeAreaView style={{flex: 0, backgroundColor: COLORS.PRIMARY_800}} />

      <Container>
        <ContainerView>
          <ContainerViewLabel>
            <RegistrationTitle type={regType} setStep={setStep} step={step} />
            {data[0].map(d => {
              if (d?.fieldType !== 'radio') {
                return (
                  <>
                    <View style={{paddingBottom: 11}}>
                      <Input
                        dataType={d.dataType}
                        key={d.name}
                        name={d.name}
                        marginBottom="5px"
                        placeholder={d.placeholder}
                        type={'secondary'}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onBlur={formik.handleBlur(d.name)}
                        onChangeText={formik.handleChange(d.name)}
                        value={formik.values[d.name]}
                        editable={d.editable}
                      />

                      <Text style={{fontSize: 12, height: 14}}>
                        {formik.errors[d.name] && firstClick
                          ? `* ${formik.errors[d.name]}`
                          : ''}
                      </Text>
                      {/* )} */}
                    </View>
                  </>
                );
              }
            })}
            <RegistrationInfo type={regType} step={step} />
            {(regType === 'migrated' || step === 1) && (
              <>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 15,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={formik.values.termoCompartilhamento}
                    onValueChange={newValue =>
                      formik.setFieldValue('termoCompartilhamento', newValue)
                    }
                  />
                  <Text style={{fontSize: 14, lineHeight: 19, marginLeft: 14}}>
                    {shareAccept}
                  </Text>
                </View>

                <View
                  style={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 30,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={formik.values.politicaPrivacidade}
                    onValueChange={newValue =>
                      formik.setFieldValue('politicaPrivacidade', newValue)
                    }
                  />
                  <Text style={{fontSize: 15, lineHeight: 19, marginLeft: 14}}>
                    {privacyAccept}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 15,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={formik.values.termoAceite}
                    onValueChange={newValue =>
                      formik.setFieldValue('termoAceite', newValue)
                    }
                  />
                  <Text style={{fontSize: 14, lineHeight: 19, marginLeft: 14}}>
                    {acceptTerm}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 15,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={formik.values.termoMaioridade}
                    onValueChange={newValue =>
                      formik.setFieldValue('termoMaioridade', newValue)
                    }
                  />
                  <Text style={{fontSize: 14, lineHeight: 19, marginLeft: 14}}>
                    {notUnderAge}
                  </Text>
                </View>
              </>
            )}
          </ContainerViewLabel>
          <ContainerViewButton>
            <Button
              title="Avançar"
              type="secondary"
              onPress={() => {
                formik.handleSubmit();
                setClicked(true);
                handleFirstClick();
                getIp();
              }}
              isLoading={isLogging}
            />
          </ContainerViewButton>
        </ContainerView>
      </Container>
      <SafeAreaView />
    </>
  );
}
