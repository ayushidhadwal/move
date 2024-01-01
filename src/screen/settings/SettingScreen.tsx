import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Text,
  Image,
} from 'native-base';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  Alert,
  Dimensions,
  I18nManager,
  ImageBackground,
  Platform,
  StatusBar,
  Share as RNShare,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BlurView} from '@react-native-community/blur';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {AppLayout} from '../../component/common/AppLayout';
import {RootStackScreenProps, VerificationFor} from '../../navigation/types';
import {Header} from '../../component/common/Header';
import {
  Block,
  Camera,
  CustomerSupport,
  FAQ,
  Info,
  Invoice,
  Language,
  Lock,
  NewComer,
  PlayerInfo,
  Share,
  Sports,
  Wallet,
} from '../../component/svg';
import OtpTextInput from '../auth/OTPScreen/components/OTPTextInput';
import {LOGIN, logout, verifyOtp} from '../../store/auth/authSlice';
import {RootState, useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {PhoneValues, VerifyOTPValues} from '../../types';
import {useError} from '../../context/ErrorProvider';
import {changeNumber, updatePicture} from '../../store/user/userSlice';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useGetUserDetails} from '../../hooks/user/useGetUserDetails';
import {Loader} from '../../component/common/Loader';
import {Image as NBImage} from '../../component/common/Image';

const WIDTH = Dimensions.get('screen').width;
const DEFAULT_IMG = require('../../assets/img/profile.png');

type Props = RootStackScreenProps<'Settings'>;

const RowItem = ({
  icon,
  heading,
  onPressHandler,
}: {
  icon: React.ReactNode;
  heading: string;
  onPressHandler: () => void;
}) => {
  return (
    <Pressable onPress={onPressHandler}>
      <HStack
        py={3}
        mx={3}
        mb={heading === 'Logout' ? 50 : 0}
        px={1}
        alignItems={'center'}
        borderBottomWidth={0.7}
        borderBottomColor={'secondary.400'}>
        {icon}
        <Text
          fontFamily={'body'}
          fontSize={'sm'}
          ml={3}
          textAlign={'left'}
          fontWeight={'100'}
          fontStyle={'normal'}
          color={'white'}>
          {heading}
        </Text>
      </HStack>
    </Pressable>
  );
};

