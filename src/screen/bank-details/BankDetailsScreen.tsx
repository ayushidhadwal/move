import React, {FC} from 'react';

import {AppLayout} from '../../component/common/AppLayout';
import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../../component/common/Header';
import {BankDetailsForm} from './components/BankDetailsForm';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';
import {BankDetailsFormValues} from '../../types';
import {bankDetails} from '../../store/bankDetails/bankSlice';
import {useTranslation} from 'react-i18next';

type Props = RootStackScreenProps<'BankDetails'>;

export const BankDetailsScreen: FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const {t} = useTranslation();

  const setError = useError();
  const onSubmit = async ({
    accountHolderName,
    bankName,
    iban,
  }: BankDetailsFormValues) => {
    try {
      await dispatch(bankDetails({accountHolderName, bankName, iban})).unwrap();
      setMessage(String(t('Bank details updated successfully !!!')));
      navigation.goBack();
    } catch (e: any) {
      console.log(e.message);
      setError(e);
    }
  };
  return (
    <AppLayout>
      <Header heading={'Bank details'} />
      <BankDetailsForm onSubmit={onSubmit} />
    </AppLayout>
  );
};
