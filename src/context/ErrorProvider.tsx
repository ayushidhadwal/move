import React, {createContext, FC, ReactNode, useContext, useState} from 'react';
import {ErrorModal} from '../component/common/ErrorModal';

interface ErrorContextProps {
  setError: (error: string) => void;
}

type Props = {
  children: ReactNode;
};

export const ErrorContext = createContext({} as ErrorContextProps);

export const useError = () => {
  const {setError} = useContext(ErrorContext);
  return setError;
};

export const ErrorContextProvider: FC<Props> = ({children}) => {
  const [error, setError] = useState<string>('');

  const value = {setError};

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <ErrorModal
        error={error}
        onClose={() => setError('')}
        visible={Boolean(error)}
      />
    </ErrorContext.Provider>
  );
};
