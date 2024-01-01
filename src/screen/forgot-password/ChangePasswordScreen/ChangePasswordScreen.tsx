import React, {FC, useState} from 'react';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {ChangePasswordForm} from './components/ChangePasswordForm';
import {useTranslation} from 'react-i18next';
import {updatePassword} from '../../../store/auth/forgotPasswordSlice';
import {useAppDispatch} from '../../../store';
import {useMessage} from '../../../hooks/useMessage';
import {ChangePasswordValues} from '../../../types';
import {useError} from '../../../context/ErrorProvider';

type Props = AuthStackScreenProps<'ChangePassword'>;

export const ChangePasswordScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const onSubmit = async ({
    password,
    confirmPassword,
  }: ChangePasswordValues) => {
    try {
      await dispatch(updatePassword({password, confirmPassword})).unwrap();
      setMessage(String(t('Password Updated Successfully !!!')));
      navigation.navigate('Login');
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Change Password'))} />
      <ChangePasswordForm onSubmit={onSubmit} />
    </AppLayout>
  );
};
