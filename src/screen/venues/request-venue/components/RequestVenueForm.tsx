import React, {FC} from 'react';
import {I18nManager} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Box} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {FormInput} from '../../../../component/common/FormInput';
import {useTranslation} from 'react-i18next';
import {RequestVenueFormValues} from '../../../../types';

type Props = {
  onSubmit: (values: RequestVenueFormValues) => void;
};

export const RequestVenueForm: FC<Props> = ({onSubmit}: Props) => {
  const {t} = useTranslation();
  const initialValues: RequestVenueFormValues = {
    venueName: '',
    otherDetails: '',
    location: '',
  };

  const validationSchema = Yup.object().shape({
    venueName: Yup.string().required(String(t('Venue Name is required'))),
    otherDetails: Yup.string().required(String(t('Details is required'))),
    location: Yup.string().required(String(t('Location is required'))),
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
          <Box mt={2} flex={1}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <Box px={5}>
                <FormInput
                  isRequired={true}
                  isInvalid={touched.venueName && 'venueName' in errors}
                  onChangeText={handleChange('venueName')}
                  placeholder={t('Enter Venue Name')}
                  error={errors?.venueName}
                  onBlur={handleBlur('venueName')}
                  value={values.venueName}
                  label={String(t('Venue Name'))}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <FormInput
                  isInvalid={touched.otherDetails && 'otherDetails' in errors}
                  onChangeText={handleChange('otherDetails')}
                  placeholder={t('Enter Your Other Details')}
                  error={errors?.otherDetails}
                  onBlur={handleBlur('otherDetails')}
                  value={values.otherDetails}
                  label={String(t('Other details (optional)'))}
                  isRequired={false}
                  multiline={true}
                  numberOfLines={3}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
                <FormInput
                  isInvalid={touched.location && 'location' in errors}
                  onChangeText={handleChange('location')}
                  placeholder={t('Enter Your location')}
                  error={errors?.location}
                  onBlur={handleBlur('location')}
                  value={values.location}
                  label={String(t('Location'))}
                  isRequired={true}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
              </Box>
            </KeyboardAwareScrollView>
            <Box
              position={'absolute'}
              bottom={0}
              // mb={Platform.OS === 'ios' ? 0 : 16}
              right={0}
              left={0}
              px={5}
              pt={5}
              pb={5}
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
                isLoadingText={String(t('Send request'))}
                onPress={handleSubmit}>
                {t('Send request')}
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
