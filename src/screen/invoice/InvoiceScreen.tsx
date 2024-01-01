import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, FlatList} from 'native-base';

import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {RootStackScreenProps} from '../../navigation/types';
import {InvoiceListItem} from '../../data/InvoiceList';
import {InvoiceCard} from './components/InvoiceCard';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {Loader} from '../../component/common/Loader';
import i18n from 'i18next';
import {useError} from '../../context/ErrorProvider';
import {Linking} from 'react-native';

type Props = RootStackScreenProps<'Invoice'>;

export const InvoiceScreen: FC<Props> = ({}) => {
  const [invoiceLoading, setInvoiceLoading] = useState<boolean>(true);
  const [invoiceList, setInvoiceList] = useState<InvoiceListItem[]>([]);
  const {t} = useTranslation();
  const setError = useError();
  const locale = i18n.language;
  const renderItem = ({
    item,
    index,
  }: {
    item: InvoiceListItem;
    index: number;
  }) => (
    <InvoiceCard
      amountValue={locale === 'en' ? item?.amount : item?.amount}
      dateValue={locale === 'en' ? item?.date : item?.date}
      transactionId={
        locale === 'en' ? item?.transaction_id : item?.transaction_id
      }
      venueName={locale === 'en' ? item?.venue_en : item?.venue_ar}
      id={item?.id}
      item={item}
      index={index}
      onPress={() => Linking.openURL(item?.invoice)}
    />
  );

  const getPayments = () => {
    Axios.get(`${ApiEndpoints.invoice.getInvoiceList}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          if (response.data.data) {
            setInvoiceList(response?.data?.data?.invoiceList);
            console.log(response.data.data.invoiceList);
            // setTopUpList(TopUpList);
          }
        }
      })
      .catch((e: any) => {
        setError(e.message);
      })
      .finally(() => {
        setInvoiceLoading(false);
      });
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <AppLayout>
      <Header heading={String(t('Invoices'))} />
      {invoiceLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={invoiceList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </Box>
      )}
    </AppLayout>
  );
};
