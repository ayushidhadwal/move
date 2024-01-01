import React from 'react';
import Svg, {Pattern, Image, Polygon} from 'react-native-svg';
import {View, ViewStyle} from 'react-native';

export const FrameSVG = ({
  userImg,
  style,
  width,
  height,
}: {
  userImg: string;
  style: ViewStyle;
  width: number;
  height: number;
}) => {
  return (
    <View style={[style]}>
      <Svg width={width} height={height}>
        <Pattern
          id="c"
          height="100%"
          width="100%"
          patternUnits="userSpaceOnUse"
          patternContentUnits="objectBoundingBox"
          preserveAspectRatio="none"
          x="0"
          y="0">
          <Image
            height="1"
            width="1"
            preserveAspectRatio="none"
            clipPath="url(#clip)"
            x="0"
            y="0"
            xlinkHref={userImg}
          />
        </Pattern>
        <Polygon
          points="51 1 100 14 100 75 49 99 0 75 0 14"
          stroke="#FFD53D"
          strokeWidth={2}
          fill="url(#c)"
        />
      </Svg>
    </View>
  );
};
