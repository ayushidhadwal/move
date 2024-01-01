import React from 'react';
import {SvgXml} from 'react-native-svg';

export const PlayerInfo = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const icon = `<svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.869 11.667H4.13077C3.03563 11.6683 1.98572 12.1039 1.21133 12.8783C0.436952 13.6527 0.00132317 14.7026 0 15.7978V20.0002H14.9998V15.7978C14.9984 14.7026 14.5628 13.6527 13.7884 12.8783C13.014 12.1039 11.9641 11.6683 10.869 11.667V11.667Z" fill="white"/>
<path d="M7.49992 9.99984C10.2613 9.99984 12.4998 7.7613 12.4998 4.99992C12.4998 2.23854 10.2613 0 7.49992 0C4.73854 0 2.5 2.23854 2.5 4.99992C2.5 7.7613 4.73854 9.99984 7.49992 9.99984Z" fill="#8ACAFF"/>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
