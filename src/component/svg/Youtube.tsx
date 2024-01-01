import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Youtube = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.25 5H8.75C5 5 2.5 7.5 2.5 11.25V18.75C2.5 22.5 5 25 8.75 25H21.25C25 25 27.5 22.5 27.5 18.75V11.25C27.5 7.5 25 5 21.25 5ZM17.3625 16.2875L14.275 18.1375C13.025 18.8875 12 18.3125 12 16.85V13.1375C12 11.675 13.025 11.1 14.275 11.85L17.3625 13.7C18.55 14.425 18.55 15.575 17.3625 16.2875Z" fill="#8ACAFF"/>
</svg>

`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
