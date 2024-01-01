import React, {FC} from 'react';
import {Box, HStack, Image, ScrollView, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';

import {Colors} from '../../../../styles';
import {Star} from '../../../../component/svg';
import {reviewDTO} from '../../../../hooks/venue/useGetVenueDetails';
import {Loader} from '../../../../component/common/Loader';
import {Stars} from './components/Stars';
import i18n from 'i18next';

type Props = {
  dataLoading: boolean;
  reviewList: reviewDTO[];
};

export const ReviewScreen: FC<Props> = ({dataLoading, reviewList}) => {
  const {t} = useTranslation();
  const locale = i18n.language;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      {dataLoading ? (
        <Loader />
      ) : (
        <Box mb={20}>
          {reviewList.map(m => (
            <Box
              mt={6}
              p={1}
              alignSelf={'center'}
              bg={'background.400'}
              w={'90%'}>
              <HStack>
                <Image
                  source={{uri: m.image}}
                  w={70}
                  h={70}
                  resizeMode={'contain'}
                  alt={'no img'}
                  rounded={100}
                />
                <VStack ml={2}>
                  <Text
                    fontFamily={'body'}
                    fontSize={'lg'}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                    color={'white'}>
                    {m.name}
                  </Text>
                  <HStack justifyContent={'space-between'} w={'58%'} mt={2}>
                    <Stars width={22} height={22} rating={m.rating} />
                  </HStack>
                </VStack>
              </HStack>
              {m.details.map(i => (
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mt={5}>
                  <Text
                    w={'90%'}
                    textAlign={'left'}
                    fontFamily={'heading'}
                    fontSize={11}
                    fontWeight={'100'}
                    fontStyle={'italic'}
                    color={'secondary.400'}>
                    {locale === 'en' ? i.title_en : i.title_ar}
                  </Text>
                  <Text
                    fontFamily={'body'}
                    fontSize={12}
                    fontWeight={'200'}
                    fontStyle={'normal'}
                    color={'yellow.400'}
                    w={'10%'}
                    textAlign={'right'}>
                    {i.is_active}
                  </Text>
                </HStack>
              ))}
              <HStack alignItems={'center'} justifyContent={'center'} mt={3}>
                <Text
                  fontFamily={'heading'}
                  fontSize={'sm'}
                  fontWeight={'100'}
                  fontStyle={'italic'}
                  color={'secondary.400'}>
                  {t('Ground quality')}{' '}
                </Text>
                <HStack w={'32%'} justifyContent={'space-between'}>
                  <Stars width={18} height={18} rating={m.ground_quality} />
                </HStack>
              </HStack>
            </Box>
          ))}
        </Box>
      )}
    </ScrollView>
  );
};
