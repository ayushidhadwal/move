import React, {FC} from 'react';
import {Box} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {RequestVenueForm} from './components/RequestVenueForm';
import {RequestVenueFormValues} from '../../../types';
import {useAppDispatch} from '../../../store';
import {useMessage} from '../../../hooks/useMessage';
import {createVenue} from '../../../store/venue/venueSlice';
import {useError} from '../../../context/ErrorProvider';

type Props = RootStackScreenProps<'RequestVenue'>;

export const RequestVenueScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const onSubmit = async ({
    venueName,
    otherDetails,
    location,
  }: RequestVenueFormValues) => {
    try {
      await dispatch(createVenue({venueName, otherDetails, location})).unwrap();
      setMessage(String(t('Request send Successfully !!')));
      navigation.goBack();
    } catch (e: any) {
      setError(e?.message);
    }
  };
  return (
    <AppLayout>
      <Box flex={1}>
        <ScreenHeader heading={String(t('Request venue'))} />
        <RequestVenueForm onSubmit={onSubmit} />
      </Box>
    </AppLayout>
  );
};
