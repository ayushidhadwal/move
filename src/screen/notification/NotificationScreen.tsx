import React, {FC, useEffect, useState} from 'react';
import {Box, FlatList, HStack, Pressable, Text} from 'native-base';
import {View} from 'react-native';

import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {RootStackScreenProps} from '../../navigation/types';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {Loader} from '../../component/common/Loader';
import {useNavigation} from '@react-navigation/native';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';

type Props = RootStackScreenProps<'Notification'>;

const NotificationList = [4, 5, 6, 7, 8, 9];

export const NotificationScreen: FC<Props> = ({route}) => {
  // const {matchId} = route.params;

  const [notificationLoading, setNotificationLoading] = useState<boolean>(true);
  const [notificationList, setNotificationsList] = useState<any[]>([]);
  const navigation = useNavigation();
  const setMessage = useMessage();
  const setError = useError();
  const getNotifications = () => {
    setNotificationLoading(true);

    Axios.get(`${ApiEndpoints.notification.notification}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setNotificationsList(response?.data?.data);
          // console.log(response.data.data.invitees);
        }
      })
      .catch((e: any) => {
        setError(e);
      })
      .finally(() => {
        setNotificationLoading(false);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const onPressHandler = async (item: any) => {
    console.log('item', item);

    var matchId = JSON.parse(item.data)!.match_id;

    var userId = JSON.parse(item.data)!.user_id;

    // var type = JSON.parse(item.data)!.type;
    var type = item.notify_type;
    console.log('march id and type', matchId, type);

    switch (type) {
      case 'JOIN': // if user has not completed the payment yet and not joined the match
        navigation.navigate('PaymentDetail', {
          matchId: matchId,
          selectedPlayerList: [userId],
          coupon: null,
        });
        break;
      case 'JOINED': // if user completed the payment and joined the match
        navigation.navigate('GameTopTab', {screen: 'Info', matchId: matchId});
        break;
      case 'REJECTED': // if host declined user request in game type private public access
        setMessage('Your request has been rejected');

        break;

      default:
        return;
    }
  };

  const {t} = useTranslation();
  const renderItem = ({item, index}: {item; index: number}) => (
    <Pressable
      onPress={() => {
        onPressHandler(item);
      }}
      bg={'background.400'}
      mx={5}
      mb={3}
      mt={index === 0 ? 5 : 0}>
      <HStack justifyContent={'space-between'} px={5} pt={5}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Title')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {item?.title}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} px={5} pt={3}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Description')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {item?.description}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} px={5} py={3}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Type')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {item?.notify_type}
        </Text>
      </HStack>
      <HStack justifyContent={'space-between'} px={5} py={3}>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'secondary.400'}>
          {t('Created at')}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={'sm'}
          color={'white'}>
          {item?.created_at}
        </Text>
      </HStack>
    </Pressable>
  );
  return (
    <AppLayout>
      <Header heading={String(t('Notifications'))} />
      {notificationLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={notificationList}
            renderItem={renderItem}
            keyExtractor={item => String(item)}
          />
        </Box>
      )}
    </AppLayout>
  );
};
