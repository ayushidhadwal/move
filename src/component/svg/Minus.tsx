import {SvgXml} from 'react-native-svg';
import React from 'react';

export const Minus = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21.3581C16.7927 21.3581 21.0833 17.0675 21.0833 11.7747C21.0833 6.48201 16.7927 2.19141 11.5 2.19141C6.20726 2.19141 1.91666 6.48201 1.91666 11.7747C1.91666 17.0675 6.20726 21.3581 11.5 21.3581Z" fill="#FD0101"/>
<path d="M7.66666 11.5H15.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
