import React, {FC, useState} from 'react';
import {I18nManager, Platform} from 'react-native';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {FormInput} from '../../../component/common/FormInput';
import {useTranslation} from 'react-i18next';
import {useGetUserDetails} from '../../../hooks/user/useGetUserDetails';
import {Loader} from '../../../component/common/Loader';
import {EmailValidation} from '../../../utils/helper';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

type ChangeInfoFormValues = {
  username: string;
  fullName: string;
  email: string;
};

type Props = {
  onSubmit: (
    values: ChangeInfoFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const ChangeInfoForm: FC<Props> = ({onSubmit}: Props) => {
  const {userId} = useSelector((state: RootState) => state.auth);

  const {t} = useTranslation();
  const {userDetails, loading} = useGetUserDetails(userId);

  const initialValues: ChangeInfoFormValues = {
    username: userDetails.username ? userDetails.username : '',
    fullName:
      userDetails.firstName || userDetails.middleName || userDetails.lastName
        ? userDetails.firstName +
          ' ' +
          userDetails.middleName +
          ' ' +
          userDetails.lastName
        : '',
    email: userDetails.email ? userDetails.email : '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(String(t('Username is required!'))),
    fullName: Yup.string().required(String(t('FullName is required!'))),
    email: Yup.string()
      .email()
      .matches(EmailValidation, String(t('Email is not valid')))
      .required(String(t('Email is required!'))),
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({
        isSubmitting,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
      }) => {
        return (
          <Box mt={28} flex={1}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Box px={5}>
                <FormInput
                  isRequired={true}
                  fontStyle={'italic'}
                  isInvalid={touched.username && 'username' in errors}
                  onChangeText={handleChange('username')}
                  placeholder={t('Enter Your username')}
                  error={errors?.username}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  label={String(t('Username'))}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <FormInput
                  isRequired={true}
                  fontStyle={'italic'}
                  isInvalid={touched.fullName && 'fullName' in errors}
                  onChangeText={handleChange('fullName')}
                  placeholder={t('Enter Your Full Name')}
                  error={errors?.fullName}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  label={String(t('Full Name'))}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <FormInput
                  isRequired={true}
                  fontStyle={'italic'}
                  isInvalid={touched.email && 'email' in errors}
                  onChangeText={handleChange('email')}
                  placeholder={t('Enter Your Email')}
                  error={errors?.email}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={String(t('Email'))}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
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
                disabled={isSubmitting}
                isLoadingText={String(t('Save'))}
                spinnerPlacement={'end'}
                onPress={handleSubmit}>
                {t('Save')}
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
