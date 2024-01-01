import React, {FC, useState} from 'react';
import {I18nManager, Platform} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Box, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

import {AuthNavigationProps} from '../../../../navigation/types';
import {FormInput} from '../../../../component/common/FormInput';
import {LoginFormValues} from '../../../../types';
import {Colors} from '../../../../styles';

type Props = {
  onSubmit: (values: LoginFormValues) => void;
};

export const LoginForm: FC<Props> = ({onSubmit}: Props) => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {t} = useTranslation();
  const [show, setShow] = useState<boolean>(false);

  const initialValues: LoginFormValues = {
    number: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    number: Yup.string()
      // .matches(MobileValidation, 'Phone number is not valid')
      .required(String(t('Mobile Number is required'))),
    password: Yup.string().required(String(t('Password is required!'))),
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
              px={5}
              mt={4}
              mb={8}>
              {String(
                t(
                  'We are happy to see you again, exciting games are waiting for you to join',
                ),
              )}
            </Text>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Box px={5}>
                <FormInput
                  isRequired={true}
                  isInvalid={touched.number && 'number' in errors}
                  onChangeText={handleChange('number')}
                  placeholder={t('Enter Mobile Number')}
                  error={errors?.number}
                  onBlur={handleBlur('number')}
                  value={values.number}
                  label={String(t('Mobile Number'))}
                  keyboardType={'number-pad'}
                  selectionColor={Colors.white}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <FormInput
                  isRequired={true}
                  isInvalid={touched.password && 'password' in errors}
                  onChangeText={handleChange('password')}
                  placeholder={t('Enter Password')}
                  error={errors?.password}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  label={String(t('Password'))}
                  icon={MaterialIcons}
                  iconName1={'visibility'}
                  iconName2={'visibility-off'}
                  secureTextEntry={!show}
                  onPressHandler={() => setShow(!show)}
                  show={show}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <Button
                  variant="link"
                  mt={-5}
                  mr={-4}
                  colorScheme={'secondary'}
                  alignSelf={'flex-end'}
                  onPress={() => navigation.navigate('ForgotPassword')}
                  _text={{
                    fontFamily: 'body',
                    fontWeight: '100',
                    fontStyle: 'normal',
                    fontSize: 'sm',
                    color: 'secondary.400',
                  }}>
                  {t('Forgot Password')}
                </Button>
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
                isLoadingText={String(t('Login'))}
                spinnerPlacement={'end'}
                disabled={isSubmitting}
                onPress={handleSubmit}>
                {t('Login')}
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
