import React, {FC, useEffect, useState} from 'react';
import {Box, Button, FlatList, HStack, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {walletDTO} from '../../../store/wallet/types';
// import {Loader} from '../../../component/common/Loader';
// import {Axios} from '../../../lib/Axios';
// import {ApiEndpoints} from '../../../store/ApiEndpoints';
// import {InvitationItem} from '../../../data/InvitationList';
// import {useError} from '../../../context/ErrorProvider';
// import {Loader} from '../../../component/common/Loader';

type Props = RootStackScreenProps<'Coupon'>;

export const CouponScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();

  const matchId = route.params.matchId;
  const selectedPlayerList = route.params.selectedPlayerList;
  // const [couponLoading, setCouponLoading] = useState<boolean>(true);
  // const [couponList, setCouponList] = useState<CouponItem[]>([]);
  // const setError = useError();

  // const getCouponList = (matchId: number) => {
  //   Axios.get(`${ApiEndpoints.coupon.coupon}?match_id=${matchId}`)
  //
  //     .then((response: any) => {
  //       if (response.data.status === 'ok') {
  //         setCouponList(response.data.data.invitees);
  //       }
  //     })
  //     .catch((e: any) => {
  //       setError(e.message);
  //     })
  //     .finally(() => {
  //       setCouponLoading(false);
  //     });
  // };
  //
  // useEffect(() => {
  //   setCouponLoading(true);
  //   getCouponList();
  // });

  const renderItem = ({item, index}: {item: walletDTO; index: number}) => (
    <Pressable
      onPress={() =>
        navigation.navigate('PaymentDetail', {
          matchId: matchId,
          selectedPlayerList: selectedPlayerList,
          coupon: item.name,
        })
      }
      mt={index === 0 ? 3 : 0}
      mb={3}
      backgroundColor={'background.400'}
      borderColor={'secondary.400'}
      borderWidth={1}
      w={'95%'}
      alignSelf={'center'}
      borderStyle={'dashed'}>
      <HStack alignItems={'center'}>
        <Text
          w={'30%'}
          p={3}
          borderRightWidth={1}
          borderStyle={'dashed'}
          borderRightColor={'secondary.400'}
          color={'white'}
          fontWeight={'100'}
          fontFamily={'heading'}
          fontStyle={'italic'}
          textAlign={'center'}
          fontSize={'sm'}>
          {item.amount} KD
        </Text>
        <HStack w={'70%'} justifyContent={'space-between'}>
          <Text
            w={'60%'}
            p={3}
            color={'secondary.400'}
            fontWeight={'100'}
            fontFamily={'heading'}
            fontStyle={'normal'}
            fontSize={'sm'}>
            {item.name}
          </Text>
          <Button
            w={'40%'}
            alignSelf={'flex-end'}
            p={3}
            bg={'secondary.400'}
            _text={{
              color: 'white',
              fontWeight: '100',
              fontFamily: 'heading',
              fontStyle: 'normal',
              fontSize: 'sm',
            }}
            variant={'solid'}
            colorScheme={'white'}>
            {t('Apply')}
          </Button>
        </HStack>
      </HStack>
    </Pressable>
  );

  return (
    <AppLayout>
      <Header heading={String(t('Coupon'))} />
      {/*s*/}
    </AppLayout>
  );
};
