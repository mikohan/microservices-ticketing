import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Signup</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;
