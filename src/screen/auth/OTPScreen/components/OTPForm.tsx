import React, {FC, useEffect, useState} from 'react';
import {FormikHelpers} from 'formik';
import {Formik} from 'formik';
import {Box, Button, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {ActivityIndicator, StyleSheet} from 'react-native';

import {VerifyValues} from '../../../../types';
import {resendOTP} from '../../../../store/auth/authSlice';
import {useAppDispatch} from '../../../../store';
import {useError} from '../../../../context/ErrorProvider';
import {useMessage} from '../../../../hooks/useMessage';
import {Colors} from '../../../../styles';

type Props = {
  onSubmit: (values: VerifyValues, formikHelpers: FormikHelpers<any>) => void;
  phone: string;
};

export const OTPForm: FC<Props> = ({onSubmit, phone}: Props) => {
  const {t} = useTranslation();
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const initialValues: VerifyValues = {
    otp: '',
  };

  const dispatch = useAppDispatch();
  const setError = useError();
  const setMessage = useMessage();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const onResendHandler = async () => {
    try {
      setLoading(true);
      const result = await dispatch(resendOTP({phone})).unwrap();
      if (result) {
        setMessage(String(t('OTP sent Successfully.')));
        setTimer(60);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({isSubmitting, handleChange, handleSubmit}) => {
        return (
          <Box>
            <Text
              fontFamily={'body'}
              fontStyle={'normal'}
              color={'white'}
              fontWeight={'100'}
              fontSize={15}
              lineHeight={25}
              px={5}
              mt={4}
              mb={10}>
              {t(
                'We have sent the OTP Verification code to your mobile number Check your SMS and enter the code below',
              )}
            </Text>
            <Box mx={4} my={5}>
              <OTPInputView
                style={{
                  width: '100%',
                  height: 100,
                }}
                pinCount={4}
                onCodeChanged={handleChange('otp')}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                selectionColor={'white'}
                keyboardType={'number-pad'}
              />
              <Text
                textAlign={'center'}
                mt={3}
                mb={2}
                fontFamily={'body'}
                fontStyle={'normal'}
                color={'white'}
                fontWeight={'100'}
                fontSize={'md'}>
                {t("Didn't receive OTP")}
              </Text>
              {timer > 0 ? (
                <Text
                  textAlign={'center'}
                  mb={12}
                  fontFamily={'body'}
                  fontStyle={'normal'}
                  color={'white'}
                  fontWeight={'100'}
                  fontSize={'md'}>
                  {t('You can resend code in')}
                  <Text color={'yellow.400'}> {timer}</Text> {t('s')}
                </Text>
              ) : loading ? (
                <ActivityIndicator
                  size={'small'}
                  color={Colors.yellow}
                  style={{alignSelf: 'center', marginBottom: 20}}
                />
              ) : (
                <>
                  <Pressable onPress={onResendHandler}>
                    <Text
                      textAlign={'center'}
                      mb={12}
                      fontFamily={'body'}
                      fontStyle={'normal'}
                      color={'yellow.400'}
                      fontWeight={'100'}
                      fontSize={'md'}>
                      {t('Resend')}
                    </Text>
                  </Pressable>
                </>
              )}
              <Button
                variant={'solid'}
                w={'100%'}
                rounded={0}
                _text={{
                  fontFamily: 'heading',
                  fontWeight: '100',
                  fontStyle: 'italic',
                  fontSize: 'md',
                  color: 'primary.400',
                }}
                colorScheme={'secondary'}
                isLoading={isSubmitting}
                disabled={isSubmitting}
                isLoadingText={String(t('Verify'))}
                spinnerPlacement={'end'}
                onPress={handleSubmit}>
                {t('Verify')}
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 80,
    height: 65,
    borderWidth: 1.5,
    backgroundColor: 'rgba(27,44,70,0.38)',
    borderColor: '#2C3C56',
    fontFamily: 'Broaven',
    color: Colors.primary,
    fontSize: 22,
  },

  underlineStyleHighLighted: {
    borderColor: '#8ACAFF',
    fontFamily: 'Broaven',
    color: 'white',
    fontSize: 18,
    backgroundColor: 'rgba(138,202,255,0.2)',
  },
});
