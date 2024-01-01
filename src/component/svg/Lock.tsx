import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Lock = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="9" fill="#8ACAFF"/>
<path d="M11.25 9.375H8.75C8.40482 9.375 8.125 9.65482 8.125 10V12.5C8.125 12.8452 8.40482 13.125 8.75 13.125H11.25C11.5952 13.125 11.875 12.8452 11.875 12.5V10C11.875 9.65482 11.5952 9.375 11.25 9.375Z" fill="white"/>
<path d="M10 0C8.02219 0 6.08879 0.586489 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433281 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9969 7.3488 18.9423 4.80709 17.0676 2.9324C15.1929 1.05772 12.6512 0.0031427 10 0ZM10 17.5C8.75083 17.5018 7.5211 17.1907 6.42296 16.5953C5.32482 15.9999 4.39322 15.1391 3.71313 14.0912C3.66831 14.0225 3.63749 13.9455 3.62241 13.8648C3.60732 13.7841 3.60828 13.7013 3.62523 13.621C3.64218 13.5406 3.67478 13.4644 3.72117 13.3967C3.76757 13.329 3.82685 13.2711 3.89563 13.2262C3.96441 13.1814 4.04134 13.1506 4.12203 13.1355C4.20273 13.1204 4.2856 13.1214 4.36592 13.1383C4.44625 13.1553 4.52245 13.1879 4.59017 13.2343C4.65789 13.2807 4.71582 13.34 4.76063 13.4087C5.55532 14.6365 6.75492 15.5472 8.15112 15.9826C9.54732 16.418 11.0519 16.3507 12.4036 15.7923C13.7554 15.2339 14.8688 14.2197 15.5507 12.9259C16.2325 11.632 16.4397 10.1402 16.1362 8.70956C15.8327 7.27888 15.0377 5.99969 13.8892 5.09411C12.7408 4.18854 11.3115 3.7138 9.84945 3.75232C8.38744 3.79084 6.98509 4.3402 5.88594 5.30499C4.78678 6.26979 4.06025 7.58907 3.8325 9.03375L3.93313 8.93312C4.051 8.81927 4.20888 8.75628 4.37276 8.7577C4.53663 8.75913 4.69339 8.82486 4.80927 8.94074C4.92515 9.05662 4.99088 9.21337 4.9923 9.37725C4.99372 9.54112 4.93073 9.699 4.81688 9.81687L3.56688 11.0669C3.44967 11.184 3.29073 11.2499 3.125 11.2499C2.95928 11.2499 2.80033 11.184 2.68313 11.0669L1.43313 9.81687C1.31928 9.699 1.25628 9.54112 1.25771 9.37725C1.25913 9.21337 1.32486 9.05662 1.44074 8.94074C1.55662 8.82486 1.71338 8.75913 1.87725 8.7577C2.04113 8.75628 2.199 8.81927 2.31688 8.93312L2.54938 9.16562C2.71046 7.72672 3.28459 6.3652 4.20247 5.24542C5.12036 4.12565 6.34274 3.29551 7.72206 2.8552C9.10138 2.4149 10.5787 2.38326 11.9756 2.7641C13.3725 3.14495 14.6293 3.922 15.5943 5.00144C16.5593 6.08089 17.1912 7.41658 17.4137 8.84727C17.6362 10.278 17.4399 11.7425 16.8484 13.064C16.2569 14.3856 15.2955 15.5077 14.0802 16.2948C12.865 17.082 11.4479 17.5005 10 17.5ZM13.125 10V12.5C13.125 12.9973 12.9275 13.4742 12.5758 13.8258C12.2242 14.1775 11.7473 14.375 11.25 14.375H8.75C8.25272 14.375 7.77581 14.1775 7.42418 13.8258C7.07255 13.4742 6.875 12.9973 6.875 12.5V10C6.8766 9.61359 6.99756 9.2371 7.22131 8.92206C7.44506 8.60702 7.76068 8.3688 8.125 8.24V7.5C8.125 7.00272 8.32255 6.52581 8.67418 6.17417C9.02581 5.82254 9.50272 5.625 10 5.625C10.4973 5.625 10.9742 5.82254 11.3258 6.17417C11.6775 6.52581 11.875 7.00272 11.875 7.5V8.24C12.2393 8.3688 12.5549 8.60702 12.7787 8.92206C13.0024 9.2371 13.1234 9.61359 13.125 10Z" fill="white"/>
<path d="M10.625 7.5C10.625 7.33424 10.5592 7.17527 10.4419 7.05806C10.3247 6.94085 10.1658 6.875 10 6.875C9.83424 6.875 9.67527 6.94085 9.55806 7.05806C9.44085 7.17527 9.375 7.33424 9.375 7.5V8.125H10.625V7.5Z" fill="white"/>
</svg>`;

  return <SvgXml xml={icon} width={width} height={height} />;
};