import React, {FC, Key, useState} from 'react';
import {Image as RNImage} from 'native-base';
import {ImageSourcePropType} from 'react-native';
import {InterfaceImageProps} from 'native-base/lib/typescript/components/primitives/Image/types';
import {logout} from '../../store/auth/authSlice';

type Props = {
  source: ImageSourcePropType;
  fallbackImg: ImageSourcePropType;
} & InterfaceImageProps;

export const Image: FC<Props> = ({source, fallbackImg, ...restProps}) => {
  const [image, setImage] = useState<ImageSourcePropType>(source);
  return (
    <RNImage
      {...restProps}
      key={image as Key}
      source={image}
      onError={e => {
        console.log(e);
        setImage(fallbackImg);
      }}
    />
  );
};
