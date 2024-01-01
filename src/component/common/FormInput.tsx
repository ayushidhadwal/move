import {FormControl, Icon, Input, Pressable} from 'native-base';
import React, {FC} from 'react';
import {Platform, TextInputProps} from 'react-native';

type Props = TextInputProps & {
  error?: string;
  isInvalid?: boolean;
  isRequired: boolean;
  show?: boolean;
  helperText?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: any;
  iconName1?: string;
  iconName2?: string;
  label?: string;
  onPressHandler?: () => void;
  fontStyle?: string;
};

export const FormInput: FC<Props> = ({
  error,
  isInvalid = false,
  isRequired = false,
  helperText,
  onChangeText,
  placeholder,
  icon,
  iconName1,
  iconName2,
  label,
  onPressHandler,
  show,
  fontStyle,
  ...restProps
}) => {
  return (
    <FormControl isInvalid={isInvalid} mb={5}>
      <FormControl.Label
        _text={{
          fontFamily: 'heading',
          fontWeight: '100',
          fontStyle: fontStyle ? fontStyle : 'normal',
          fontSize: 'sm',
          color: 'secondary.400',
        }}>
        {label}
      </FormControl.Label>
      <Input
        {...restProps}
        autoComplete={'off'}
        _input={{
          selectionColor: '#ffffff',
          cursorColor: '#ffffff',
        }}
        placeholder={placeholder}
        variant="underlined"
        focusOutlineColor={'secondary.400'}
        colorScheme={'secondary'}
        py={Platform.OS === 'ios' ? 4 : 2}
        color={'white'}
        fontFamily="body"
        fontStyle={'italic'}
        fontSize={'md'}
        cursorColor={'#ffffff'}
        selectionColor={'#ffffff'}
        onChangeText={onChangeText}
        InputRightElement={
          <Pressable onPress={onPressHandler}>
            <Icon
              as={icon}
              name={show ? iconName1 : iconName2}
              size={5}
              mr="2"
              color="secondary.400"
            />
          </Pressable>
        }
      />
      {helperText ? (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      ) : null}
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
