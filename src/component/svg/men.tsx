import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Men = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => {
  const icon = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_655_7440)">
<path d="M17.1977 19.5096C17.2057 17.2448 16.6298 15.8014 15.4914 15.226C14.9537 14.9562 13.9134 14.4551 12.9144 13.9814C12.9039 14.1085 12.8636 14.2312 12.7968 14.3393C12.3398 15.0546 11.7121 15.6429 10.9714 16.0504C10.2306 16.4578 9.40035 16.6715 8.55655 16.6717C7.71275 16.672 6.88236 16.4589 6.14133 16.0519C5.4003 15.645 4.77229 15.0571 4.31477 14.3421C4.24339 14.2347 4.20105 14.1104 4.19194 13.9814C3.19375 14.4568 2.15259 14.9562 1.61468 15.226C0.476198 15.8014 -0.0996963 17.244 -0.0916554 19.5096C-0.0916554 20.4953 -0.0969238 22.3782 -0.0969238 22.3782C-0.0965601 22.4511 -0.0677068 22.5209 -0.0166265 22.5724C0.0344538 22.624 0.103639 22.6532 0.175913 22.6536H16.9301C16.9664 22.6533 17.0022 22.6458 17.0356 22.6314C17.0689 22.617 17.099 22.596 17.1242 22.5697C17.1496 22.5446 17.1697 22.5145 17.1833 22.4814C17.197 22.4482 17.2038 22.4127 17.2035 22.3768C17.2035 22.3768 17.1977 20.4953 17.1977 19.5096Z" fill="${color}"/>
<path d="M8.56449 13.768C7.52694 13.768 6.93746 13.3385 6.18937 12.7935C6.1866 12.7907 6.18106 12.788 6.17828 12.7852V13.0441L4.89091 13.6514C4.85542 13.6679 4.82388 13.692 4.79843 13.7219C4.77297 13.7518 4.7542 13.7869 4.7434 13.8248C4.73237 13.8622 4.72961 13.9016 4.73531 13.9403C4.74101 13.9789 4.75503 14.0158 4.77639 14.0484C5.18447 14.6846 5.74402 15.2076 6.40398 15.5697C7.06395 15.9318 7.80332 16.1216 8.55465 16.1216C9.30598 16.1216 10.0454 15.9318 10.7053 15.5697C11.3653 15.2076 11.9248 14.6846 12.3329 14.0484C12.3534 14.0152 12.3666 13.978 12.3717 13.9392C12.3768 13.9005 12.3738 13.8611 12.3627 13.8236C12.3516 13.7861 12.3328 13.7515 12.3074 13.7219C12.2821 13.6923 12.2508 13.6685 12.2156 13.652L11.7052 13.4095C11.4157 13.2748 11.1506 13.1481 10.9271 13.0435V12.8039C10.1871 13.3469 9.59484 13.768 8.56449 13.768Z" fill="${color}"/>
<path d="M12.6057 5.69767C12.5508 5.71903 12.5046 5.75843 12.4745 5.80951C12.4465 5.41381 12.319 5.03181 12.1041 4.69951C11.8893 4.36721 11.594 4.09555 11.2462 3.91011C11.1973 3.88831 11.1431 3.8816 11.0904 3.89082C10.2006 4.04489 8.6199 4.13017 8.16406 3.71466C7.12374 2.76203 6.66236 3.02626 6.02906 3.57682C5.92259 3.66769 5.80724 3.76975 5.67693 3.86873C5.24826 4.19364 4.88781 5.01122 4.6585 5.80141C4.63341 5.7653 4.5983 5.73748 4.55758 5.72144C4.38109 5.63527 4.18402 5.60125 3.98917 5.62329C3.86089 5.64282 3.73892 5.69233 3.633 5.76788C3.52708 5.84342 3.44016 5.9429 3.37917 6.05837C3.26762 6.28006 3.20631 6.52398 3.1997 6.77249C3.19308 7.021 3.24131 7.26788 3.3409 7.49529C3.40357 7.65495 3.45541 7.8093 3.502 7.94966C3.67391 8.47002 3.85136 9.00687 4.47384 9.01778C4.57477 10.0308 4.86701 11.2175 5.64227 11.7322C5.93103 11.9262 6.21504 12.1272 6.49405 12.3351C7.22023 12.8638 7.69797 13.2161 8.56611 13.2161C9.43425 13.2161 9.91754 12.8638 10.6437 12.3326C10.9209 12.1256 11.2031 11.9254 11.49 11.7322C12.2708 11.2147 12.5602 10.0266 12.6612 9.01498C13.259 8.99038 13.4375 8.46443 13.6058 7.95525C13.6549 7.81209 13.704 7.65775 13.7694 7.49529C13.8679 7.26752 13.9154 7.02063 13.9083 6.77223C13.9013 6.52384 13.8399 6.28008 13.7287 6.05837C13.6684 5.94314 13.5821 5.84375 13.4769 5.7682C13.3716 5.69264 13.2503 5.64301 13.1225 5.62329C12.9468 5.60289 12.7688 5.62851 12.6057 5.69767Z" fill="${color}"/>
<path d="M6.15195 0.252098C3.94625 0.929317 3.90604 3.66336 3.94625 4.48346C3.95429 4.65682 3.97896 4.85506 4.00891 5.06701C4.03886 5.06701 4.07157 5.06421 4.10457 5.06421C4.17669 5.06428 4.24871 5.0698 4.32001 5.08071C4.5385 4.48877 4.87982 3.78695 5.34925 3.42904C5.44491 3.35467 5.53225 3.28029 5.61404 3.21151L5.67698 3.15558C6.03993 2.84186 6.44143 2.53065 6.9846 2.53065C7.46789 2.53065 7.94563 2.77028 8.52985 3.30685C8.5853 3.35103 8.88198 3.46679 9.60539 3.46679C10.0719 3.46472 10.5376 3.42508 10.9979 3.34824C11.0448 3.34098 11.0923 3.33733 11.1398 3.33733C11.2568 3.33637 11.3724 3.36178 11.4784 3.41171C11.8079 3.5816 12.1007 3.81585 12.3397 4.10083C12.5787 4.38581 12.7591 4.71585 12.8706 5.07176C12.9149 5.06619 12.9595 5.06339 13.0042 5.06337C13.0344 5.06337 13.0644 5.06337 13.0943 5.06617C13.1864 4.29531 13.1856 3.51605 13.0918 2.74539C12.9906 2.07433 12.5758 1.50112 11.8521 1.03837C10.2717 0.0289678 7.57991 -0.182978 6.15195 0.252098Z" fill="${color}"/>
</g>
<defs>
<clipPath id="clip0_655_7440">
<rect width="17.7692" height="21" fill="${color}"/>
</clipPath>
</defs>
</svg>
  `;

  return <SvgXml xml={icon} width={width} height={height} color={color} />;
};
