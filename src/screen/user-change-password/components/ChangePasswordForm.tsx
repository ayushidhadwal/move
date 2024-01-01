import React, {FC, useState} from 'react';
import {I18nManager, Platform} from 'react-native';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {Button, Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FormInput} from '../../../component/common/FormInput';
import {useTranslation} from 'react-i18next';
import {ChangePasswordValues} from '../../../types';

type Props = {
  onSubmit: (
    values: ChangePasswordValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const ChangePasswordForm: FC<Props> = ({onSubmit}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const {t} = useTranslation();
  const initialValues: ChangePasswordValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().required(String(t('Password is required!'))),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), ''],
      String(t('Passwords must match')),
    ),
  });

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
          <Box mt={27} flex={1}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Box px={5}>
                <FormInput
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  isRequired={true}
                  fontStyle={'italic'}
                  isInvalid={touched.password && 'password' in errors}
                  onChangeText={handleChange('password')}
                  placeholder={t('Enter Password')}
                  error={errors?.password}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  label={String(t('New Password'))}
                  icon={MaterialIcons}
                  iconName1={'visibility'}
                  iconName2={'visibility-off'}
                  secureTextEntry={!show}
                  onPressHandler={() => setShow(!show)}
                  show={show}
                />
                <FormInput
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  isRequired={true}
                  fontStyle={'italic'}
                  isInvalid={
                    touched.confirmPassword && 'confirmPassword' in errors
                  }
                  onChangeText={handleChange('confirmPassword')}
                  placeholder={t('Enter Confirm Password')}
                  error={errors?.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  label={String(t('Confirm Password'))}
                  icon={MaterialIcons}
                  iconName1={'visibility'}
                  iconName2={'visibility-off'}
                  secureTextEntry={!visible}
                  onPressHandler={() => setVisible(!visible)}
                  show={visible}
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
