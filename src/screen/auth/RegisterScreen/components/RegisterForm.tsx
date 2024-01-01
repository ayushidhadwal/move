import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {
  Button,
  Box,
  Text,
  FormControl,
  WarningOutlineIcon,
  Pressable,
} from 'native-base';
import {format} from 'date-fns';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActivityIndicator, I18nManager, StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';

import {Colors} from '../../../../styles';
import {FormInput} from '../../../../component/common/FormInput';
import {RegisterFormValues} from '../../../../types';
import {EmailValidation, MobileValidation} from '../../../../utils/helper';
import {useGetGender} from '../../../../hooks/useGetGender';
import {Axios} from '../../../../lib/Axios';
import {ApiEndpoints} from '../../../../store/ApiEndpoints';

type Props = {
  onSubmit: (
    values: RegisterFormValues,
    formikHelpers: FormikHelpers<any>,
  ) => void;
};

export const RegisterForm: FC<Props> = ({onSubmit}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const {t} = useTranslation();

  const {genderList, dataLoading} = useGetGender();

  const initialValues: RegisterFormValues = {
    username: '',
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: 0,
  };

  const [is, setIs] = useState(false);
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(String(t('Username is required'))),
    fullName: Yup.string().required(String(t('Fullname is required'))),
    phone: Yup.string()
      .matches(MobileValidation, String(t('Phone Number is not valid')))
      .required(String(t('Phone Number is required'))),
    email: Yup.string()
      .test(
        'checkEmail',
        String(t('This email is already registered.')),
        async value =>
          await Axios.post(ApiEndpoints.auth.uniqueCheck, {
            type: 'email',
            value: value,
          }).then(async res => {
            if (res.data.status === 'ok') {
              return res.data.data.is_avaiable;
            }
          }),
      )
      .matches(EmailValidation, String(t('Email is not valid')))
      .required(String(t('Email is required!'))),
    password: Yup.string().required(String(t('Password is required!'))),
    confirmPassword: Yup.string().required(
      String(t('Confirm Password is required!')),
    ),
    dob: Yup.string().required(String(t('Dob  is required'))),
  });

  return (
    <Box flex={1}>
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
          setFieldValue,
        }) => {
          return (
            <>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <Text
                  fontFamily={'body'}
                  fontStyle={'normal'}
                  color={'white'}
                  fontWeight={'100'}
                  fontSize={'sm'}
                  px={5}
                  my={6}>
                  {t(
                    'Create your profile, invite friends and form teams, discover and book places to play, invite local players and never fall short of players',
                  )}
                </Text>
                <Box px={5}>
                  <FormInput
                    isRequired={true}
                    isInvalid={touched.username && 'username' in errors}
                    onChangeText={handleChange('username')}
                    placeholder={t('Enter Your Username')}
                    error={errors?.username}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    label={String(t('Username'))}
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  />
                  <FormInput
                    isRequired={true}
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
                    isInvalid={touched.phone && 'phone' in errors}
                    onChangeText={handleChange('phone')}
                    placeholder={t('Enter Your Mobile Number')}
                    error={errors?.phone}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    label={String(t('Mobile Number'))}
                    keyboardType={'number-pad'}
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  />
                  <FormInput
                    isRequired={true}
                    isInvalid={touched.email && 'email' in errors}
                    onChangeText={handleChange('email')}
                    placeholder={t('Enter Your Email')}
                    error={errors?.email}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    label={String(t('Email'))}
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  />
                  <FormControl mb={5}>
                    <FormControl.Label
                      _text={{
                        fontFamily: 'heading',
                        fontWeight: '100',
                        fontStyle: 'normal',
                        fontSize: 'sm',
                        color: 'secondary.400',
                      }}>
                      {String(t('Gender'))}
                    </FormControl.Label>
                    <DropDownPicker
                      open={is}
                      value={value}
                      setOpen={setIs}
                      setValue={val => {
                        setValue(val);
                        setFieldValue('gender', val);
                      }}
                      disableBorderRadius={false}
                      dropDownDirection="BOTTOM"
                      loading={dataLoading}
                      ActivityIndicatorComponent={() => (
                        <ActivityIndicator color={'white'} size={15} />
                      )}
                      items={genderList.map(i => ({
                        label: i.name,
                        value: i.id,
                      }))}
                      style={{
                        backgroundColor: Colors.primary,
                      }}
                      textStyle={{
                        fontSize: 16,
                        color: 'white',
                        fontFamily: 'Helvetica',
                      }}
                      theme={'DARK'}
                      listItemContainerStyle={{
                        backgroundColor: Colors.background,
                      }}
                      listItemLabelStyle={{
                        color: 'white',
                        fontFamily: 'Helvetica',
                        paddingVertical: 10,
                        fontSize: 16,
                      }}
                      ArrowUpIconComponent={() => (
                        <MaterialIcons
                          name="keyboard-arrow-up"
                          size={24}
                          color="white"
                        />
                      )}
                      ArrowDownIconComponent={() => (
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={24}
                          color="white"
                        />
                      )}
                      TickIconComponent={() => (
                        <Feather name="check" size={24} color="white" />
                      )}
                      arrowIconStyle={{
                        width: 20,
                        height: 20,
                      }}
                      dropDownContainerStyle={{
                        borderColor: Colors.secondary,
                        borderWidth: 1,
                        borderRadius: 0,
                      }}
                      selectedItemLabelStyle={{
                        color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 16,
                        paddingVertical: 10,
                      }}
                      containerStyle={{
                        backgroundColor: Colors.background,
                        borderColor: Colors.secondary,
                        borderWidth: 1,
                      }}
                      placeholder={String(t('Select Gender'))}
                      placeholderStyle={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                        fontSize: 16,
                      }}
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}>
                      {String(t('Please'))}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <Pressable
                    onPress={() => setOpen(true)}
                    marginTop={is ? 20 : 0}>
                    <View pointerEvents={'none'}>
                      <FormInput
                        textAlign={I18nManager.isRTL ? 'right' : 'left'}
                        isInvalid={touched.dob && 'dob' in errors}
                        onChangeText={handleChange('dob')}
                        placeholder={t('Enter Date Of Birth')}
                        error={errors?.email}
                        onBlur={handleBlur('dob')}
                        value={
                          values.dob === ''
                            ? ''
                            : format(values.dob, 'dd/MM/yyyy')
                        }
                        icon={Feather}
                        label={String(t('Date of birth'))}
                        iconName1={'calendar'}
                        show={true}
                        editable={false}
                        isRequired={false}
                      />
                    </View>
                  </Pressable>
                  <DatePicker
                    modal
                    open={open}
                    date={new Date()}
                    mode="date"
                    onConfirm={date => {
                      setOpen(false);
                      setFieldValue('dob', date, true);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  <FormInput
                    isRequired={true}
                    isInvalid={touched.password && 'password' in errors}
                    onChangeText={handleChange('password')}
                    placeholder={t('Enter Your password')}
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
                  <FormInput
                    isRequired={true}
                    isInvalid={
                      touched.confirmPassword && 'confirmPassword' in errors
                    }
                    onChangeText={handleChange('confirmPassword')}
                    placeholder={t('Enter Your confirm password')}
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
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  />
                </Box>
              </KeyboardAwareScrollView>
              <Box p={5} bg={'background.400'}>
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
                  isLoadingText={String(t('Register'))}
                  spinnerPlacement={'end'}
                  onPress={handleSubmit}>
                  {t('Register')}
                </Button>
              </Box>
            </>
          );
        }}
      </Formik>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.secondary,
    borderWidth: 0.5,
    borderRadius: 0,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.white,
  },
});
