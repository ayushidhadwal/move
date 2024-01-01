import React, {FC} from 'react';
import {I18nManager, Platform} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Box, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {FormInput} from '../../../../component/common/FormInput';
import {ForgotPasswordFormValues} from '../../../../types';

type Props = {
  onSubmit: (values: ForgotPasswordFormValues) => void;
};

export const ForgotPasswordForm: FC<Props> = ({onSubmit}: Props) => {
  const {t} = useTranslation();
  const initialValues: ForgotPasswordFormValues = {
    phone: '',
  };

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required(String(t('Phone Number is required!'))),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({
        touched,
        isSubmitting,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => {
        return (
          <Box mt={2} flex={1}>
            <Text
              fontFamily={'body'}
              fontStyle={'normal'}
              color={'white'}
              fontWeight={'100'}
              fontSize={15}
              lineHeight={25}
              my={6}
              mx={4}>
              {t(
                "Enter the phone number associated with your account and we',ll send an OTP to reset your password",
              )}
            </Text>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Box px={5}>
                <FormInput
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  isRequired={true}
                  isInvalid={touched.phone && 'phone' in errors}
                  onChangeText={handleChange('phone')}
                  placeholder={t('Enter Mobile Number')}
                  error={errors?.phone}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  label={String(t('Mobile Number'))}
                  keyboardType={'number-pad'}
                />
              </Box>
            </KeyboardAwareScrollView>
            <Box
              position={'absolute'}
              bottom={0}
              mb={Platform.OS === 'ios' ? 0 : 0}
              right={0}
              left={0}
              p={5}
              bg={'background.400'}>
              <Button
                variant={'solid'}
                w={'100%'}
                _text={{
                  fontFamily: 'heading',
                  fontWeight: '100',
                  fontStyle: 'italic',
                  fontSize: 'md',
                  color: 'primary.400',
                }}
                colorScheme={'secondary'}
                isLoading={isSubmitting}
                isLoadingText={String(t('Continue'))}
                spinnerPlacement={'end'}
                disabled={isSubmitting}
                onPress={handleSubmit}>
                {t('Continue')}
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
