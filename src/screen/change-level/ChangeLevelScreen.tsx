import React, {FC, useState} from 'react';
import {Text, Box, HStack, Pressable, Button, Image} from 'native-base';

import {RootStackScreenProps} from '../../navigation/types';
import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {Advanced, Friendly} from '../../component/svg';
import {useTranslation} from 'react-i18next';

type Props = RootStackScreenProps<'ChangeLevel'>;

export const ChangeLevelScreen: FC<Props> = ({}) => {
  const {t} = useTranslation();
  const [select, setSelect] = useState<string>('Friendly');

  return (
    <AppLayout>
      <Header heading={String(t('Change level'))} />
      <Box flex={1}>
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <HStack justifyContent={'space-between'} my={10} mx={5} w={'80%'}>
            <Pressable
              alignSelf={'center'}
              borderWidth={'1'}
              borderColor={'white'}
              alignItems={'center'}
              justifyContent={'center'}
              p={3}
              w={120}
              h={120}
              bg={select === 'Friendly' ? 'yellow.400' : 'background.400'}
              onPress={() => setSelect('Friendly')}>
              <Image
                width={60}
                height={60}
                source={require('../../assets/handshake1.png')}
                alt={'no img'}
              />
              <Text
                fontFamily={'body'}
                mt={2}
                fontWeight={select === 'Friendly' ? '200' : '100'}
                fontStyle={'normal'}
                fontSize={'md'}
                color={select === 'Friendly' ? 'primary.400' : 'white'}>
                {t('Friendly')}
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
              bg={select === 'Advanced' ? 'yellow.400' : 'background.400'}
              onPress={() => setSelect('Advanced')}>
              <Advanced width={60} height={60} />
              <Text
                fontFamily={'body'}
                mt={2}
                fontWeight={select === 'Advanced' ? '200' : '100'}
                fontStyle={'normal'}
                fontSize={'md'}
                color={select === 'Advanced' ? 'primary.400' : 'white'}>
                {t('Advanced')}
              </Text>
            </Pressable>
          </HStack>
        </Box>
        <Box pt={5} px={5} pb={5} bg={'background.400'}>
          <Button
            variant={'solid'}
            w={'100%'}
            rounded={0}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'md',
              color: 'primary.400',
            }}
            colorScheme={'secondary'}
            onPress={() => {}}>
            {t('Save')}
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
};
