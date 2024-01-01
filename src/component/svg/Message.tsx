import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Message = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="white"/>
<line x1="7.80029" y1="6.40039" x2="17.8003" y2="6.40039" stroke="#8ACAFF"/>
<line x1="7.80029" y1="9.40039" x2="17.8003" y2="9.40039" stroke="#8ACAFF"/>
<line x1="7.80029" y1="12.4004" x2="15.8003" y2="12.4004" stroke="#8ACAFF"/>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
