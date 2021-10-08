import axios from 'axios';
import { useState } from 'react';

const useRequest = (url, method, body, onSuccess) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        console.log('here');
        onSuccess(response.data);
      }
      return response.data;
    } catch (e) {
      setErrors(
        <div className="allert alert-danger mt-2">
          <h4>Oops...</h4>
          <ul className="my-0">
            {e.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
