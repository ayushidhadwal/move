import React, {FC} from 'react';
import {Box, HStack, Input, Pressable, Text} from 'native-base';
import {I18nManager, Linking, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../navigation/types';
import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {Copy, Instagram, SnapChat, Youtube} from '../../component/svg';
import {Loader} from '../../component/common/Loader';
import {useCustomerSupport} from '../../hooks/useCustomerSupport';

type Props = RootStackScreenProps<'CustomerSupport'>;

export const CustomerSupportScreen: FC<Props> = ({}) => {
  const {t} = useTranslation();
  const {customerSupport, dataLoading} = useCustomerSupport();

  return (
    <AppLayout>
      <Header heading={String(t('Customer support'))} />
      {dataLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <Text
            textAlign={'left'}
            mx={5}
            mt={5}
            fontFamily={'heading'}
            fontSize={'sm'}
            fontStyle={'italic'}
            color={'secondary.400'}
            fontWeight={'100'}>
            {t('Email')}
          </Text>
          <Pressable onPress={() => Clipboard.setString(customerSupport.email)}>
            <View pointerEvents={'none'}>
              <Input
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                colorScheme={'primary'}
                size={'lg'}
                variant="outline"
                w={'90%'}
                mt={2}
                editable={false}
                color={'white'}
                alignSelf={'center'}
                borderColor={'secondary.400'}
                invalidOutlineColor={'secondary.400'}
                backgroundColor={'#1B2C46'}
                focusOutlineColor={'secondary.400'}
                value={customerSupport.email}
                placeholderTextColor={'gray.400'}
                InputRightElement={
                  <Pressable
                    onPress={() => Clipboard.setString(customerSupport.email)}
                    mr={2}>
                    <Copy width={20} height={20} />
                  </Pressable>
                }
              />
            </View>
          </Pressable>
          <Text
            textAlign={'left'}
            mx={5}
            mt={6}
            fontFamily={'heading'}
            fontSize={'sm'}
            fontStyle={'italic'}
            color={'secondary.400'}
            fontWeight={'100'}>
            {t('WhatsApp')}
          </Text>
          <Input
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
            colorScheme={'primary'}
            size={'lg'}
            variant="outline"
            w={'90%'}
            mt={2}
            editable={false}
            color={'white'}
            alignSelf={'center'}
            borderColor={'secondary.400'}
            invalidOutlineColor={'secondary.400'}
            backgroundColor={'#1B2C46'}
            focusOutlineColor={'secondary.400'}
            value={customerSupport.whatsapp_number}
            placeholderTextColor={'gray.400'}
            InputRightElement={
              <Pressable
                onPress={() =>
                  Clipboard.setString(customerSupport.whatsapp_number)
                }
                mr={2}>
                <Copy width={20} height={20} />
              </Pressable>
            }
          />
          <HStack
            m={7}
            alignSelf={'center'}
            justifyContent={'space-between'}
            w={'28%'}>
            <Pressable
              onPress={() => Linking.openURL(customerSupport.instagram)}>
              <Instagram height={24} width={24} />
            </Pressable>
            <Pressable onPress={() => Linking.openURL(customerSupport.youtube)}>
              <Youtube height={24} width={24} />
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL(customerSupport.snapchat)}>
              <SnapChat height={24} width={24} />
            </Pressable>
          </HStack>
        </Box>
      )}
    </AppLayout>
  );
};
