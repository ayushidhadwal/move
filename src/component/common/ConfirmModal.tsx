import React, {FC} from 'react';
import {Button, HStack, Modal, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type Props = {
  message: string;
  visible: boolean;
  onClose: () => void;
  onPressHandler: () => void;
};

export const ConfirmModal: FC<Props> = ({
  message,
  visible,
  onClose,
  onPressHandler,
}) => {
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
          {message}
        </Text>
        <HStack justifyContent={'space-around'} alignItems={'center'}>
          <Button
            colorScheme={'secondary'}
            size={'sm'}
            w={'20%'}
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
            w={'20%'}
            alignSelf={'center'}
            mb={5}
            _text={{
              fontFamily: 'heading',
              fontWeight: '100',
              fontStyle: 'italic',
              fontSize: 'sm',
              color: 'primary.400',
            }}
            onPress={onPressHandler}>
            {t('Yes')}
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
};
