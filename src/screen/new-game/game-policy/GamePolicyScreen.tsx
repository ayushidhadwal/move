import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Image,
  Pressable,
  Text,
} from 'native-base';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = RootStackScreenProps<'GamePolicy'>;

export const GamePolicyScreen: FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <AppLayout>
      <Header />
      <Box flex={1} alignItems={'center'}>
        <Image
          source={require('../../../assets/img/policy.png')}
          w={220}
          h={220}
          alt={'no img'}
          resizeMode={'contain'}
          mt={10}
        />
        <Text
          mt={5}
          mb={4}
          fontFamily={'heading'}
          fontWeight={'100'}
          fontStyle={'italic'}
          fontSize={'xl'}
          color={'secondary.400'}>
          {t("Organiser's Policy")}
        </Text>
        <Text
          fontFamily={'body'}
          fontWeight={'100'}
          fontStyle={'normal'}
          fontSize={Platform.OS === 'ios' ? 14 : 13}
          lineHeight={22}
          px={3}
          textAlign={'center'}
          color={'white'}>
          {t('Game Description')}
        </Text>
        <Text
          mt={12}
          fontFamily={'body'}
          fontWeight={'200'}
          fontStyle={'normal'}
          fontSize={Platform.OS === 'ios' ? 11.5 : 11}
          textAlign={'justify'}
          color={'yellow.400'}>
          {t('Disclaimer')}:{' '}
          <Text
            fontFamily={'body'}
            fontWeight={'100'}
            fontStyle={'normal'}
            color={'yellow.400'}>
            {t('Games that do not comply with our policy will be canceled')}
          </Text>
        </Text>
        <Box mt={3} position={'absolute'} w={'100%'} bottom={0}>
          <HStack mx={8} mb={1} alignItems={'center'}>
            {checked ? (
              <Box
                borderWidth={1}
                borderColor={'yellow.400'}
                size="5"
                bg={'rgba(255,213,61,0.23)'}
                alignItems={'center'}
                justifyContent={'center'}>
                <CheckIcon size="4" color="white" />
              </Box>
            ) : (
              <Pressable onPress={() => setChecked(!checked)}>
                <Ionicons name="square-outline" size={24} color="white" />
              </Pressable>
            )}
            <Text
              ml={2}
              fontFamily={'body'}
              fontWeight={'200'}
              fontStyle={'normal'}
              color={'yellow.400'}>
              {t('I accept the terms and conditions')}
            </Text>
          </HStack>
          <Box pt={5} px={5} pb={5} bg={'background.400'}>
            <Button
              variant={'solid'}
              w={'100%'}
              isDisabled={!checked}
              rounded={0}
              _text={{
                fontFamily: 'heading',
                fontWeight: '100',
                fontStyle: 'italic',
                fontSize: 'md',
                color: 'primary.400',
              }}
              colorScheme={'secondary'}
              onPress={() => navigation.navigate('ChooseSport')}>
              {t('Next')}
            </Button>
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
};
