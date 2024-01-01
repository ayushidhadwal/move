import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {AppLayout} from '../../../component/common/AppLayout';
import {AuthStackScreenProps, VerificationFor} from '../../../navigation/types';
import {AuthHeader} from '../../../component/common/AuthHeader';
import {OTPForm} from './components/OTPForm';
import {useAppDispatch} from '../../../store';
import {verifyOtp} from '../../../store/auth/authSlice';
import {useMessage} from '../../../hooks/useMessage';
import {VerifyValues} from '../../../types';
import {useError} from '../../../context/ErrorProvider';
import {Header} from '../../../component/common/Header';

type Props = AuthStackScreenProps<'OTPScreen'>;

export const OTPScreen: FC<Props> = ({
  route: {
    params: {phone, verificationFor, userId},
  },
  navigation,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();

  const setError = useError();

  const onSubmit = async ({otp}: VerifyValues) => {
    try {
      const result = await dispatch(
        verifyOtp({otp, mobile: phone, verificationFor, userId}),
      ).unwrap();

      if (verificationFor === VerificationFor.REGISTRATION) {
        setMessage(String(t('Register Successfully')));
      } else if (verificationFor === VerificationFor.FORGET_PASSWORD) {
        navigation.navigate('ChangePassword', {userId: result.userId});
      }
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Verification'))} />
      <OTPForm onSubmit={onSubmit} phone={phone} />
    </AppLayout>
  );
};
