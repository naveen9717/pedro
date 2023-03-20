import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = '@CPFL:token';

export async function getAccessToken() {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    return token;
  }
  return null;
}

export async function setAccessToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function clearAccessToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
