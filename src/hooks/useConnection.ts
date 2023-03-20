import { useNetInfo } from '@react-native-community/netinfo';

const useConnection = () => {
  const { isConnected } = useNetInfo();
  return {
    isConnected,
  };
};

export default useConnection;
