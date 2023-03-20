import publicIP from 'react-native-public-ip';

export const myPublicIP = async (): Promise<any> => {
  try {
    const ipData = await publicIP()
      .then(ip => {
        //   console.log('Public IP: ', ip);
        return ip;
        // '47.122.71.234'
      })
      .catch(error => {
        console.log(error);
        // 'Unable to get IP address.'
      });
    return ipData;
  } catch (error) {
    console.log('Error: ', error);
  }
};
