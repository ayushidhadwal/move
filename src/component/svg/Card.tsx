import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Card = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_655_2085)">
<path d="M12.4424 0H3.55765C3.29412 0 3.04941 0.00968856 2.82353 0.0193771C0.592941 0.155017 0 0.997923 0 3.61384V4.17578C0 4.70865 0.423529 5.14464 0.941177 5.14464H15.0588C15.5765 5.14464 16 4.70865 16 4.17578V3.61384C16 0.726643 15.2847 0 12.4424 0Z" fill="#8ACAFF"/>
<path d="M0.941177 6.59766C0.423529 6.59766 0 7.03364 0 7.56651V10.3859C0 13.2731 0.715295 13.9997 3.55765 13.9997H12.4424C15.2376 13.9997 15.9718 13.3022 16 10.5409V7.56651C16 7.03364 15.5765 6.59766 15.0588 6.59766H0.941177ZM4.66824 11.6357H3.05882C2.67294 11.6357 2.35294 11.3063 2.35294 10.9091C2.35294 10.5118 2.67294 10.1824 3.05882 10.1824H4.67765C5.06353 10.1824 5.38353 10.5118 5.38353 10.9091C5.38353 11.3063 5.06353 11.6357 4.66824 11.6357ZM9.92941 11.6357H6.69176C6.30588 11.6357 5.98588 11.3063 5.98588 10.9091C5.98588 10.5118 6.30588 10.1824 6.69176 10.1824H9.92941C10.1166 10.1824 10.2962 10.259 10.4285 10.3953C10.5609 10.5315 10.6353 10.7164 10.6353 10.9091C10.6353 11.1018 10.5609 11.2866 10.4285 11.4229C10.2962 11.5592 10.1166 11.6357 9.92941 11.6357Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_655_2085">
<rect width="16" height="14" fill="white"/>
</clipPath>
</defs>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};