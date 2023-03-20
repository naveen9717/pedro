import React, {createContext, ReactNode, useContext, useState} from 'react';
import {clearAccessToken} from '../../shared/lib';
import {navigate} from '../../config/rootNavigation';
import {FormikState} from 'formik';
import {
  B2C_DATA,
  BFF_AUTH_IS_LOADING,
  REGISTRATION_TYPE,
  USER_INSTALL_ALL_DATA,
  USER_INSTALL_BFF_ALL_DATA,
} from '../../redux/actions/actionsTypes';
import {installSelect} from '../../service/select-install';
import {getData} from '../../helpers/functions/utils';
import {ApiToken} from '../../service/token';
import {userApi} from '../../config/access';
import {AxiosClient} from '../../service/axios-client';
import {baseUrl} from '../../service/utils/urls';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AnyAction, Dispatch} from 'redux';
import {AuthorizeResult} from 'react-native-app-auth';
import {DecodedB2cData} from '../../models/b2c/data';
import {AuthManager} from '../../service/azureB2C/AuthManager';
import {ApiUser} from '../../service/user';
import {InstalationAdapter} from '../../models/components/selectInstalation/adapter';
import {
  UserDataCreate,
  UserDataUpdate,
} from '../../models/userDataInstall/userDataInstallData';

// import {UserInstEmailCpfError, UserInstEmailCpfSuccess} from '../../models/userDataInstall/userDataInstallData';
type SetModalInfo = {title: string; msg: string};

export interface AuthContextProps {
  user: {UsuarioId: string};
  isAuthenticated: boolean;
  b2cLogin: (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    // handleIsLoading: (value: boolean) => void,

    // params: {
    //   UsuarioEmail: string;
    //   UsuarioSenha: string;
    //   UsuarioProvider: number;
    // },
    // resetForm: (
    //   nextState?:
    //     | Partial<FormikState<{emailLogin: string; passLogin: string}>>
    //     | undefined,
    // ) => void,
    // hideLoading: () => void,
    // modalShow?: () => void,
    // modalInfo?: (msg: any) => void,
    // setModalTitle: any,
  ) => Promise<void>;
  getUserBffDataCPF: (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    cpf: string,
    tokenB2c: string,
  ) => Promise<void>;

  updateBffUser: (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    params: UserDataUpdate,
    tokenB2c: string,
  ) => Promise<void>;
  createBffUser: (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    params: UserDataCreate,
    tokenB2c: string,
  ) => Promise<void>;
  signIn: (
    params: {
      UsuarioEmail: string;
      UsuarioSenha: string;
      UsuarioProvider: number;
    },
    resetForm: (
      nextState?:
        | Partial<FormikState<{emailLogin: string; passLogin: string}>>
        | undefined,
    ) => void,
    hideLoading: () => void,
    dispatch: Dispatch<AnyAction>,
    modalShow: () => void,
    modalInfo: (msg: any) => void,
    // setModalTitle: any,
  ) => Promise<void>;
  signInGoogle: (
    params: {
      UsuarioGoogle: string | null;
      UsuarioProvider: number;
    },
    hideLoading: () => void,
    setShowModal: any,
    setModalMessage: any,
    setModalTitle: any,
  ) => Promise<void>;
  signInFacebook: (
    params: {
      UsuarioFacebook: string | undefined;
      UsuarioProvider: number;
    },
    hideLoading: () => void,
    setShowModal: any,
    setModalMessage: any,
    setModalTitle: any,
  ) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<{UsuarioId: string}>(
    {} as {UsuarioId: string},
  );
  const isAuthenticated = !!user;
  const b2cLogin = async (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
  ) => {
    try {
      dispatch({type: BFF_AUTH_IS_LOADING, isLoading: true});
      const response: {
        result: AuthorizeResult & {error: string[]};
        jwtDecoded: DecodedB2cData;
      } = (await AuthManager.signInAsync()) as {
        result: AuthorizeResult & {error: string[]};
        jwtDecoded: DecodedB2cData;
      };
      if (!response?.result?.error) {
        // console.log('B2C Login Response: ', response?.result);
        // console.log('B2C Login Result: ', response.result);
        // console.log('B2C JWT: ', response.jwtDecoded);
        dispatch({
          type: B2C_DATA,
          b2cData: {
            ...response?.jwtDecoded,
            accessToken: response?.result?.accessToken,
          },
        });
        getUserBffDataEmail(
          dispatch,
          navigation,
          setModalInfo,
          setShowModal,
          response.jwtDecoded.email,
          response.result.accessToken,
          response?.jwtDecoded?.sub,
        );
      }
    } catch (error) {
      console.log('Error B2C Sys Login: ', error);

      setModalInfo({title: 'Ocorreu um Erro', msg: 'Login cancelado'});
      setShowModal(true);
      dispatch({type: BFF_AUTH_IS_LOADING, isLoading: false});
      // } finally {
      //   dispatch({type: BFF_AUTH_IS_LOADING, isLoading: false});
    }
  };

