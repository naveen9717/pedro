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
  ActivityIndicator,
  Alert
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
import Pdf from 'react-native-pdf';
import OtherDataServices from '../../../shared/services/OtherDataServices';
import RNShareFile from 'react-native-share-pdf';
import { FileSaveOptions, FileSaveSuccess, startDownloadAppSave } from 'react-native-ios-files-app-save';

export function InvoiceDownload() {
  const {b2cLogin} = useContext(AuthContext) as AuthContextProps;
  const [isLogging, setIsLogging] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [dataSource, setDataSource] = useState('')

  const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
  //const source = require('./test.pdf');  // ios only
  //const source = {uri:'bundle-assets://test.pdf' };
  //const source = {uri:'file:///sdcard/test.pdf'};
  const source64new = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
  const source64sample = {uri:`data:application/pdf;base64,${dataSource?.binarioPDF}`};
  // console.log("source64sample",source64sample);
  // console.log("dataSource",dataSource);

  
  //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
  //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
//   var path = RNFetchBlob.fs.dirs.DocumentDir + "/bill.pdf";
//   RNFetchBlob.fs.writeFile(path, `${dataSource?.binarioPDF}`, "base64").then(res => {
//     console.log("FileDownload : ", res);
// }

// )

const mockData = {
  filename: 'Invoice.pdf',
  document: `${dataSource?.binarioPDF}`
}
const SharePdf = async () => {
    const showError = await RNShareFile.sharePDF(mockData.document, mockData.filename);
  if (showError) {
    // Do something with the error
  }
}

const DemoDownload = () => {
  // if (!hasPermission) {
  //   //* Handle Permission
  //   return;
  // }
 let options: FileSaveOptions = {
    url: `${dataSource?.binarioPDF}`,
    fileName: "Invoice.pdf",
    isBase64: true
  }
  startDownloadAppSave(options).then((res) => {
    const fileSaveSuccess = res as FileSaveSuccess;
    console.log(fileSaveSuccess);
    alert(fileSaveSuccess.message);
  }).catch((error) => {
    console.log("error", error);
  })
};

  const downloadImage = async () => {
    let date = new Date();
    const { config, fs } = RNFetchBlob
    const dirPath = Platform.OS == 'ios' ? `${fs.dirs.PictureDir}/<folder-name>` : `${fs.dirs.PictureDir}`
    const filePath = dirPath + '/' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf'
    fs.writeFile(filePath,`${dataSource?.binarioPDF}`, 'base64').then(res => {
    Platform.OS === 'ios' ?
    RNFetchBlob.ios.previewDocument(filePath) :
    RNFetchBlob.fs.scanFile([
    { path: filePath, mime: 'application/pdf' },
    ])
    Platform.OS === 'android' && Alert.alert("File Successfully downloaded!!")
    }).catch(err => console.log("err", err))
}
  


// let fPath = Platform.select({
//   ios: fs.dirs.DocumentDir,
//   android: fs.dirs.DownloadDir,
// });

// fPath = `${fPath}/pdfFileName.pdf`;

// if (Platform.OS === PlatformTypes.IOS) {
//    await fs.createFile(fPath, base64Data, "base64");
// } else {
//    await fs.writeFile(fPath, base64Data, "base64");
// }
// RNFetchBlob can be used to open the file


  
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
   //Get History Data List
   OtherDataServices.getInvoiceData().then((res) => {
    setDataSource(res.data);
});
  }, []);

// console.log("pdfactual",dataSource);



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
                       source={source64sample}
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
                    onPress={DemoDownload}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>
                </View>
                <View style={{marginVertical:15}}>
                <ContainerViewButton>
                  <Button
                    title="Compartilhar"
                    type="primary"
                    Icon="share-2"
                    IconColor="#02ade1"
                    onPress={SharePdf}
                    isLoading={isLogging}
                  />
                </ContainerViewButton>

                {/* <a href="data:application/pdf;base64,'+input+'" class="btn btn-success" download="document.pdf">Download As File...</a> */}
                </View>
                {ModalLoading(isLoading)}
              </MainGenericContainer>
            </ScrollView>
          </>
        ) : (
          <>
            {/* <HeaderCustom
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
            /> */}
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
  height: 600,
}
});