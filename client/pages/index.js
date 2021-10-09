import buildClient from '../api/build-client';

const Index = ({ currentUser }) => {
  return (
    <div>
      {currentUser ? <h1>You are signed in</h1> : 'You are not sign in'}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/currentuser');

  return {
    props: {
      currentUser: data.currentUser,
    },
  };
};

export default Index;
