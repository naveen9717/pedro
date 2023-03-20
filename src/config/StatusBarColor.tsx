import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  StatusBarProps,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    zIndex: 9,
  },
});

type Props = StatusBarProps & {
  backgroundColor: string;
  isPrimaryColorDark: boolean;
};

function StatusBarColor({backgroundColor, isPrimaryColorDark, ...rest}: Props) {
  return (
    <SafeAreaView style={[styles.statusBar, {backgroundColor}]}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={isPrimaryColorDark ? 'light-content' : 'dark-content'}
        {...rest}
      />
    </SafeAreaView>
  );
}

export default StatusBarColor;
