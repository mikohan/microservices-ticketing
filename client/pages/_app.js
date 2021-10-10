import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import buildClient from '../api/build-client';

import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <React.Fragment>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />;
    </React.Fragment>
  );
};

AppComponent.getInitialProps = async (context) => {
  const { data } = await buildClient(context.ctx).get('/api/users/currentuser');
  console.log('IN APP COMPONENT');

  return {
    ...data,
  };
};

export default AppComponent;
