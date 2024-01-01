import React, {FC} from 'react';
import {
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../navigation/types';
import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {blockListDTO, useBlockList} from '../../hooks/user/useBlockList';
import {Loader} from '../../component/common/Loader';
import {Empty} from '../../component/common/Empty';
import {block} from '../../store/follow/followSlice';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {useError} from '../../context/ErrorProvider';

type Props = RootStackScreenProps<'BlockList'>;

export const BlockListScreen: FC<Props> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const setError = useError();

  const {blockedList, loading} = useBlockList();

  const onPressHandler = async ({id}: {id: string}) => {
    let type: number = 2;
    try {
      await dispatch(block({id, type})).unwrap();
      setMessage(String(t('UnBlocked Successfully !!!')));
    } catch (e: any) {
      console.log(e.message);
      setError(e);
    }
  };

  const renderItem = ({item, index}: {item: blockListDTO; index: number}) => (
    <>
      {index === 0 && (
        <Divider mt={2} bg={'#2C3C56'} w={'90%'} alignSelf={'center'} />
      )}
      <Box mx={3} py={3} px={2}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack alignItems={'center'}>
            <Image
              source={
                item.block_whome.avatar_url
                  ? {uri: item.block_whome.avatar_url}
                  : require('../../assets/data/user2.png')
              }
              w={50}
              h={50}
              resizeMode={'cover'}
              borderRadius={100}
              alt={'no img'}
              borderColor={'background.400'}
              borderWidth={1}
            />
            <Text
              fontFamily={'body'}
              fontSize={'sm'}
              fontWeight={'100'}
              fontStyle={'normal'}
              color={'white'}
              ml={3}>
              {item.block_whome.username
                ? item.block_whome.username
                : 'TestUser'}
            </Text>
          </HStack>
          <Pressable
            bg={'yellow.400'}
            px={0.5}
            pt={0.5}
            onPress={() => onPressHandler({id: String(item.block_whome.id)})}>
            <Text
              fontFamily={'body'}
              fontSize={'sm'}
              fontWeight={'200'}
              fontStyle={'normal'}
              color={'black'}>
              {t('Unblock')}
            </Text>
          </Pressable>
        </HStack>
      </Box>
      <Divider bg={'#2C3C56'} w={'95%'} alignSelf={'center'} />
    </>
  );
  return (
    <AppLayout>
      <Header heading={String(t('Blocklist'))} />
      {loading ? (
        <Loader />
      ) : blockedList.length === 0 ? (
        <Empty />
      ) : (
        <Box flex={1}>
          <FlatList
            data={blockedList}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
          />
        </Box>
      )}
    </AppLayout>
  );
};
