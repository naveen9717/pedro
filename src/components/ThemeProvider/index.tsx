import * as React from 'react';
import {ThemeProvider as DefaultThemeProvider} from 'styled-components';

import theme from '../../theme';

type Props = {
  children: React.ReactNode;
  theme: any;
};

function ThemeProvider({children}: Props) {
  return <DefaultThemeProvider theme={theme}>{children}</DefaultThemeProvider>;
}

export default ThemeProvider;