  const getUserBffDataEmail = async (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    email: string,
    tokenB2c: string,
    idB2c: string,
  ) => {
    ApiUser.getByEmail(email, tokenB2c)
      .then(d => {
        //mock
        console.log('DDDDDD: ', d);
        if (d?.body?.migrado) {
          d.body.migrado = true;
        }
        d.body.migrado = true;
        dispatch({type: USER_INSTALL_BFF_ALL_DATA, data: d.body});

        if (d?.status && d?.status === 404) {
          dispatch({type: REGISTRATION_TYPE, regType: 'instalation'});
          navigation.navigate('routesregister' as never);
        } else if (d?.body?.cpfInvalido) {
          setModalInfo({
            title: 'Ocorreu um erro',
            msg: 'Necessário o cadastramento do CPF através da central de atendimento.',
          });
          setShowModal(true);
        } else if (d?.body?.migrado) {
          // if (!d.body?.idB2c && idB2c) {
          //mock
          if (d.body?.idB2c && idB2c) {
            dispatch({type: REGISTRATION_TYPE, regType: 'migrated'});
            navigation.navigate('routesregister' as never);
          } else {
            setModalInfo({
              title: 'Ocorreu um erro',
              msg: 'Por favor, entre em contato com a nossa central de atendimento.',
            });
            setShowModal(true);
          }
        } else if (
          d?.body?.idB2c &&
          d?.body?.instalacoes?.length &&
          d?.body?.cpf
        ) {
          // if (d?.body?.instalacoes?.length) {
          let inst = InstalationAdapter.transformInstalationBffApi(
            d?.body?.instalacoes,
            d?.body?.cpf,
          );
          if (d?.body?.instalacoes?.length === 1) {
            console.log('Entra direto');
            console.log('Inst Transformed: ', inst);
            // console.log('JWTDecoded: ', response.jwtDecoded);
          } else {
            console.log('Lista instalaçoes');
          }

          // faz login com instalação selecionada.
          // }
        } else {
          setModalInfo({
            title: 'Instalação não encontrada',
            msg: 'O usuário não possui instalações vinculadas.',
          });
          setShowModal(true);
          // lista serviços offline
        }
        // d.body e d.status
      })
      .catch(e => {
        console.log('Error: ', e);
      })
      .finally(() => {
        dispatch({type: BFF_AUTH_IS_LOADING, isLoading: false});
      });
  };

  const getUserBffDataCPF = async (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    cpf: string,
    tokenB2c: string,
  ) => {
    console.log('CPFFFFFF: ', cpf);
    ApiUser.getByCpf(cpf, tokenB2c)

      .then(d => {
        dispatch({type: USER_INSTALL_BFF_ALL_DATA, data: d.body});
        console.log('DDDDDDD: ', d.body);
        if (d?.status && d?.status === 404) {
          dispatch({type: REGISTRATION_TYPE, regType: 'notInstalation'});

          console.log('cadastrar user sem inst');
        } else if (d?.body?.cpfInvalido) {
          setModalInfo({
            title: 'Ocorreu um erro',
            msg: 'Necessário o cadastramento do CPF através da central de atendimento.',
          });
          setShowModal(true);
        } else if (d?.body?.cpf) {
          // } else if (d?.body?.instalacoes?.length) {
          dispatch({type: REGISTRATION_TYPE, regType: 'instalation'});
        }
      })
      .catch(e => {
        console.log('Error: ', e);
      })
      .finally(() => {
        dispatch({type: BFF_AUTH_IS_LOADING, isLoading: false});
      });
  };

