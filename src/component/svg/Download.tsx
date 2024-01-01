import React from 'react';
import {SvgXml} from 'react-native-svg';

export const Download = ({width, height}: {width: number; height: number}) => {
  const icon = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 7.49199H12.5917C10.6167 7.49199 9.00833 5.88366 9.00833 3.90866V1.50033C9.00833 1.04199 8.63333 0.666992 8.175 0.666992H4.64167C2.075 0.666992 0 2.33366 0 5.30866V12.692C0 15.667 2.075 17.3337 4.64167 17.3337H11.1917C13.7583 17.3337 15.8333 15.667 15.8333 12.692V8.32533C15.8333 7.86699 15.4583 7.49199 15 7.49199Z" fill="white"/>
<path d="M11.0833 0.842068C10.7417 0.500401 10.15 0.733735 10.15 1.20873V4.11707C10.15 5.33373 11.1833 6.34207 12.4417 6.34207C13.2333 6.3504 14.3333 6.3504 15.275 6.3504C15.75 6.3504 16 5.79207 15.6667 5.45873C14.4667 4.2504 12.3167 2.0754 11.0833 0.842068ZM8.14999 11.2671C8.03238 11.1508 7.87368 11.0857 7.70833 11.0857C7.54297 11.0857 7.38427 11.1508 7.26666 11.2671L6.66666 11.8671V8.3754C6.66666 8.03373 6.38333 7.7504 6.04166 7.7504C5.69999 7.7504 5.41666 8.03373 5.41666 8.3754V11.8671L4.81666 11.2671C4.69904 11.1508 4.54035 11.0857 4.37499 11.0857C4.20963 11.0857 4.05094 11.1508 3.93333 11.2671C3.69166 11.5087 3.69166 11.9087 3.93333 12.1504L5.59999 13.8171C5.60833 13.8254 5.61666 13.8254 5.61666 13.8337C5.66666 13.8837 5.73333 13.9254 5.79999 13.9587C5.88333 13.9837 5.95833 14.0004 6.04166 14.0004C6.12499 14.0004 6.19999 13.9837 6.27499 13.9504C6.34999 13.9171 6.41666 13.8754 6.48333 13.8171L8.14999 12.1504C8.39166 11.9087 8.39166 11.5087 8.14999 11.2671Z" fill="#8ACAFF"/>
</svg>
`;

  return <SvgXml xml={icon} width={width} height={height} />;
};
