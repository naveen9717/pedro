/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components/';

import {StyledContainerView, StyledLabel, StyledTitle} from './styles';
import {Dimensions, Modal, SafeAreaView, StatusBar, View} from 'react-native';
import {Search} from '../../components/Search';
import {MainGenericContainer} from '../../components/Containers';
import {ScrollView} from 'react-native-gesture-handler';
import CardSearch from '../../components/CardSearch';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducer';

import {useDispatch} from 'react-redux';
import {navigate} from '../../config/rootNavigation';
import {HeaderCustom} from '../../components/HeaderCustom';
import {
  InstData,
  UserInstData,
} from '../../models/userDataInstall/userDataInstallData';
import {installSelect} from '../../service/select-install';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../components/Button/styles';

export function SelectInstallation() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const hideLoading = () => {
    setIsLoading(false);
  };

  // const {goBack} = useNavigation();
  const {COLORS} = useTheme();
  const {height} = Dimensions.get('window');
  const [value, setValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<InstData[]>([]);

  const data: UserInstData = useSelector(
    (state: RootState) => state.UserDataInstall.data,
  );

  useEffect(() => {
    if (data) {
      setFilteredData(data.lstInstalacoes);
    }
  }, [data]);

  const theme = useTheme();

  const addressConcat = (
    descEnderecoRua: string,
    descEnderecoNumero: string,
    descComplemento1: string,
    descComplemento2: string,
    descComplemento3: string,
    descBairro: string,
    descMunicipio: string,
  ): string => {
    let address: string = '';
    if (descEnderecoRua) {
      address = descEnderecoRua?.toUpperCase();
      if (descEnderecoNumero) {
        address += `, ${descEnderecoNumero?.toUpperCase()}`;
      }
      if (descComplemento1) {
        address += `, ${descComplemento1?.toUpperCase()}`;
      }
      if (descComplemento2) {
        address += `, ${descComplemento2?.toUpperCase()}`;
      }
      if (descComplemento3) {
        address += `, ${descComplemento3?.toUpperCase()}`;
      }
    }

    if (descBairro) {
      if (address !== '') {
        address += `, ${descBairro?.toUpperCase()}`;
      } else {
        address += `${descBairro?.toUpperCase()}`;
      }
    }
    if (descMunicipio) {
      if (address !== '') {
        address += `, ${descMunicipio?.toUpperCase()}`;
      } else {
        address += `${descMunicipio?.toUpperCase()}`;
      }
    }

    return address;
  };

  const modalLoading = () => {
    return (
      <Modal visible={isLoading} transparent={true} animationType={'fade'}>
        <ContainerLoading>
          <Load />
        </ContainerLoading>
      </Modal>
    );
  };

  const searchFilter = (text: string) => {
    if (text) {
      const newData = data?.lstInstalacoes?.filter(i => {
        for (const key of Object.keys(i)) {
          if (typeof (i[key] === 'string')) {
            const itemCode = i[key]
              ? String(i[key]).toUpperCase()
              : ''.toUpperCase();
            const textCode = text.toUpperCase();
            if (itemCode.indexOf(textCode) > -1) {
              return true;
            }
          }
        }
        return false;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data?.lstInstalacoes);
    }
  };
  useEffect(() => {
    searchFilter(value);
  }, [value]);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: COLORS.PRIMARY_800}} />

      <StatusBar barStyle="light-content" />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.COLORS.BACKGROUND,
        }}>
        <HeaderCustom
          // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
          leftAction="back"
          hideMessage={true}
          onBackPress={async () =>
            navigate('login', {cameRoute: 'selectInstallation'})
          }
          backgroundColor={COLORS.PRIMARY_800}
          isPrimaryColorDark
          isFocused={false}
        />
        {/* <AccessibilityWidget /> */}

        <MainGenericContainer>
          <StyledContainerView style={{paddingTop: height * 0.0324}}>
            <StyledTitle style={{paddingBottom: height * 0.0216}}>
              Selecionar a instalação
            </StyledTitle>

            <StyledLabel style={{paddingBottom: height * 0.0183}}>
              Qual instalação deseja verificar?
            </StyledLabel>
            <View style={{paddingBottom: height * 0.009}}>
              <Search
                setText={setValue}
                text={value}
                searchButtonActive={false}
              />
            </View>
          </StyledContainerView>
        </MainGenericContainer>
        <ScrollView>
          <MainGenericContainer style={{paddingBottom: height * 0.022}}>
            {filteredData?.map((c, i) => {
              return (
                <CardSearch
                  key={i}
                  status={c.Situacao}
                  code_install={c?.Instalacao}
                  address={addressConcat(
                    c?.descEnderecoRua,
                    c?.descEnderecoNumero,
                    c?.descComplemento1,
                    c?.descComplemento2,
                    c?.descComplemento3,
                    c?.descBairro,
                    c?.descMunicipio,
                  )}
                  onPress={() => {
                    setIsLoading(true);
                    installSelect(
                      c.Instalacao,
                      c.DocumetoTitular,
                      dispatch,
                      navigate,
                      hideLoading,
                      data?.lstInstalacoes.length,
                    );
                  }}
                />
              );
            })}
          </MainGenericContainer>
        </ScrollView>
      </SafeAreaView>
      {modalLoading()}
    </>
  );
}
