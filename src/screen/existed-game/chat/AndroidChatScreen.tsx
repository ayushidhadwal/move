import React, {FC, useEffect, useState, useRef} from 'react';
import {Box, HStack, Image, Input, Pressable, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AppLayout} from '../../../component/common/AppLayout';
import {PaymentMethodId, RootStackScreenProps} from '../../../navigation/types';
import {Header} from '../../../component/common/Header';
import {Send} from '../../../component/svg';
import {useTranslation} from 'react-i18next';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {TopUpListItem} from '../../../data/TopUpList';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {FlatList, Keyboard, ScrollView} from 'react-native';

type Props = RootStackScreenProps<'Android'>;

export const AndroidChatScreen: FC<Props> = ({navigation, route}) => {
  const {t} = useTranslation();
  const [commentLoading, setCommentLoading] = useState<boolean>(true);
  const [commentValue, setCommentValue] = useState<string>('');
  const [commentsList, setCommentsList] = useState<TopUpListItem[]>([]);
  const {userId} = useSelector((state: RootState) => state.auth);
  const {matchId} = route.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  // KEYBOARD HANDLING
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    // flatListRef.current.scrollToEnd({animated: true});
    setTimeout(() => {
      scrollToBottom();
    }, 300);

    setIsKeyboardVisible(true);

    // Do something when keyboard is shown
  };

  const _keyboardDidHide = () => {
    setIsKeyboardVisible(false);
    // Do something when keyboard is hidden
  };

  const getComments = () => {
    Axios.get(`${ApiEndpoints.comments.getComments}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          if (response.data.data) {
            setCommentsList(response.data.data);
          }
        }
      })
      .catch((error: any) => {
        //
      })
      .finally(() => {
        setCommentLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (commentsList.length > 0) {
      scrollToBottom();
    }
  }, [commentsList]);

  const postComments = async () => {
    try {
      const response = await Axios.post(ApiEndpoints.comments.postComments, {
        match_id: matchId,
        user_id: userId,
        comment: commentValue,
      });
      console.log(response.data);
      if (response.data.status === 'ok') {
        getComments();
        setCommentValue('');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const RightCard = ({comment, name, img}: any) => {
    return (
      <HStack mb={2} alignItems={'flex-start'} alignSelf={'flex-end'}>
        <>
          <Text
            p={2}
            mr={3}
            fontFamily={'body'}
            fontSize={'sm'}
            fontWeight={'100'}
            fontStyle={'normal'}
            color={'white'}
            bg={'background.400'}
            flexShrink={1}>
            {comment}
          </Text>
          <Box alignItems={'center'}>
            <Image alt={'no img'} source={{uri: img}} size={'xs'} />
            <Text
              fontFamily={'body'}
              fontSize={10}
              fontWeight={'100'}
              fontStyle={'normal'}
              color={'yellow.400'}>
              {name}
            </Text>
          </Box>
        </>
      </HStack>
    );
  };

  const LeftCard = ({comment, name, img}: any) => {
    return (
      <HStack mb={2} alignItems={'flex-start'}>
        <>
          <Box>
            <Image alt={'no img'} source={{uri: img}} size={'xs'} />
            <Text
              fontFamily={'body'}
              fontSize={10}
              fontWeight={'100'}
              fontStyle={'normal'}
              color={'white'}>
              {name}
            </Text>
          </Box>
          <Text
            p={2}
            ml={3}
            fontFamily={'body'}
            fontSize={'sm'}
            fontWeight={'100'}
            fontStyle={'normal'}
            color={'white'}
            bg={'background.400'}
            flexShrink={1}>
            {comment}
          </Text>
        </>
      </HStack>
    );
  };
  return (
    <AppLayout>
      {/*<Header heading={String(t('Comments'))} />*/}
      <ScrollView
        style={{flex: 1}}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollToBottom();
        }}
        // contentContainerStyle={{paddingBottom: 120}}
      >
        <Box p={5}>
          {commentsList.map(m => {
            if (m.user_id === userId) {
              return (
                <RightCard
                  comment={m.comment}
                  img={m.img_url}
                  name={m.name}
                  id={m.id}
                />
              );
            } else {
              return (
                <LeftCard
                  comment={m.comment}
                  img={m.img_url}
                  name={m.name}
                  id={m.id}
                />
              );
            }
          })}
        </Box>
      </ScrollView>

      <HStack p={5} bg={'background.400'} alignItems={'flex-start'}>
        {
          <Input
            value={commentValue}
            colorScheme={'primary'}
            size={'md'}
            variant="outline"
            w={'90%'}
            borderColor={'secondary.400'}
            backgroundColor={'rgba(138,202,255,0.10)'}
            focusOutlineColor={'secondary.400'}
            placeholder={String(t('Type here'))}
            placeholderTextColor={'gray.400'}
            mr={3}
            color={'white'}
            onChangeText={text => {
              setCommentValue(text);
            }}
          />
        }
        <Pressable onPress={postComments}>
          <Send width={22} height={22} />
        </Pressable>
      </HStack>
    </AppLayout>
  );
};
