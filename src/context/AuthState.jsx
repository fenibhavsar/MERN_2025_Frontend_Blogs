import React, { useState } from 'react';
import Context from './AuthContext';

const State = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [user, setUser] = useState(null);
  const [id, setId] = useState('');

  return (
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      id,
      setId
    }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
