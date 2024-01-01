import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {AppLayout} from '../../component/common/AppLayout';
import {RootStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../component/common/ScreenHeader';
import {ChangeInfoForm} from './components/ChangeInfoForm';
import {useError} from '../../context/ErrorProvider';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {UpdateProfileFormValues} from '../../types';
import {updateProfile} from '../../store/user/userSlice';

type Props = RootStackScreenProps<'ChangeInfo'>;

export const ChangeInfoScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const onSubmit = async ({
    username,
    fullName,
    email,
  }: UpdateProfileFormValues) => {
    try {
      await dispatch(updateProfile({username, fullName, email})).unwrap();
      setMessage(String(t('Updated Successfully')));
      navigation.goBack();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <AppLayout>
      <ScreenHeader heading={String(t('Change Info'))} />
      <ChangeInfoForm onSubmit={onSubmit} />
    </AppLayout>
  );
};
