import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {AuthHeader} from '../../../component/common/AuthHeader';
import {LoginForm} from './components/LoginForm';
import {useAppDispatch} from '../../../store';
import {LoginFormValues} from '../../../types';
import {login} from '../../../store/auth/authSlice';
import {useMessage} from '../../../hooks/useMessage';
import {useError} from '../../../context/ErrorProvider';
import {Header} from '../../../component/common/Header';

type Props = AuthStackScreenProps<'Login'>;

export const LoginScreen: FC<Props> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();

  const setError = useError();

  const onSubmit = async ({number, password}: LoginFormValues) => {
    try {
      await dispatch(login({number, password})).unwrap();
      setMessage(String(t('Login Successfully.')));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Welcome back'))} />
      <LoginForm onSubmit={onSubmit} />
    </AppLayout>
  );
};
