import React from 'react';
import {SvgXml} from 'react-native-svg';

export const PlusCircle = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_655_6837)">
<path d="M10 18.3337C14.6024 18.3337 18.3334 14.6027 18.3334 10.0003C18.3334 5.39795 14.6024 1.66699 10 1.66699C5.39765 1.66699 1.66669 5.39795 1.66669 10.0003C1.66669 14.6027 5.39765 18.3337 10 18.3337Z" stroke="#8ACAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66699V13.3337" stroke="#8ACAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66669 10H13.3334" stroke="#8ACAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_655_6837">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
  `;

  return <SvgXml xml={icon} width={width} height={height} />;
};

export const PlusCircleFilled = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99984 18.3337C14.6022 18.3337 18.3332 14.6027 18.3332 10.0003C18.3332 5.39795 14.6022 1.66699 9.99984 1.66699C5.39746 1.66699 1.6665 5.39795 1.6665 10.0003C1.6665 14.6027 5.39746 18.3337 9.99984 18.3337Z" fill="white"/>
<path d="M10 6.66699V13.3337" stroke="#8ACAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.6665 10H13.3332" stroke="#8ACAFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> `;

  return <SvgXml xml={icon} width={width} height={height} />;
};

export const PlusCircleGreen = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const icon = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21.3581C16.7927 21.3581 21.0833 17.0675 21.0833 11.7747C21.0833 6.48201 16.7927 2.19141 11.5 2.19141C6.20726 2.19141 1.91666 6.48201 1.91666 11.7747C1.91666 17.0675 6.20726 21.3581 11.5 21.3581Z" fill="#01FD48"/>
<path d="M11.5 7.66602V15.3327" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.66666 11.5H15.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
