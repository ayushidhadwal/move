import React, {FC} from 'react';

import {RootStackScreenProps} from '../../navigation/types';
import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {ChangePasswordForm} from './components/ChangePasswordForm';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {ChangePasswordValues} from '../../types';
import {useError} from '../../context/ErrorProvider';
import {userUpdatePassword} from '../../store/user/userSlice';

type Props = RootStackScreenProps<'UserChangePassword'>;

export const UserChangePasswordScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const onSubmit = async ({
    password,
    confirmPassword,
  }: ChangePasswordValues) => {
    try {
      await dispatch(userUpdatePassword({password, confirmPassword})).unwrap();
      setMessage(String(t('Password Updated Successfully !!!')));
      navigation.goBack();
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
