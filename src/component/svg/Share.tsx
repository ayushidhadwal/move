import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Share = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6.66699C16.3807 6.66699 17.5 5.5477 17.5 4.16699C17.5 2.78628 16.3807 1.66699 15 1.66699C13.6193 1.66699 12.5 2.78628 12.5 4.16699C12.5 5.5477 13.6193 6.66699 15 6.66699Z" fill="#8ACAFF" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z" fill="#8ACAFF" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 18.333C16.3807 18.333 17.5 17.2137 17.5 15.833C17.5 14.4523 16.3807 13.333 15 13.333C13.6193 13.333 12.5 14.4523 12.5 15.833C12.5 17.2137 13.6193 18.333 15 18.333Z" fill="#8ACAFF" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.1582 11.2588L12.8499 14.5755" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.8415 5.4248L7.1582 8.74147" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
