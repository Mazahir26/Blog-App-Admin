import React, { useState, createContext } from "react";

export const Context = createContext({});

export const Provider = ({ children }: any) => {
  const [Key, setKey] = useState(null);

  return (
    <Context.Provider value={{ Key, setKey }}>{children}</Context.Provider>
  );
};
