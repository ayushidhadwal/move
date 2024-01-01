import React from 'react';
import {SvgXml} from 'react-native-svg';

export const MapPin = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 5.5C10.5 9 6 12 6 12C6 12 1.5 9 1.5 5.5C1.5 4.30653 1.97411 3.16193 2.81802 2.31802C3.66193 1.47411 4.80653 1 6 1C7.19347 1 8.33807 1.47411 9.18198 2.31802C10.0259 3.16193 10.5 4.30653 10.5 5.5Z" fill="#8ACAFF"/>
<path d="M6 7C6.82843 7 7.5 6.32843 7.5 5.5C7.5 4.67157 6.82843 4 6 4C5.17157 4 4.5 4.67157 4.5 5.5C4.5 6.32843 5.17157 7 6 7Z" fill="white"/>
</svg>
  `;

  return <SvgXml xml={icon} width={width} height={height} />;
};

export const WhiteMapPin = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_655_2403)">
<path d="M17.5 9.16699C17.5 15.0003 10 20.0003 10 20.0003C10 20.0003 2.5 15.0003 2.5 9.16699C2.5 7.17787 3.29018 5.27021 4.6967 3.86369C6.10322 2.45717 8.01088 1.66699 10 1.66699C11.9891 1.66699 13.8968 2.45717 15.3033 3.86369C16.7098 5.27021 17.5 7.17787 17.5 9.16699Z" fill="white"/>
<path d="M10 11.667C11.3807 11.667 12.5 10.5477 12.5 9.16699C12.5 7.78628 11.3807 6.66699 10 6.66699C8.61929 6.66699 7.5 7.78628 7.5 9.16699C7.5 10.5477 8.61929 11.667 10 11.667Z" fill="#8ACAFF"/>
</g>
<defs>
<clipPath id="clip0_655_2403">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
  `;

  return <SvgXml xml={icon} width={width} height={height} />;
};
