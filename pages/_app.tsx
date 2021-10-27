import { AppProps } from 'next/app';
import React, { useState } from 'react';
import LoadingContext from '../contexts/LoadingContext';
import GlobalStyle from '../styles/globals';
import Theme from '../styles/Theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const loadingState = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loadingState
      }}
    >
      <Theme>
        <Component {...pageProps} />
        <GlobalStyle />
      </Theme>
    </LoadingContext.Provider>
  );
};

export default MyApp;
