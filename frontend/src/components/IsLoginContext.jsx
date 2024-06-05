import React, { createContext, useState, useContext } from 'react';

const IsLoginContext = createContext();

export const useLogin = () => useContext(IsLoginContext);

export const IsLoginProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);

  return (
    <IsLoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default IsLoginContext;
