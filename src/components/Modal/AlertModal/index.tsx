import {View} from 'moti';
import React from 'react';
import {Dimensions, Modal, Text, TouchableOpacity} from 'react-native';
import {ContainerModal} from './style';
// import { RectButton } from 'react-native-gesture-handler';

type AlertModalProps = {
  // onRequestClose?: () => void;
  showModal: boolean;
  setShowModal: any;
  msg: string;
  title: string;
};

// const {width} = Dimensions.get('window');
export const AlertModal: React.FC<AlertModalProps> = ({
  // onRequestClose,
  showModal,
  setShowModal,
  msg,
  title,
}) => {
  const {width, height} = Dimensions.get('window');

  const handlePress = () => {
    // console.log('Clicked');
    setShowModal(!showModal);
  };

  return (
    <Modal
      style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => handlePress()}>
      <ContainerModal>
        <View
          style={{
            paddingHorizontal: width * 0.1,
            // paddingVertical: height * 0.38,
          }}>
          <View
            style={{
              // display: 'flex',
              elevation: 6,
              shadowColor: '#000',
              // padding: 10,
              borderRadius: 10,
              width: width * 0.8,
              // width: width,
              // height: 'rem',
              // height: height * 0.27,
              backgroundColor: '#fff',
              // top: '40%',
            }}>
            <View
              style={{
                padding: '5%',

                // height: height * 0.2,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  // padding: '5%',
                  marginBottom: height * 0.03,
                  // textAlign: 'justify',
                  lineHeight: 23,
                }}>
                {title}
              </Text>

              <View
                style={{
                  // display: 'flex',
                  // width: '100%',
                  padding: '5%',
                  // marginBottom: height * 0.05,
                  // textAlign: 'justify',
                  // height: '100%',
                  // lineHeight: 23,
                }}>
                <Text style={{textAlign: 'justify', lineHeight: 23}}>
                  {msg}
                </Text>
              </View>
            </View>
            {/* <View style={{padding: '10%', height: '100%'}}> */}

            {/* </View> */}
            <View
              style={{
                // borderColor: 'black',
                // borderWidth: 1,
                paddingRight: width * 0.04,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingBottom: height * 0.01,
                // width: width,
              }}>
              <TouchableOpacity
                style={{
                  zIndex: 0,
                  alignSelf: 'flex-end',
                  // width: width * 0.2,
                  // minWidth: 75,
                  backgroundColor: '#3b8ae5',
                  padding: height * 0.01,
                  borderRadius: 10,
                }}
                onPress={() => handlePress()}>
                <Text
                  style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ContainerModal>
    </Modal>
  );
};
