import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {AuthStackScreenProps, VerificationFor} from '../../../navigation/types';
import {AuthHeader} from '../../../component/common/AuthHeader';
import {ForgotPasswordForm} from './components/ForgotPasswordForm';
import {Colors} from '../../../styles';
import {useAppDispatch} from '../../../store';
import {forgotPassword} from '../../../store/auth/forgotPasswordSlice';
import {useMessage} from '../../../hooks/useMessage';
import {ForgotPasswordFormValues} from '../../../types';
import {useError} from '../../../context/ErrorProvider';
import {Header} from '../../../component/common/Header';

type Props = AuthStackScreenProps<'ForgotPassword'>;

export const ForgotPasswordScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const onSubmit = async ({phone}: ForgotPasswordFormValues) => {
    try {
      const {userId} = await dispatch(forgotPassword({phone})).unwrap();
      navigation.navigate('OTPScreen', {
        userId,
        phone,
        verificationFor: VerificationFor.FORGET_PASSWORD,
      });
      setMessage(String(t('OTP sent Successfully !!!')));
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{flex: 1, backgroundColor: Colors.primary}}>
      <Header heading={String(t('Forgot Password'))} />
      <ForgotPasswordForm onSubmit={onSubmit} />
    </SafeAreaView>
  );
};