  const updateBffUser = async (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    params: UserDataUpdate,
    tokenB2c: string,
  ) => {
    ApiUser.updateUser(params, tokenB2c)
      .then(d => {
        // dispatch({type: USER_INSTALL_BFF_ALL_DATA, data: d});
        if (d?.status && d?.status === 404) {
          setModalInfo({
            title: 'Ocorreu um erro',
            msg: 'Erro ao atualizar usuário.',
          });
          setShowModal(true);
          console.log('Atualizar usuário migrado');
        } else if (
          (d?.status && d?.status === 201) ||
          (d?.status && d?.status === 200)
        ) {
          setModalInfo({
            title: 'Registro atualizado',
            msg: 'Atualizado com sucesso',
          });
          setShowModal(true);
        }
      })
      .catch(e => {
        console.log('Error: ', e);
      })
      .finally(() => {
        dispatch({type: BFF_AUTH_IS_LOADING, isLoading: false});
      });
  };

  const createBffUser = async (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    params: UserDataCreate,
    tokenB2c: string,
  ) => {
    ApiUser.createUser(params, tokenB2c)
      .then(d => {
        // dispatch({type: USER_INSTALL_BFF_ALL_DATA, data: d});
        if (d?.status && d?.status === 404) {
          setModalInfo({
            title: 'Ocorreu um erro',
            msg: 'Erro ao cadastrar usuário.',
          });
          setShowModal(true);
          console.log('cadastrar user sem inst');
        } else if (
          (d?.status && d?.status === 201) ||
          (d?.status && d?.status === 200)
        ) {
          setModalInfo({
            title: 'Registro salvo',
            msg: 'Salvo com sucesso',
          });
          setShowModal(true);
        }
      })
      .catch(e => {
        console.log('Error: ', e);
      })
      .finally(() => {
        dispatch({type: BFF_AUTH_IS_LOADING, isLoading: false});
      });
  };

  const getTokenLegado = async (
    dispatch: Dispatch<AnyAction>,
    navigation: any,
    setModalInfo: (data: SetModalInfo) => void,
    setShowModal: (show: boolean) => void,
    instalacao: string,
    tokenB2c: string,
  ) => {
    ApiUser.getToken(instalacao, tokenB2c)
      .then(d => {
        console.log('Token Legado Response: ', d);
      })
      .catch(e => {
        console.log('Error: ', e);
        setModalInfo({
          title: 'Ocorreu um erro',
          msg: 'Erro ao obter token de acesso.',
        });
        setShowModal(true);
      })
      .finally(() => {});
  };

