import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Wallet = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_655_1329)">
<path d="M20 10V15C20 18 18 20 15 20H5C2 20 0 18 0 15V10C0 7.28 1.64 5.38 4.19 5.06C4.45 5.02 4.72 5 5 5H15C15.26 5 15.51 5.01 15.75 5.05C18.33 5.35 20 7.26 20 10Z" fill="white"/>
<path d="M15.7509 5.04996C15.5109 5.00996 15.2609 4.99996 15.0009 4.99996H5.00092C4.72092 4.99996 4.45092 5.01996 4.19092 5.05996C4.33092 4.77996 4.53092 4.51996 4.77092 4.27996L8.02092 1.01996C8.68094 0.366539 9.57216 0 10.5009 0C11.4297 0 12.3209 0.366539 12.9809 1.01996L14.7309 2.78996C15.3709 3.41996 15.7109 4.21996 15.7509 5.04996ZM19.9999 10.5H16.9999C15.8999 10.5 14.9999 11.4 14.9999 12.5C14.9999 13.6 15.8999 14.5 16.9999 14.5H19.9999" fill="#8ACAFF"/>
</g>
<defs>
<clipPath id="clip0_655_1329">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
