import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {HomeStack} from './stacks/HomeStack';
import NewStack from './stacks/NewStack';

import TabsContainer from './stacks/TabsNaviagtion';

// import {NoInternetStack} from './stacks/NoInternetStack';
import useConnection from '../hooks/useConnection';

export function Routes() {
  const {isConnected} = useConnection();
  // const checkConnection = !isConnected && isConnected != null;

  useEffect(() => {
    SplashScreen.hide();
  }, [isConnected]);

  // return isConnected ? <HomeStack /> : <NoInternetStack />;
  // return <HomeStack />;
  // return <NewStack />;
  return <TabsContainer/>;
}