  const signInBffLegacy = async (
    params: {
      UsuarioEmail: string;
      UsuarioSenha: string;
      UsuarioProvider: number;
    },

    resetForm: (
      nextState?:
        | Partial<FormikState<{emailLogin: string; passLogin: string}>>
        | undefined,
    ) => void,
    hideLoading: () => void,
    dispatch: Dispatch<AnyAction>,
    modalShow: () => void,
    modalInfo: (msg: any) => void,
    // setModalTitle: any
  ) => {
    await ApiToken.getAuthToken({
      Usuario: userApi.Usuario,
      Senha: userApi.Senha,
    });
    await ApiToken.getSessionToken({
      Usuario: userApi.Usuario,
      origem: 'WEB',
      tipoOrigem: 'WEB',
    });

    try {
      const tokenSession = await getData('tokenSession');

      const url = `${baseUrl.BASE}/agencia-webapi/api/chatboot/login-app`;

      AxiosClient.request({
        url,
        method: 'POST',
        body: params,
        headers: {
          tokenSessao: tokenSession,
          origem: 'WEB',
          tipoOrigem: 'WEB',
          clientId: 'agencia-virtual-cpfl-app',
        },
      })
        .then(dataBody => {
          const data = {...dataBody.body};
          // console.log('Data: ', data);
          if (data?.CodErro && data?.CodErro !== 0) {
            if (data?.CodErro === 5 || data?.CodErro === 9) {
              modalInfo({
                title: 'Dados de login inválidos',
                msg: 'Verifique os dados informados e tente novamente',
              });
            } else if (data?.CodErro === 29) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Para usuário CNPJ não é permitido login no app.',
              });
            } else if (data?.CodErro === 11) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Usuário encontra-se inativo.',
              });
            } else if (data?.CodErro === 12) {
              modalInfo({
                title: 'Confirme seu cadastro',
                msg: 'Cadastro aguardando confirmação através da mensagem enviada por email.',
              });
            } else if (data?.CodErro === 20) {
              modalInfo({
                title: 'Instalação não encontrada',
                msg: 'O usuário não possui instalações vinculadas.',
              });
            } else {
              modalInfo({
                // cod 1 - others
                title: 'Falha no login ',
                msg: 'Ocorreu uma falha ao tentar autenticar seu usuário. Tente novamente mais tarde.',
              });
            }
            modalShow();
            console.log(
              `Error code: ${data?.CodErro} - Error msg: ${data?.MsgErro}`,
            );
          } else {
            if (data) {
              setUser(data.UsuarioId);
              // console.log('Data: ', data);
              dispatch({type: USER_INSTALL_ALL_DATA, data: data});
              if (data?.lstInstalacoes) {
                if (data?.lstInstalacoes?.length === 1) {
                  installSelect(
                    data.lstInstalacoes[0].Instalacao,
                    data.lstInstalacoes[0].DocumetoTitular,
                    dispatch,
                    navigate,
                    hideLoading,
                    1,
                  );
                } else {
                  navigate('selectInstallation' as never);
                }
                resetForm();
                hideLoading();
              }
            }
          }
        })
        .catch(e => {
          console.log('Error: ', e);
          return e;
        });
    } catch (e) {
      console.log('Erro: ', e);
    } finally {
      hideLoading();
    }
  };

  const signIn = async (
    params: {
      UsuarioEmail: string;
      UsuarioSenha: string;
      UsuarioProvider: number;
    },

    resetForm: (
      nextState?:
        | Partial<FormikState<{emailLogin: string; passLogin: string}>>
        | undefined,
    ) => void,
    hideLoading: () => void,
    dispatch: Dispatch<AnyAction>,
    modalShow: () => void,
    modalInfo: (msg: any) => void,
    // setModalTitle: any
  ) => {
    await ApiToken.getAuthToken({
      Usuario: userApi.Usuario,
      Senha: userApi.Senha,
    });
    await ApiToken.getSessionToken({
      Usuario: userApi.Usuario,
      origem: 'WEB',
      tipoOrigem: 'WEB',
    });

    try {
      const tokenSession = await getData('tokenSession');

      const url = `${baseUrl.BASE}/agencia-webapi/api/chatboot/login-app`;

      AxiosClient.request({
        url,
        method: 'POST',
        body: params,
        headers: {
          tokenSessao: tokenSession,
          origem: 'WEB',
          tipoOrigem: 'WEB',
          clientId: 'agencia-virtual-cpfl-app',
        },
      })
        .then(dataBody => {
          const data = {...dataBody.body};
          // console.log('Data: ', data);
          if (data?.CodErro && data?.CodErro !== 0) {
            if (data?.CodErro === 5 || data?.CodErro === 9) {
              modalInfo({
                title: 'Dados de login inválidos',
                msg: 'Verifique os dados informados e tente novamente',
              });
            } else if (data?.CodErro === 29) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Para usuário CNPJ não é permitido login no app.',
              });
            } else if (data?.CodErro === 11) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Usuário encontra-se inativo.',
              });
            } else if (data?.CodErro === 12) {
              modalInfo({
                title: 'Confirme seu cadastro',
                msg: 'Cadastro aguardando confirmação através da mensagem enviada por email.',
              });
            } else if (data?.CodErro === 20) {
              modalInfo({
                title: 'Instalação não encontrada',
                msg: 'O usuário não possui instalações vinculadas.',
              });
            } else {
              modalInfo({
                // cod 1 - others
                title: 'Falha no login ',
                msg: 'Ocorreu uma falha ao tentar autenticar seu usuário. Tente novamente mais tarde.',
              });
            }
            modalShow();
            console.log(
              `Error code: ${data?.CodErro} - Error msg: ${data?.MsgErro}`,
            );
          } else {
            if (data) {
              setUser(data.UsuarioId);
              // console.log('Data: ', data);
              dispatch({type: USER_INSTALL_ALL_DATA, data: data});
              if (data?.lstInstalacoes) {
                if (data?.lstInstalacoes?.length === 1) {
                  installSelect(
                    data.lstInstalacoes[0].Instalacao,
                    data.lstInstalacoes[0].DocumetoTitular,
                    dispatch,
                    navigate,
                    hideLoading,
                    1,
                  );
                } else {
                  navigate('selectInstallation' as never);
                }
                resetForm();
                hideLoading();
              }
            }
          }
        })
        .catch(e => {
          console.log('Error: ', e);
          return e;
        });
    } catch (e) {
      console.log('Erro: ', e);
    } finally {
      hideLoading();
    }
  };
  const googleLogout = async () => {
    await GoogleSignin.signOut();
  };
  const signInGoogle = async (
    params: {
      UsuarioGoogle: string | null;
      UsuarioProvider: number;
    },
    hideLoading: () => void,
    dispatch: Dispatch<AnyAction>,
    modalShow: () => void,
    modalInfo: (msg: any) => void,
  ) => {
    console.log('Entrou');
    await ApiToken.getAuthToken({
      Usuario: userApi.Usuario,
      Senha: userApi.Senha,
    });
    await ApiToken.getSessionToken({
      Usuario: userApi.Usuario,
      origem: 'WEB',
      tipoOrigem: 'WEB',
    });
    try {
      const tokenSession = await getData('tokenSession');

      const url = `${baseUrl.BASE}/agencia-webapi/api/chatboot/login-app`;

      AxiosClient.request({
        url,
        method: 'POST',
        body: params,
        headers: {
          tokenSessao: tokenSession,
          origem: 'WEB',
          tipoOrigem: 'WEB',
          clientId: 'agencia-virtual-cpfl-app',
        },
      })
        .then(dataBody => {
          const data = {...dataBody.body};
          // console.log('Data: ', data);
          if (data?.CodErro && data?.CodErro !== 0) {
            googleLogout();
            if (data?.CodErro === 5 || data?.CodErro === 9) {
              modalInfo({
                title: 'Dados de login inválidos',
                msg: 'Verifique os dados informados e tente novamente',
              });
            } else if (data?.CodErro === 29) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Para usuário CNPJ não é permitido login no app.',
              });
            } else if (data?.CodErro === 11) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Usuário encontra-se inativo.',
              });
            } else if (data?.CodErro === 12) {
              modalInfo({
                title: 'Confirme seu cadastro',
                msg: 'Cadastro aguardando confirmação através da mensagem enviada por email.',
              });
            } else if (data?.CodErro === 20) {
              modalInfo({
                title: 'Instalação não encontrada',
                msg: 'O usuário não possui instalações vinculadas.',
              });
            } else {
              modalInfo({
                // cod 1 - others
                title: 'Falha no login ',
                msg: 'Ocorreu uma falha ao tentar autenticar seu usuário. Tente novamente mais tarde.',
              });
            }
            modalShow();
            console.log(
              `Error code: ${data?.CodErro} - Error msg: ${data?.MsgErro}`,
            );
          } else {
            if (data) {
              setUser(data.UsuarioId);
              // console.log('Data: ', data);
              dispatch({type: USER_INSTALL_ALL_DATA, data: data});
              if (data?.lstInstalacoes) {
                if (data?.lstInstalacoes?.length === 1) {
                  installSelect(
                    data.lstInstalacoes[0].Instalacao,
                    data.lstInstalacoes[0].DocumetoTitular,
                    dispatch,
                    navigate,
                    hideLoading,
                    1,
                  );
                } else {
                  navigate('selectInstallation' as never);
                }

                hideLoading();
              }
            }
          }
        })
        .catch(e => {
          console.log('Error: ', e);
          return e;
        });
    } catch (e) {
      await GoogleSignin.signOut();
      console.log('Erro: ', e);
    } finally {
      hideLoading();
    }
  };

  const signInFacebook = async (
    params: {
      UsuarioFacebook: string | undefined;
      UsuarioProvider: number;
    },
    hideLoading: () => void,
    dispatch: any,
    modalShow: () => void,
    modalInfo: (msg: any) => void,
  ) => {
    console.log('Params: ', params);
    await ApiToken.getAuthToken({
      Usuario: userApi.Usuario,
      Senha: userApi.Senha,
    });
    await ApiToken.getSessionToken({
      Usuario: userApi.Usuario,
      origem: 'WEB',
      tipoOrigem: 'WEB',
    });

    try {
      const tokenSession = await getData('tokenSession');

      const url = `${baseUrl.BASE}/agencia-webapi/api/chatboot/login-app`;

      AxiosClient.request({
        url,
        method: 'POST',
        body: params,
        headers: {
          tokenSessao: tokenSession,
          origem: 'WEB',
          tipoOrigem: 'WEB',
          clientId: 'agencia-virtual-cpfl-app',
        },
      })
        .then(dataBody => {
          const data = {...dataBody.body};
          // console.log('Data: ', data);
          if (data?.CodErro && data?.CodErro !== 0) {
            if (data?.CodErro === 5 || data?.CodErro === 9) {
              modalInfo({
                title: 'Dados de login inválidos',
                msg: 'Verifique os dados informados e tente novamente',
              });
            } else if (data?.CodErro === 29) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Para usuário CNPJ não é permitido login no app.',
              });
            } else if (data?.CodErro === 11) {
              modalInfo({
                title: 'Login não permitido',
                msg: 'Usuário encontra-se inativo.',
              });
            } else if (data?.CodErro === 12) {
              modalInfo({
                title: 'Confirme seu cadastro',
                msg: 'Cadastro aguardando confirmação através da mensagem enviada por email.',
              });
            } else if (data?.CodErro === 20) {
              modalInfo({
                title: 'Instalação não encontrada',
                msg: 'O usuário não possui instalações vinculadas.',
              });
            } else {
              modalInfo({
                // cod 1 - others
                title: 'Falha no login ',
                msg: 'Ocorreu uma falha ao tentar autenticar seu usuário. Tente novamente mais tarde.',
              });
            }
            modalShow();
            console.log(
              `Error code: ${data?.CodErro} - Error msg: ${data?.MsgErro}`,
            );
          } else {
            if (data) {
              setUser(data.UsuarioId);
              // console.log('Data: ', data);
              dispatch({type: USER_INSTALL_ALL_DATA, data: data});
              if (data?.lstInstalacoes) {
                if (data?.lstInstalacoes?.length === 1) {
                  installSelect(
                    data.lstInstalacoes[0].Instalacao,
                    data.lstInstalacoes[0].DocumetoTitular,
                    dispatch,
                    navigate,
                    hideLoading,
                    1,
                  );
                } else {
                  navigate('selectInstallation' as never);
                }

                hideLoading();
              }
            }
          }
        })
        .catch(e => {
          console.log('Error: ', e);
          return e;
        });
    } catch (e) {
      console.log('Erro: ', e);
    } finally {
      hideLoading();
    }
  };

  async function signOut() {
    await clearAccessToken();
    // setLoading(false);
    // setIsSigned(false);
  }
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        b2cLogin,
        getUserBffDataCPF,
        createBffUser,
        updateBffUser,
        signOut,
        user,
        signInGoogle,
        signInFacebook,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
