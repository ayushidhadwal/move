import React, {FC} from 'react';
import {Button, HStack, Modal, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type Props = {
  visible: boolean;
  onClose: () => void;
  yesHandler: () => void;
};

export const AlertModal: FC<Props> = ({visible, onClose, yesHandler}) => {
  const {t} = useTranslation();

  return (
    <Modal isOpen={visible} onClose={onClose} size={'lg'}>
      <Modal.Content bg={'background.400'}>
        <Text
          fontFamily={'body'}
          my={5}
          mx={3}
          textAlign={'center'}
          fontWeight={'100'}
          fontSize={'md'}
          fontStyle={'normal'}
          color={'white'}>
          {t('Are you sure you want to quit the process ?')}
        </Text>
        <HStack justifyContent={'space-between'} alignItems={'center'} mx={5}>
          <Button
            colorScheme={'secondary'}
            size={'sm'}
            w={'25%'}
            alignSelf={'center'}
            mb={5}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'sm',
              color: 'primary.400',
            }}
            onPress={onClose}>
            {t('NO')}
          </Button>
          <Button
            colorScheme={'secondary'}
            size={'sm'}
            w={'25%'}
            alignSelf={'center'}
            mb={5}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'sm',
              color: 'primary.400',
            }}
            onPress={yesHandler}>
            {t('Yes')}
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
};
