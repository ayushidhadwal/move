import React, {FC} from 'react';
import {format} from 'date-fns';
import {useTranslation} from 'react-i18next';

import {AuthStackScreenProps, VerificationFor} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {RegisterForm} from './components/RegisterForm';
import {AuthHeader} from '../../../component/common/AuthHeader';
import {useAppDispatch} from '../../../store';
import {register} from '../../../store/auth/authSlice';
import {GenderType} from '../../../store/auth/types';
import {RegisterFormValues} from '../../../types';
import {useError} from '../../../context/ErrorProvider';
import {Header} from '../../../component/common/Header';

type Props = AuthStackScreenProps<'Register'>;

export const RegisterScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const setError = useError();

  const onSubmit = async ({
    email,
    dob,
    password,
    confirmPassword,
    phone,
    username,
    fullName,
    gender,
  }: RegisterFormValues) => {
    try {
      const {userId} = await dispatch(
        register({
          email,
          dob: format(dob, 'yyyy-MM-dd'),
          password,
          confirmPassword,
          mobile: phone,
          fullName,
          genderId: gender === 1 ? GenderType.MALE : GenderType.FEMALE,
          username,
        }),
      ).unwrap();

      navigation.navigate('OTPScreen', {
        userId,
        phone: phone,
        verificationFor: VerificationFor.REGISTRATION,
      });
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Create an account'))} />
      <RegisterForm onSubmit={onSubmit} />
    </AppLayout>
  );
};
