import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Filter = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.91269 16.1163H1.0368" stroke="#8ACAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.4256 4.00107H20.3015" stroke="#8ACAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.90785 3.93281C6.90785 2.31325 5.58515 1 3.95393 1C2.3227 1 1 2.31325 1 3.93281C1 5.55238 2.3227 6.86563 3.95393 6.86563C5.58515 6.86563 6.90785 5.55238 6.90785 3.93281Z" stroke="#8ACAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 16.0676C21 14.448 19.6783 13.1348 18.0471 13.1348C16.4149 13.1348 15.0922 14.448 15.0922 16.0676C15.0922 17.6871 16.4149 19.0004 18.0471 19.0004C19.6783 19.0004 21 17.6871 21 16.0676Z" stroke="#8ACAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

  return <SvgXml xml={icon} width={width} height={height} />;
};
