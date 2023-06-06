import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Platform,
  StatusBar,
  Image,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {Label, Title, ContainerViewButton, ContainerViewLogo} from './styles';

import {useTheme} from 'styled-components/native';
import {MainGenericContainer} from '../../../components/Containers/index';
import {HeaderCustom} from '../../../components/HeaderCustom';
import {Button} from '../../../components/Button';
import { AccessibilityWidget } from '../../../components/AccessibilityWidget';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext, AuthContextProps} from '../../../contexts/useAuth';
import {ContainerLoading} from '../Login/styles';
import {Load} from '../../../components/Button/styles';
import {RootState} from '../../../redux/reducer';
import {AlertModal} from '../../../components/Modal/AlertModal';
import ReactNativeBlobUtil from 'react-native-blob-util'
import Share from 'react-native-share'
import Pdf from 'react-native-pdf';

export function InvoiceDowlnoad() {
  const {b2cLogin} = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const downloadFile = () => {
    const fileUrl = "http://www.pdf995.com/samples/pdf.pdf";
    const fileName= "sample"
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${fileName}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', fileUrl)
      .then((res) => {
        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
        // whereas in android, the download manager is handling the download for us.
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log('BLOB ERROR -> ', err));
  };

  const netInfo = useNetInfo();

  const [showModal, setshowModal] = useState(false);
  const handleModal = () => {
    setshowModal(!showModal);
  };
  const [modalInfo, setModalInfo] = useState<{title: string; msg: string}>({
    title: '',
    msg: '',
  });

  const [freeInternetDate, setFreeInternetDate] = useState<Date | null>(null);

  const isLoading: boolean = useSelector(
    (state: RootState) => state.BffAuthIsLoading.isLoading,
  );


  const ModalLoading = (loading: boolean) => {
    if (loading) {
      return (
        <ContainerLoading>
          <Load />
        </ContainerLoading>
      );
    }
  };
  useEffect(() => {
  
  }, []);

  const {height} = Dimensions.get('window');
  
  const theme = useTheme();
  const changeStep = (s: number) => {
    setStep(s);
  };
  const {goBack} = useNavigation();
  const [btnClick, setBtnClick] = useState(0);

  function handleHome() {
    changeStep(0);
  }

  const handleClick = () => {
    // navigation.navigate('login' as never);
    // navigation.navigate('MinhaContaAtual');
  };

  return (
    <>
      <AlertModal
        showModal={showModal}
        setShowModal={handleModal}
        msg={modalInfo.msg}
        title={modalInfo.title}
      />
     
      <SafeAreaView style={{flex: 1, backgroundColor: theme.COLORS.BACKGROUND}}>
        <StatusBar
          barStyle={
            Platform.OS === 'android' ? 'light-content' : 'dark-content'
          }
        />
        {step === 0 ? (
          <>
            <HeaderCustom
              // marginTop={Platform.OS === 'android' ? StatusBar.currentHeight : 0}
              hideMessage={true}
              onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              leftOnPress={handleHome}
              leftAction={'back'}
            />
            <AccessibilityWidget
             marginTop={
              Platform.OS === 'android' ? StatusBar.currentHeight : 0
             }
            />

            <ScrollView>
              <MainGenericContainer style={{paddingTop: height * 0.02, height: height}}>
                <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                  <Title paddingBottom={height * 0.0216}>Segunda Via</Title>
                  <Text style={styles.bluemediumtext}>Procotocolo: 000000000</Text>
                  </View>
                
                   <View style={{justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'#fff'}}>
                    <Pdf
                       trustAllCerts={false}
                       source={{
                            uri: 'http://www.pdf995.com/samples/pdf.pdf',
                        }}
                       page={1}
                       scale={1.0}
                       minScale={0.5}
                       maxScale={3.0}
                       renderActivityIndicator={() => (
                        <ActivityIndicator color="black" size="large" />
                       )}
                       enablePaging={true}
                       onLoadProgress={(percentage) => console.log(`Loading :${percentage}`)}
                       onLoadComplete={() => console.log('Loading Complete')}
                       onPageChanged={(page, totalPages) => console.log(`${page}/${totalPages}`)}
                       onError={(error) => console.log(error)}
                      //  onPageSingleTap={(page) => alert(page)}
                       onPressLink={(link) => Linking.openURL(link)}
                       onScaleChanged={(scale) => console.log(scale)}
                       // singlePage={true}
                       spacing={10}
                        // horizontal
                       style={styles.pdf}
                      />
                  </View>
              
                <View style={{marginVertical:25}}>
                <ContainerViewButton>
                  <Button
                    title="Baixar segunda via"
                    type="secondary"
                    IconColor="#02ade1"
                    onPress={downloadFile}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>
                </View>
                <View style={{marginVertical:15}}>
                <ContainerViewButton>
                  <Button
                    title="Compartilhar"
                    type="primary"
                    Icon="sharealt"
                    IconColor="#02ade1"
                    onPress={handleClick}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>
                </View>
                {ModalLoading(isLoading)}
              </MainGenericContainer>
            </ScrollView>
          </>
        ) : (
          <>
            <HeaderCustom
              marginTop={
                Platform.OS === 'android' ? StatusBar.currentHeight : 0
              }
              hideMessage={true}
              onBackPress={async () => goBack()}
              backgroundColor={theme.COLORS.PRIMARY_800}
              isPrimaryColorDark
              isFocused={false}
              leftOnPress={handleHome}
              leftAction={'login'}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bluemediumtext:{
    fontSize:13,
    textAlign:'right',
    color:'#02ade1',
    fontWeight:'500',
    marginBottom:5
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  smalltext:{
    fontSize:12,
  },
  smallertext:{
    fontSize:12,
    textAlign:'center'
  },
  largetext:{
    fontSize:15,
    fontWeight:'500',
    color:'#02ade1',
    textAlign:'center'
  },
  mediumtext:{
    fontSize:13,
    textAlign:'center'
  },
  mediumtextbold:{
    fontSize:13,
    textAlign:'center',
    fontWeight:'500',
    marginVertical:5
  },
  pdf: {
  // flex:1,
  width:Dimensions.get('window').width,
  height: 480,
}
});