export const SettingScreen: FC<Props> = ({navigation}) => {
  const {userId} = useSelector((state: RootState) => state.auth);

  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();
  const {userDetails, loading} = useGetUserDetails(userId);

  const [show, setShow] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const [customerId, setCustomerId] = useState<number>(0);
  const [phone, setPhone] = useState<string>('');
  const [image, setImage] = useState<string | undefined>('');

  useEffect(() => {
    if (userDetails) {
      setImage(userDetails.avatarUrl);
    }
  }, [userDetails.avatarUrl]);

  const initialValues: VerifyOTPValues = {
    otp: '',
  };

  const phoneInitialValues: PhoneValues = {
    phone: '',
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required(String(t('Otp is required'))),
  });

  const phoneValidationSchema = Yup.object().shape({
    phone: Yup.string().required(String(t('Phone Number is required'))),
  });

  const onSubmitHandler = async ({phone}: PhoneValues) => {
    try {
      const {userId} = await dispatch(changeNumber({phone})).unwrap();
      if (userId) {
        setCustomerId(userId);
        setPhone(phone);
        setVisible(true);
        setShow(false);
      }
    } catch (e: any) {
      setError(e);
    }
  };

  const onShare = async () => {
    await RNShare.share({
      message: 'Download our app https://www.move.com/player-profile/11',
    });
  };

  const onSubmit = async ({otp}: VerifyOTPValues) => {
    try {
      const result = await dispatch(
        verifyOtp({
          otp,
          mobile: phone,
          verificationFor: VerificationFor.CHANGE_NUMBER,
          userId: customerId,
        }),
      ).unwrap();
      if (result) {
        setMessage(String(t('Number Updated Successfully')));
        setVisible(false);
      }
    } catch (e: any) {
      setError(e);
    }
  };

  const logoutHandler = async () => {
    setMessage(String(t('You have Successfully Logout !!!')));

    try {
      await dispatch(logout()).unwrap();
      setMessage(String(t('You have Successfully Logout !!!')));
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  const choosePhotoFromLibrary = async () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            _openImagePicker();
            break;
          case RESULTS.UNAVAILABLE:
            setError('This feature is not available on this device!');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ).then(requestResult => {
              if (requestResult === RESULTS.GRANTED) {
                _openImagePicker();
              }
            });
            break;
          case RESULTS.LIMITED:
            _openImagePicker();
            break;
          case RESULTS.BLOCKED:
            setError(
              'The permission is denied! Please enable storage permission.',
            );
            openSettings().catch(settingsErr =>
              setError('Unable to open settings!'),
            );
            break;
        }
      })
      .catch(e => {
        setError(e.message);
      });
  };

  const _openImagePicker = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.5,
    });

    if ('assets' in result) {
      const [file] = result?.assets as Asset[];
      try {
        const {res} = await dispatch(updatePicture([file])).unwrap();
        if (res === 'ok') {
          setImage(file.uri);
          setMessage(String(t('Profile Picture Updated Successfully')));
        }
      } catch (e: any) {
        setMessage(e.message);
      }
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Settings'))} />
      <StatusBar barStyle={'light-content'} hidden={show || visible} />
      <ScrollView flex={1}>
        {loading ? (
          <Box mt={2} mb={3} w={100} h={100} alignSelf={'center'}>
            <Loader />
          </Box>
        ) : (
          <Box
            mt={2}
            mb={3}
            w={100}
            h={100}
            alignSelf={'center'}
            borderRadius={100}>
            <Image
              key={image}
              alt={'no img'}
              source={{uri: image}}
              w={'100%'}
              h={'100%'}
              rounded={100}
              borderColor={'yellow.400'}
              borderWidth={1.5}
              resizeMode={'cover'}
              // fallbackImg={DEFAULT_IMG}
            />
            <Pressable
              onPress={choosePhotoFromLibrary}
              position={'absolute'}
              bottom={0}
              right={3}>
              <Camera width={20} height={20} />
            </Pressable>
          </Box>
        )}
        <RowItem
          icon={<Info height={20} width={20} />}
          heading={String(t('Change info'))}
          onPressHandler={() => navigation.navigate('ChangeInfo')}
        />
        <RowItem
          icon={<PlayerInfo height={20} width={20} />}
          heading={String(t('Player info'))}
          onPressHandler={() => navigation.navigate('PlayerSport')}
        />
        <RowItem
          icon={<Invoice height={20} width={20} />}
          heading={String(t('Invoices'))}
          onPressHandler={() => navigation.navigate('Invoice')}
        />
        <RowItem
          icon={<Wallet height={20} width={20} />}
          heading={String(t('Move pay'))}
          onPressHandler={() =>
            navigation.navigate('MovePayTopTab', {screen: 'TopUp'})
          }
        />
        <RowItem
          icon={<Sports height={20} width={20} />}
          heading={String(t('Change Sport preference'))}
          onPressHandler={() => navigation.navigate('ChangeSportPreference')}
        />
        <RowItem
          icon={<NewComer height={20} width={20} />}
          heading={String(t('Change level'))}
          onPressHandler={() => navigation.navigate('ChangeLevel')}
        />
        <RowItem
          icon={<Lock height={20} width={20} />}
          heading={String(t('Change password'))}
          onPressHandler={() => navigation.navigate('UserChangePassword')}
        />
        <RowItem
          icon={
            <Image
              alt={'no img'}
              source={require('../../assets/img/refresh.png')}
              w={5}
              h={5}
            />
          }
          heading={String(t('Change number'))}
          onPressHandler={() => setShow(true)}
        />
        <RowItem
          icon={<Block height={20} width={20} />}
          heading={String(t('Blocklist'))}
          onPressHandler={() => navigation.navigate('BlockList')}
        />
        <RowItem
          icon={<Share height={20} width={20} />}
          heading={String(t('Share with friends'))}
          onPressHandler={onShare}
        />
        <RowItem
          icon={<CustomerSupport height={20} width={20} />}
          heading={String(t('Customer support'))}
          onPressHandler={() => navigation.navigate('CustomerSupport')}
        />
        <RowItem
          icon={
            <Image
              alt={'no img'}
              source={require('../../assets/img/feedback.png')}
              w={5}
              h={5}
            />
          }
          heading={String(t('feedback'))}
          onPressHandler={() => navigation.navigate('Feedback')}
        />
        <RowItem
          icon={<FAQ height={20} width={20} />}
          heading={String(t('FAQ'))}
          onPressHandler={() => navigation.navigate('FAQ')}
        />
        <RowItem
          icon={<Language height={20} width={20} />}
          heading={String(t('Change Language'))}
          onPressHandler={() => navigation.navigate('ChangeLanguage')}
        />
        <RowItem
          icon={
            <Image
              alt={'no img'}
              source={require('../../assets/img/logout.png')}
              w={5}
              h={5}
            />
          }
          heading={String(t('logout'))}
          onPressHandler={logoutHandler}
        />
      </ScrollView>
      <Modal
        isOpen={show}
        justifyContent="flex-end"
        onClose={() => setShow(false)}
        _backdrop={{
          _dark: {
            bg: 'black.800',
          },
          bg: 'black.800',
        }}
        size="xl">
        <KeyboardAvoidingView behavior={'padding'}>
          <ImageBackground
            source={require('../../assets/Background.jpg')}
            resizeMode={'cover'}
            style={{width: WIDTH}}>
            <Divider
              w={7}
              bg={'yellow.400'}
              alignSelf={'center'}
              h={0.5}
              mt={1}
            />
            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'white'}
              fontSize={'lg'}
              py={4}
              textAlign={'center'}>
              {t('Change mobile number')}
            </Text>
            <AntDesign
              name="closecircle"
              size={18}
              color={'#FD0101'}
              style={{position: 'absolute', top: 3, right: 3}}
              onPress={() => setShow(false)}
            />
            <Divider bg={'#2C3C56'} w={'90%'} alignSelf={'center'} />
            <Formik
              initialValues={phoneInitialValues}
              onSubmit={onSubmitHandler}
              validationSchema={phoneValidationSchema}>
              {({
                isSubmitting,
                values,
                handleBlur,
                errors,
                handleChange,
                handleSubmit,
              }) => {
                return (
                  <>
                    <FormControl>
                      <Input
                        colorScheme={'primary'}
                        size={'lg'}
                        variant="outline"
                        w={'90%'}
                        mt={5}
                        color={'white'}
                        alignSelf={'center'}
                        borderColor={'secondary.400'}
                        invalidOutlineColor={'secondary.400'}
                        backgroundColor={'primary.400'}
                        focusOutlineColor={'secondary.400'}
                        value={values.phone}
                        placeholder={String(t('Enter New Mobile Number'))}
                        placeholderTextColor={'gray.400'}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        keyboardType={'number-pad'}
                        textAlign={I18nManager.isRTL ? 'right' : 'left'}
                      />
                      <FormControl.ErrorMessage>
                        {errors.phone}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <Box mb={Platform.OS === 'ios' ? 10 : 8} mx={5} mt={6}>
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
                        isDisabled={isSubmitting}
                        isLoadingText={String(t('Next'))}
                        spinnerPlacement={'end'}
                        onPress={handleSubmit}>
                        {t('Next')}
                      </Button>
                    </Box>
                  </>
                );
              }}
            </Formik>
          </ImageBackground>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        isOpen={visible}
        justifyContent="flex-end"
        onClose={() => setVisible(false)}
        _backdrop={{
          _dark: {
            bg: 'black.800',
          },
          bg: 'black.800',
        }}
        size="xl">
        <KeyboardAvoidingView behavior={'padding'}>
          <ImageBackground
            source={require('../../assets/Background.jpg')}
            resizeMode={'cover'}
            style={{width: WIDTH}}>
            <Divider
              w={7}
              bg={'yellow.400'}
              alignSelf={'center'}
              h={0.5}
              mt={1}
            />

            <Text
              fontFamily="heading"
              fontWeight="100"
              fontStyle="italic"
              color={'white'}
              fontSize={'lg'}
              py={4}
              textAlign={'center'}>
              {t('Enter Code')}
            </Text>

            <AntDesign
              name="closecircle"
              size={18}
              color={'#FD0101'}
              style={{position: 'absolute', top: 0, right: 0, padding: 5}}
              onPress={() => setVisible(false)}
            />
            <Divider bg={'#2C3C56'} w={'90%'} alignSelf={'center'} />
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              {({isSubmitting, errors, handleChange, handleSubmit}) => {
                return (
                  <Box mt={5}>
                    <Box mx={8}>
                      <OtpTextInput
                        isInvalid={!!errors.otp}
                        numberOfInput={4}
                        onChangeText={handleChange('otp')}
                        autoFocus={false}
                      />
                    </Box>
                    <Box mb={Platform.OS === 'ios' ? 10 : 8} mx={5}>
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
                        onPress={handleSubmit}>
                        {t('Verify')}
                      </Button>
                    </Box>
                  </Box>
                );
              }}
            </Formik>
          </ImageBackground>
        </KeyboardAvoidingView>
      </Modal>

      {(show || visible) && (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          blurType="light"
          blurAmount={3}
          reducedTransparencyFallbackColor={'#0f1f38'}
        />
      )}
    </AppLayout>
  );
};
