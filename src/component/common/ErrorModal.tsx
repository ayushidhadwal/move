import React, {FC} from 'react';
import {Button, Modal, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type Props = {
  error: string;
  visible: boolean;
  onClose: () => void;
};

export const ErrorModal: FC<Props> = ({error, visible, onClose}) => {
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
          {String(error)}
        </Text>
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
          {t('OK')}
        </Button>
      </Modal.Content>
    </Modal>
  );
};
