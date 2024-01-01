import React, {FC, useState} from 'react';
import {Box, Button, HStack, Image, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {SvgUri} from 'react-native-svg';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {ScreenHeader} from '../../../component/common/ScreenHeader';
import {ProgressBar} from '../choose-sport/components/ProgressBar';

type Props = RootStackScreenProps<'GameDifficulty'>;

type LevelDTO = {
  id: number;
  level_en: string;
  level_ar: string;
  icon_url: string;
  active_icon_url: string;
};

export const GameDifficultyScreen: FC<Props> = ({navigation, route}) => {
  const level: LevelDTO[] = route.params.level;
  const SportId: string = route.params.SportId;

  const [levelId, setLevelId] = useState<string>('');
  const {t} = useTranslation();

  return (
    <AppLayout>
      <Box flex={1}>
        <ScreenHeader
          heading={String(t('Game difficulty'))}
          matchCreating={true}
        />
        <ProgressBar value={2} />
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <HStack
            justifyContent={'space-between'}
            my={10}
            mx={5}
            w={'80%'}
            flexWrap={'wrap'}>
            {level.map(m => (
              <Pressable
                key={m.id}
                alignSelf={'center'}
                borderWidth={'1'}
                borderColor={'white'}
                alignItems={'center'}
                justifyContent={'center'}
                p={3}
                mb={5}
                w={120}
                h={120}
                bg={levelId === String(m.id) ? 'yellow.400' : 'background.400'}
                onPress={() => {
                  setLevelId(String(m.id));
                }}>
                {levelId === String(m.id) ? (
                  <>
                    <SvgUri width={60} height={60} uri={m.active_icon_url} />
                    <SvgUri width={0} height={0} uri={m.icon_url} />
                  </>
                ) : (
                  <>
                    <SvgUri width={0} height={0} uri={m.active_icon_url} />
                    <SvgUri width={60} height={60} uri={m.icon_url} />
                  </>
                )}
                <Text
                  fontFamily={'body'}
                  mt={2}
                  fontWeight={levelId === String(m.id) ? '200' : '100'}
                  fontStyle={'normal'}
                  fontSize={'md'}
                  color={levelId === String(m.id) ? 'primary.400' : 'white'}>
                  {m.level_en}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </Box>

        <HStack p={5} bg={'background.400'} justifyContent={'space-between'}>
          <Button
            variant={'outline'}
            w={'48%'}
            rounded={0}
            borderColor={'yellow.400'}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'white',
            }}
            colorScheme={'yellow'}
            onPress={() => navigation.goBack()}>
            {t('Back')}
          </Button>
          <Button
            variant={'solid'}
            w={'48%'}
            rounded={0}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            isDisabled={levelId === ''}
            colorScheme={'secondary'}
            onPress={() =>
              navigation.navigate('SelectLocation', {
                SportId: SportId,
                levelId: levelId,
              })
            }>
            {t('Next')}
          </Button>
        </HStack>
      </Box>
    </AppLayout>
  );
};
