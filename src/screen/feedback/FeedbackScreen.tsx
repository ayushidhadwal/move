import React, {FC} from 'react';
import {Formik} from 'formik';
import {Box, Button, FormControl, Input} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {I18nManager, Platform} from 'react-native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../navigation/types';
import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {useError} from '../../context/ErrorProvider';
import {useMessage} from '../../hooks/useMessage';
import {useAppDispatch} from '../../store';
import {addFeedback} from '../../store/user/userSlice';

type Props = RootStackScreenProps<'Feedback'>;

type FeedbackFormValues = {
  feedback: string;
};

export const FeedbackScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const setError = useError();
  const setMessage = useMessage();
  const dispatch = useAppDispatch();

  const onSubmit = async ({feedback}: FeedbackFormValues) => {
    try {
      await dispatch(addFeedback({feedback})).unwrap();
      setMessage(String(t('Feedback sent successfully.')));
      navigation.goBack();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const initialValues: FeedbackFormValues = {
    feedback: '',
  };

  const validationSchema = Yup.object().shape({
    feedback: Yup.string().required(String(t('Feedback is required!'))),
  });

  return (
    <AppLayout>
      <Header heading={String(t('Feedback'))} />
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
          console.log(errors);
          return (
            <Box mt={5} flex={1}>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <Box px={5}>
                  <FormControl
                    isInvalid={touched.feedback && 'feedback' in errors}>
                    <FormControl.Label
                      _text={{
                        fontSize: 'sm',
                        fontWeight: 100,
                        fontStyle: 'italic',
                        fontFamily: 'heading',
                        color: 'secondary.400',
                      }}>
                      {t('Enter your feedback here')}
                    </FormControl.Label>
                    <Input
                      textAlign={I18nManager.isRTL ? 'right' : 'left'}
                      onChangeText={handleChange('feedback')}
                      onBlur={handleBlur('feedback')}
                      value={values.feedback}
                      variant="outline"
                      multiline={true}
                      numberOfLines={6}
                      h={200}
                      bg={'#1B2C46'}
                      _focus={{
                        bg: '#1B2C46',
                      }}
                      borderColor={'secondary.400'}
                      focusOutlineColor={'secondary.400'}
                      colorScheme={'secondary'}
                      py={Platform.OS === 'ios' ? 4 : 2}
                      color={'white'}
                      fontFamily="body"
                      fontStyle={'italic'}
                      fontSize={'md'}
                      textAlignVertical={'top'}
                    />
                    <FormControl.ErrorMessage>
                      {errors.feedback}
                    </FormControl.ErrorMessage>
                  </FormControl>
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
                  spinnerPlacement={'end'}
                  isLoadingText={String(t('Submit'))}
                  onPress={handleSubmit}>
                  {t('Submit')}
                </Button>
              </Box>
            </Box>
          );
        }}
      </Formik>
    </AppLayout>
  );
};
