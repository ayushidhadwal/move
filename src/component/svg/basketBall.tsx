import React from 'react';
import {SvgXml} from 'react-native-svg';

export const BasketBall = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => {
  const icon = `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_655_7406)">
<path d="M7.58341 19.8333C7.58341 19.6786 7.64487 19.5303 7.75426 19.4209C7.86366 19.3115 8.01204 19.25 8.16674 19.25H26.8334C26.9881 19.25 27.1365 19.3115 27.2459 19.4209C27.3553 19.5303 27.4167 19.6786 27.4167 19.8333C27.4167 19.988 27.3553 20.1364 27.2459 20.2458C27.1365 20.3552 26.9881 20.4167 26.8334 20.4167H8.16674C8.01204 20.4167 7.86366 20.3552 7.75426 20.2458C7.64487 20.1364 7.58341 19.988 7.58341 19.8333Z" fill="${color}"/>
<path d="M12.8333 8.16602H22.1667C22.4888 8.16602 22.75 8.42718 22.75 8.74935V13.416C22.75 13.7382 22.4888 13.9993 22.1667 13.9993H12.8333C12.5112 13.9993 12.25 13.7382 12.25 13.416V8.74935C12.25 8.42718 12.5112 8.16602 12.8333 8.16602Z" fill="${color}"/>
<path d="M1.33315 7.56518C1.32754 6.97985 1.4506 6.40042 1.69363 5.8679C1.93666 5.33537 2.29372 4.86274 2.73956 4.48343C4.54148 2.96968 8.59682 1.16602 17.6665 1.16602C26.7362 1.16602 30.7915 2.96968 32.5928 4.48285C33.0388 4.86219 33.396 5.33489 33.6391 5.86753C33.8823 6.40016 34.0054 6.97971 33.9998 7.56518V23.3327C33.9989 24.1059 33.6913 24.8473 33.1445 25.3941C32.5977 25.9408 31.8564 26.2484 31.0832 26.2494H23.571C23.524 26.6365 23.5002 27.0261 23.4998 27.416V34.416C23.5003 34.5314 23.466 34.6443 23.4015 34.74C23.337 34.8357 23.2453 34.9098 23.1382 34.9527C23.0319 34.9974 22.9148 35.0096 22.8017 34.9878C22.6885 34.966 22.5843 34.9111 22.5023 34.8302L21.1665 33.4885L19.8307 34.8302C19.7205 34.9395 19.5716 35.0008 19.4165 35.0008C19.2613 35.0008 19.1125 34.9395 19.0023 34.8302L17.6665 33.4885L16.3307 34.8302C16.2205 34.9395 16.0716 35.0008 15.9165 35.0008C15.7613 35.0008 15.6125 34.9395 15.5023 34.8302L14.1665 33.4885L12.8306 34.8302C12.7203 34.939 12.5714 34.9998 12.4165 34.9994C12.34 35.0014 12.264 34.9854 12.1948 34.9527C12.0877 34.9098 11.9959 34.8357 11.9314 34.74C11.867 34.6443 11.8327 34.5314 11.8331 34.416V27.416C11.8328 27.0261 11.809 26.6365 11.762 26.2494H4.24981C3.47655 26.2484 2.73522 25.9408 2.18844 25.3941C1.64166 24.8473 1.33408 24.1059 1.33315 23.3327V7.56518ZM17.6665 28.3412L18.8833 27.1244L17.6665 25.9075L16.4497 27.1244L17.6665 28.3412ZM15.6248 27.9492L14.6996 28.8744L15.9165 30.0912L16.8417 29.166L15.6248 27.9492ZM18.4913 29.166L19.4165 30.0912L20.6333 28.8744L19.7082 27.9492L18.4913 29.166ZM22.3332 28.9245V27.416C22.3332 27.1074 22.3512 26.8169 22.374 26.5317L21.7498 25.9075L20.533 27.1244L22.3332 28.9245ZM21.5702 32.2449C21.5737 32.2478 21.5777 32.2489 21.5807 32.2519L22.3332 33.0102V30.5742L21.4582 29.6992L20.2413 30.916L21.5702 32.2449ZM19.4165 33.5935L20.3405 32.666L19.4165 31.7409L18.4925 32.666L19.4165 33.5935ZM18.5917 30.916L17.6665 29.9909L16.7413 30.916L17.6665 31.8412L18.5917 30.916ZM15.9165 33.5935L16.8405 32.666L15.9165 31.7409L14.9925 32.666L15.9165 33.5935ZM12.9998 33.0102L13.7523 32.2519C13.7552 32.2489 13.7593 32.2478 13.7628 32.2449L15.0916 30.916L13.8748 29.6992L12.9998 30.5742V33.0102ZM12.9998 27.416V28.9245L14.8 27.1244L13.5831 25.9075L12.959 26.5317C12.9817 26.8169 12.9998 27.1074 12.9998 27.416ZM12.7408 25.1002L13.1649 24.6761C13.4625 24.2938 13.6111 23.8164 13.5831 23.3327C13.6102 22.7337 13.5046 22.1361 13.274 21.5827H14.5165C14.6835 22.1506 14.7622 22.7408 14.7498 23.3327C14.7601 23.9188 14.6195 24.4978 14.3415 25.0139L15.6248 26.2972L17.0832 24.8389V21.5827H18.2498V24.8412L19.7082 26.2995L20.9915 25.0162C20.7131 24.4994 20.5724 23.9196 20.5832 23.3327C20.5708 22.7408 20.6495 22.1506 20.8165 21.5827H22.059C21.8284 22.1361 21.7228 22.7337 21.7498 23.3327C21.7232 23.8132 21.8702 24.2873 22.164 24.6685L22.5939 25.0984C22.8709 23.8029 23.4625 22.5955 24.3165 21.5827H26.9998C27.4639 21.5827 27.9091 21.3983 28.2373 21.0701C28.5654 20.7419 28.7498 20.2968 28.7498 19.8327C28.7498 19.3686 28.5654 18.9234 28.2373 18.5952C27.9091 18.2671 27.4639 18.0827 26.9998 18.0827H8.33315C7.86902 18.0827 7.4239 18.2671 7.09571 18.5952C6.76752 18.9234 6.58315 19.3686 6.58315 19.8327C6.58315 20.2968 6.76752 20.7419 7.09571 21.0701C7.4239 21.3983 7.86902 21.5827 8.33315 21.5827H11.0165C11.8713 22.5958 12.4635 23.8039 12.7408 25.1002ZM24.0832 13.416V8.74935C24.0832 8.28522 23.8988 7.8401 23.5706 7.51191C23.2424 7.18372 22.7973 6.99935 22.3332 6.99935H12.9998C12.5357 6.99935 12.0906 7.18372 11.7624 7.51191C11.4342 7.8401 11.2498 8.28522 11.2498 8.74935V13.416C11.2498 13.8801 11.4342 14.3253 11.7624 14.6535C12.0906 14.9816 12.5357 15.166 12.9998 15.166H22.3332C22.7973 15.166 23.2424 14.9816 23.5706 14.6535C23.8988 14.3253 24.0832 13.8801 24.0832 13.416ZM2.49981 23.3327C2.49981 23.7968 2.68419 24.2419 3.01238 24.5701C3.34057 24.8983 3.78569 25.0827 4.24981 25.0827H11.5415C11.438 24.6831 11.3014 24.2929 11.1331 23.916H4.24981C4.09511 23.916 3.94673 23.8546 3.83734 23.7452C3.72794 23.6358 3.66648 23.4874 3.66648 23.3327V7.56518C3.6628 7.32165 3.712 7.08021 3.8107 6.85754C3.9094 6.63487 4.05523 6.43626 4.23815 6.27543C5.47015 5.2371 8.8494 3.49935 17.6665 3.49935C26.4748 3.49935 29.8582 5.23418 31.0937 6.26843C31.2765 6.43092 31.4222 6.63079 31.5211 6.85452C31.6199 7.07825 31.6695 7.32061 31.6665 7.56518V23.3327C31.6665 23.4874 31.605 23.6358 31.4956 23.7452C31.3862 23.8546 31.2379 23.916 31.0832 23.916H24.1998C24.0318 24.293 23.8952 24.6832 23.7915 25.0827H31.0832C31.5473 25.0827 31.9924 24.8983 32.3206 24.5701C32.6488 24.2419 32.8332 23.7968 32.8332 23.3327V7.56518C32.8351 7.15074 32.7479 6.74073 32.5774 6.36298C32.4069 5.98523 32.1571 5.6486 31.845 5.37593C30.4876 4.23843 26.8435 2.33268 17.6665 2.33268C8.47898 2.33268 4.84015 4.24193 3.48857 5.38118C3.17566 5.65209 2.92523 5.98764 2.75453 6.36468C2.58383 6.74173 2.49693 7.15131 2.49981 7.56518V23.3327Z" fill="${color}"/>
</g>
<defs>
<clipPath id="clip0_655_7406">
<rect width="35" height="35" fill="${color}" transform="matrix(-1 0 0 1 35 0)"/>
</clipPath>
</defs>
</svg> `;

  return <SvgXml xml={icon} width={width} height={height} />;
};