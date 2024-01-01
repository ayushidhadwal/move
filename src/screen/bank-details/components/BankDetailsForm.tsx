import React, {FC} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {FormInput} from '../../../component/common/FormInput';
import {useInit} from '../../../hooks/useInit';
import {useGetBankDetails} from '../../../hooks/bankDetails/useGetBankDetails';
import {BankDetailsFormValues} from '../../../types';
import {Loader} from '../../../component/common/Loader';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n';
import {I18nManager} from 'react-native';

type Props = {
  onSubmit: (values: BankDetailsFormValues) => void;
};

export const BankDetailsForm: FC<Props> = ({onSubmit}: Props) => {
  const {t} = useTranslation();

  const {bankDetails, dataLoading} = useGetBankDetails();

  const initialValues: BankDetailsFormValues = {
    accountHolderName: bankDetails?.accountHolderName
      ? bankDetails?.accountHolderName
      : '',
    bankName: bankDetails?.bankName ? bankDetails?.bankName : '',
    iban: bankDetails?.iban ? bankDetails?.iban : '',
  };

  const validationSchema = Yup.object().shape({
    accountHolderName: Yup.string().required(
      String(t('Account Holder Name is required!')),
    ),
    bankName: Yup.string().required(String(t('Bank Name is required!'))),
    iban: Yup.string().required(String(t('IBAN is required!'))),
  });
  if (dataLoading) {
    return <Loader />;
  }

  return (
    <Formik
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
          <Box mt={31} flex={1}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Box px={5}>
                <FormInput
                  isRequired={true}
                  isInvalid={
                    touched.accountHolderName && 'accountHolderName' in errors
                  }
                  fontStyle={'italic'}
                  onChangeText={handleChange('accountHolderName')}
                  placeholder={t('Enter Account Holder Name')}
                  error={errors?.accountHolderName}
                  onBlur={handleBlur('accountHolderName')}
                  value={values.accountHolderName}
                  label={String(t('Account holder name'))}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <FormInput
                  isRequired={true}
                  fontStyle={'italic'}
                  isInvalid={touched.bankName && 'bankName' in errors}
                  onChangeText={handleChange('bankName')}
                  placeholder={t('Enter Your Bank Name')}
                  error={errors?.bankName}
                  onBlur={handleBlur('bankName')}
                  value={values.bankName}
                  label={String(t('Bank name'))}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <FormInput
                  isRequired={true}
                  fontStyle={'italic'}
                  isInvalid={touched.iban && 'iban' in errors}
                  onChangeText={handleChange('iban')}
                  placeholder={t('Enter Your IBan')}
                  error={errors?.iban}
                  onBlur={handleBlur('iban')}
                  value={values.iban}
                  label={String(t('IBAN'))}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
              </Box>
            </KeyboardAwareScrollView>
            <Box
              position={'absolute'}
              bottom={0}
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
