import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export const getServerSideProps = async (context) => {
  const { data } = await buildClient(context.ctx).get('/api/users/currentuser');
  console.log('IN APP COMPONENT');

  return {
    props: {
      currentUser: data.currentUser,
    },
  };
};

export default AppComponent;
