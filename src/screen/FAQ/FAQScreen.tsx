import React, {FC, useState} from 'react';
import {
  Box,
  ChevronDownIcon,
  HStack,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';

import {RootStackScreenProps} from '../../navigation/types';
import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {useTranslation} from 'react-i18next';
import {useInit} from '../../hooks/useInit';
import {Loader} from '../../component/common/Loader';
import i18n from 'i18next';

type Props = RootStackScreenProps<'FAQ'>;

export const FAQScreen: FC<Props> = () => {
  const {t} = useTranslation();
  const {faqList, dataLoading} = useInit();
  const locale = i18n.language;

  const [show, setShow] = useState('1');
  return (
    <AppLayout>
      <Header heading={String(t('FAQ'))} />
      {dataLoading ? (
        <Loader />
      ) : (
        <ScrollView
          flex={1}
          mt={3}
          mx={5}
          showsHorizontalScrollIndicator={false}>
          {faqList.map(m => (
            <Box
              key={String(m.id)}
              borderWidth={1}
              borderColor={'secondary.400'}
              mb={3}
              bg={'#1B2C46'}>
              <Pressable onPress={() => setShow(String(m.id))}>
                <HStack
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  p={2}>
                  <Text
                    fontFamily={'body'}
                    fontWeight={'100'}
                    fontStyle={'normal'}
                    fontSize={13}
                    lineHeight={22}
                    w={'95%'}
                    color={'white'}>
                    {locale === 'en' ? m.title_en : m.title_ar}
                  </Text>
                  <ChevronDownIcon color={'white'} />
                </HStack>
              </Pressable>
              {show === String(m.id) && (
                <Box borderTopWidth={1} borderTopColor={'secondary.400'} p={2}>
                  <Text
                    fontFamily={'body'}
                    fontWeight={'100'}
                    fontStyle={'normal'}
                    lineHeight={20}
                    fontSize={12}
                    color={'white'}>
                    {locale === 'en' ? m.description_en : m.description_ar}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </ScrollView>
      )}
    </AppLayout>
  );
};
