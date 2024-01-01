import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Player = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4445 4.4995C12.3887 4.49171 12.332 4.49171 12.2762 4.4995C11.6779 4.48044 11.1107 4.23529 10.695 3.81603C10.2792 3.39677 10.0476 2.83637 10.0491 2.25365C10.0491 1.01375 11.0826 0 12.3644 0C13.6381 0 14.6796 1.00595 14.6796 2.25365C14.6779 2.83674 14.444 3.39648 14.0272 3.81528C13.6104 4.23408 13.0431 4.47933 12.4445 4.4995ZM15.0577 9.90358C14.1604 10.4884 12.9027 10.7068 11.7411 10.5586C12.0455 9.91918 12.2057 9.20955 12.2137 8.46093C12.2137 7.68112 12.0375 6.9403 11.701 6.29306C12.8867 6.1371 14.1444 6.35545 15.0497 6.9403C16.3154 7.75131 16.3154 9.08478 15.0577 9.90358ZM3.55854 4.4995C3.61462 4.4917 3.67069 4.4917 3.72677 4.4995C4.32509 4.48044 4.89226 4.23529 5.30802 3.81603C5.72378 3.39677 5.95543 2.83637 5.95386 2.25365C5.95386 1.01375 4.92043 0 3.63865 0C2.36488 0 1.32344 1.00595 1.32344 2.25365C1.32515 2.83674 1.55897 3.39648 1.97576 3.81528C2.39255 4.23408 2.95988 4.47933 3.55854 4.4995ZM3.64906 8.46093C3.64906 9.21735 3.8173 9.93477 4.12172 10.582C2.99215 10.699 1.81452 10.465 0.949317 9.91138C-0.316439 9.09258 -0.316439 7.7591 0.949317 6.9403C1.80651 6.37884 3.01619 6.1527 4.15376 6.27747C3.82531 6.93251 3.64906 7.67333 3.64906 8.46093Z" fill="#8ACAFF"/>
<path d="M8.11022 10.8163C8.04102 10.8085 7.97113 10.8085 7.90193 10.8163C7.18962 10.793 6.51457 10.5008 6.01966 10.0016C5.52475 9.50237 5.24881 8.83529 5.25025 8.14153C5.25025 6.65989 6.47595 5.45898 8.00608 5.45898C9.52819 5.45898 10.7619 6.65989 10.7619 8.14153C10.7619 9.59197 9.59228 10.7695 8.11022 10.8163ZM5.50661 12.4305C4.29693 13.2181 4.29693 14.5126 5.50661 15.2924C6.88452 16.1892 9.14366 16.1892 10.5216 15.2924C11.7312 14.5048 11.7312 13.2103 10.5216 12.4305C9.15167 11.5337 6.89253 11.5337 5.50661 12.4305Z" fill="white"/>
</svg>
  `;

  return <SvgXml xml={icon} width={width} height={height} />;
};