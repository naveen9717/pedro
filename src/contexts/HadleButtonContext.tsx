import React from 'react';
import {createContext, useState, ReactNode} from 'react';

export const HaldleButtonContext = createContext({});

interface HaldleButtonProviderProps {
  children: ReactNode;
}

export function HaldleButtonProvider({children}: HaldleButtonProviderProps) {
  const [button, setButton] = useState(1);

  function BtnUp() {
    setButton(button + 1);
  }

  return (
    <HaldleButtonContext.Provider value={{button, BtnUp}}>
      {children}
    </HaldleButtonContext.Provider>
  );
}
