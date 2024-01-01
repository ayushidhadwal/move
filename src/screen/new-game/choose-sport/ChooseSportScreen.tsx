import React, {FC, useState} from 'react';
import {Box, Button, HStack, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {SvgUri} from 'react-native-svg';

import {ProgressBar} from './components/ProgressBar';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {AppLayout} from '../../../component/common/AppLayout';
import {RootStackScreenProps} from '../../../navigation/types';
import {useGetMatchCreate} from '../../../hooks/match/useGetMatchCreate';
import {Loader} from '../../../component/common/Loader';

type Props = RootStackScreenProps<'ChooseSport'>;

export const ChooseSportScreen: FC<Props> = ({navigation}) => {
  const [select, setSelect] = useState<string>('');
  const [SportId, setSportId] = useState<string>('');
  const [level, setLevel] = useState<[]>([]);

  const {t} = useTranslation();
  const {sportsList, dataLoading} = useGetMatchCreate();

  return (
    <AppLayout>
      <Box flex={1}>
        <ScreenHeader
          heading={String(t('Choose sport'))}
          matchCreating={true}
        />
        <ProgressBar value={1} />
        {dataLoading ? (
          <Loader />
        ) : (
          sportsList.length > 0 && (
            <>
              <Box flex={1} justifyContent={'center'} alignItems={'center'}>
                <Pressable
                  alignSelf={'center'}
                  borderWidth={'1'}
                  borderColor={'white'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  p={3}
                  w={120}
                  h={120}
                  bg={
                    select === sportsList[0]?.sports_name
                      ? 'yellow.400'
                      : 'background.400'
                  }
                  onPress={() => {
                    setSelect(sportsList[0]?.sports_name);
                    setLevel(sportsList[0]?.levels);
                    setSportId(String(sportsList[0]?.id));
                  }}>
                  {SportId === String(sportsList[0]?.id) ? (
                    <SvgUri
                      width={60}
                      height={60}
                      uri={sportsList[0].active_icon_url}
                    />
                  ) : (
                    <SvgUri
                      width={60}
                      height={60}
                      uri={sportsList[0].icon_url}
                    />
                  )}
                  <Text
                    fontFamily={'body'}
                    mt={2}
                    fontWeight={
                      select === sportsList[0]?.sports_name ? '200' : '100'
                    }
                    fontStyle={'normal'}
                    fontSize={'md'}
                    color={
                      select === sportsList[0]?.sports_name
                        ? 'primary.400'
                        : 'white'
                    }>
                    {sportsList[0]?.sports_name}
                  </Text>
                </Pressable>
                <HStack
                  justifyContent={'space-between'}
                  my={10}
                  mx={5}
                  w={'80%'}>
                  <Pressable
                    alignSelf={'center'}
                    borderWidth={'1'}
                    borderColor={'white'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    p={3}
                    w={120}
                    h={120}
                    bg={
                      select === sportsList[1]?.sports_name
                        ? 'yellow.400'
                        : 'background.400'
                    }
                    onPress={() => {
                      setSportId(String(sportsList[1]?.id));
                      setSelect(sportsList[1]?.sports_name);
                      setLevel(sportsList[1]?.levels);
                    }}>
                    {SportId === String(sportsList[1]?.id) ? (
                      <SvgUri
                        width={60}
                        height={60}
                        uri={sportsList[1].active_icon_url}
                      />
                    ) : (
                      <SvgUri
                        width={60}
                        height={60}
                        uri={sportsList[1].icon_url}
                      />
                    )}
                    <Text
                      fontFamily={'body'}
                      mt={2}
                      fontWeight={
                        select === sportsList[1]?.sports_name ? '200' : '100'
                      }
                      fontStyle={'normal'}
                      fontSize={'md'}
                      color={
                        select === sportsList[1]?.sports_name
                          ? 'primary.400'
                          : 'white'
                      }>
                      {sportsList[1]?.sports_name}
                    </Text>
                  </Pressable>
                  <Pressable
                    alignSelf={'center'}
                    borderWidth={'1'}
                    borderColor={'white'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    p={3}
                    w={120}
                    h={120}
                    bg={
                      select === sportsList[2]?.sports_name
                        ? 'yellow.400'
                        : 'background.400'
                    }
                    onPress={() => {
                      setSportId(String(sportsList[2]?.id));
                      setSelect(sportsList[2]?.sports_name);
                      setLevel(sportsList[2]?.levels);
                    }}>
                    {SportId === String(sportsList[2]?.id) ? (
                      <SvgUri
                        width={60}
                        height={60}
                        uri={sportsList[2].active_icon_url}
                      />
                    ) : (
                      <SvgUri
                        width={60}
                        height={60}
                        uri={sportsList[2].icon_url}
                      />
                    )}
                    <Text
                      fontFamily={'body'}
                      mt={2}
                      fontWeight={
                        select === sportsList[2]?.sports_name ? '200' : '100'
                      }
                      fontStyle={'normal'}
                      fontSize={'md'}
                      color={
                        select === sportsList[2]?.sports_name
                          ? 'primary.400'
                          : 'white'
                      }>
                      {sportsList[2]?.sports_name}
                    </Text>
                  </Pressable>
                </HStack>
                {sportsList.length > 3 && (
                  <Pressable
                    alignSelf={'center'}
                    borderWidth={'1'}
                    borderColor={'white'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    p={3}
                    w={120}
                    h={120}
                    bg={
                      select === sportsList[3]?.sports_name
                        ? 'yellow.400'
                        : 'background.400'
                    }
                    onPress={() => {
                      setSportId(String(sportsList[3]?.id));
                      setSelect(sportsList[3]?.sports_name);
                      setLevel(sportsList[3]?.levels);
                    }}>
                    {SportId === String(sportsList[3]?.id) ? (
                      <SvgUri
                        width={60}
                        height={60}
                        uri={sportsList[3].active_icon_url}
                      />
                    ) : (
                      <SvgUri
                        width={60}
                        height={60}
                        uri={sportsList[3].icon_url}
                      />
                    )}
                    <Text
                      fontFamily={'body'}
                      mt={2}
                      fontWeight={
                        select === sportsList[3]?.sports_name ? '200' : '100'
                      }
                      fontStyle={'normal'}
                      fontSize={'md'}
                      color={
                        select === sportsList[3]?.sports_name
                          ? 'primary.400'
                          : 'white'
                      }>
                      {sportsList[3]?.sports_name}
                    </Text>
                  </Pressable>
                )}
              </Box>
              <Box pt={5} px={5} pb={5} bg={'background.400'}>
                <Button
                  variant={'solid'}
                  w={'100%'}
                  rounded={0}
                  isDisabled={level.length === 0}
                  _text={{
                    fontFamily: 'heading',
                    fontWeight: '100',
                    fontStyle: 'italic',
                    fontSize: 'md',
                    color: 'primary.400',
                  }}
                  colorScheme={'secondary'}
                  onPress={() =>
                    navigation.navigate('GameDifficulty', {
                      level: level,
                      SportId: SportId,
                    })
                  }>
                  {t('Next')}
                </Button>
              </Box>
            </>
          )
        )}
      </Box>
    </AppLayout>
  );
};
