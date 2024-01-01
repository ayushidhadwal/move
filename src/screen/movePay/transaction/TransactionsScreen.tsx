import React, {FC, useEffect, useState} from 'react';
import {Box, FlatList} from 'native-base';
import {TransactionCard} from './components/TransactionCard';
import {TransactionItem, TransactionList} from '../../../data/TransactionList';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {TopUpListItem} from '../../../data/TopUpList';
import {Loader} from '../../../component/common/Loader';
import i18n from 'i18next';
import {useError} from '../../../context/ErrorProvider';

export const TransactionsScreen: FC = ({}) => {
  const [transactionLoading, setTransactionLoading] = useState<boolean>(true);
  const [transactionList, setTransactionList] = useState<TopUpListItem[]>([]);
  const locale = i18n.language;
  const setError = useError();

  const renderItem = ({item, index}: {item: TopUpListItem; index: number}) => (
    <TransactionCard
      refrenceValue={
        locale === 'en' ? item?.reference_id_en : item?.reference_id_ar
      }
      dateValue={locale === 'en' ? item?.date_en : item?.date_ar}
      amountValue={locale === 'en' ? item?.amount_en : item?.amount_ar}
      typeValue={locale === 'en' ? item?.type_en : item?.type_ar}
      id={item?.id}
      item={item}
      index={index}
    />
  );

  const getPayments = () => {
    Axios.get(`${ApiEndpoints.topUp.topUp}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          if (response.data.data) {
            setTransactionList(response?.data?.data?.transactionList);
            // console.log(response.data.wallet);
            // setTopUpList(TopUpList);
          }
        }
      })
      .catch((e: any) => {
        setError(e);
      })
      .finally(() => {
        setTransactionLoading(false);
      });
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <Box flex={1}>
      {transactionLoading ? (
        <Loader />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transactionList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </Box>
  );
};
