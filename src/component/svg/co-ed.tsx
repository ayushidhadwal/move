import React from 'react';
import {SvgXml} from 'react-native-svg';

export const CoEd = ({
  width,
  height,
  color,
  subColor,
}: {
  width: number;
  height: number;
  color: string;
  subColor: string;
}) => {
  const icon = `<svg width="18" height="21" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_730_6254)">
<path d="M18.9409 8.99141C18.9349 9.08156 18.9031 9.16811 18.8492 9.24081C18.5612 9.63013 18.1854 9.94652 17.7522 10.1644C17.319 10.3824 16.8405 10.4958 16.3553 10.4954C15.8701 10.4951 15.3917 10.3811 14.9588 10.1626C14.5259 9.94409 14.1506 9.6272 13.863 9.2375C13.8108 9.16468 13.7802 9.07864 13.7747 8.98926C13.2669 9.20543 12.7944 9.49599 12.3727 9.85131C11.366 10.8143 11.4705 13.9787 11.4753 14.1139C11.4771 14.156 11.4951 14.1957 11.5256 14.2248C11.5561 14.254 11.5966 14.2702 11.6388 14.2703H21.0719C21.1141 14.2702 21.1547 14.254 21.1851 14.2248C21.2155 14.1957 21.2335 14.1559 21.2353 14.1139C21.2402 13.9787 21.3465 10.8143 20.339 9.85131C19.9186 9.49667 19.4473 9.20682 18.9409 8.99141Z" fill="${color}"/>
<path d="M14.1048 8.90967C14.0983 8.93312 14.0971 8.95774 14.1013 8.98172C14.1056 9.00569 14.1152 9.02841 14.1294 9.04819C14.3868 9.39569 14.7224 9.67814 15.1092 9.87283C15.496 10.0675 15.9232 10.169 16.3565 10.1692C16.7898 10.1693 17.2171 10.0682 17.604 9.87376C17.991 9.67935 18.3268 9.39716 18.5844 9.04985C18.5991 9.03026 18.6089 9.00754 18.6132 8.98349C18.6175 8.95944 18.616 8.93473 18.609 8.91133C18.6024 8.88785 18.5906 8.86614 18.5745 8.84781C18.5584 8.82948 18.5384 8.81499 18.5159 8.80541C18.2301 8.68452 17.9412 8.57095 17.6496 8.46483V8.16016C17.228 8.54311 16.8529 8.54476 16.3913 8.54956H16.1526C15.6837 8.54956 15.3911 8.49247 15.0609 8.17157V8.46483C14.7621 8.57405 14.471 8.68808 14.1978 8.80376C14.1753 8.81335 14.1553 8.82784 14.1392 8.84617C14.1231 8.86451 14.1114 8.88621 14.1048 8.90967Z" fill="${color}"/>
<path d="M12.938 6.86963C13.0476 7.21511 13.2362 7.53048 13.4889 7.79091C13.7416 8.05133 14.0515 8.24967 14.3942 8.37032H14.3958C14.507 8.32619 14.6198 8.28206 14.7341 8.23793V7.80169C14.0681 6.90184 13.6867 5.82427 13.6386 4.70697C13.6376 4.59686 13.6738 4.48961 13.7414 4.40254C13.809 4.31546 13.9041 4.25364 14.0112 4.22704C14.7411 4.06436 15.4211 3.72952 15.9943 3.25064C16.1888 3.08873 16.358 2.89868 16.496 2.6868C16.5416 2.60971 16.6072 2.54635 16.6859 2.50343C16.7646 2.46051 16.8535 2.43964 16.9432 2.44304C17.0328 2.44643 17.1199 2.47396 17.1951 2.52271C17.2703 2.57145 17.3309 2.63959 17.3705 2.7199C17.3769 2.73132 17.8804 3.79378 18.7742 4.27123C18.8486 4.30997 18.9116 4.36725 18.9571 4.43749C19.0027 4.50774 19.0292 4.58855 19.0341 4.67205C19.0341 4.67685 19.0814 6.44812 17.9768 7.80384V8.23875C18.0266 8.25679 18.0747 8.27632 18.1222 8.29419C18.6975 8.14277 19.4949 7.77124 19.7499 6.87344C19.9008 6.31271 19.9761 5.73439 19.9736 5.1538C19.9736 4.00992 19.6828 2.68796 18.6988 1.80042C18.0632 1.22843 17.2379 0.91099 16.3817 0.909187C15.5255 0.907385 14.6989 1.22134 14.0609 1.79066C12.4266 3.24087 12.7109 5.74858 12.9086 6.76041C12.9151 6.7897 12.925 6.82727 12.938 6.86963Z" fill="${color}"/>
<path d="M16.1527 8.22347H16.3651C16.8882 8.2185 17.1873 8.22347 17.6089 7.73295C18.7299 6.48315 18.7087 4.70873 18.7072 4.69086C18.7055 4.66303 18.6966 4.63612 18.6814 4.6127C18.6662 4.58928 18.6453 4.57015 18.6206 4.55714C17.6268 4.02756 17.0794 2.86746 17.0746 2.85604C17.06 2.83034 17.0391 2.8088 17.0138 2.79349C16.9886 2.77819 16.9597 2.76963 16.9302 2.76865C16.9006 2.76767 16.8713 2.7743 16.845 2.78789C16.8188 2.80149 16.7965 2.82159 16.7803 2.84628C16.6255 3.0909 16.4331 3.30976 16.2101 3.49484C15.598 4.00837 14.871 4.3677 14.0905 4.54258C14.0547 4.55124 14.0229 4.57175 14.0004 4.60077C13.9778 4.62978 13.9658 4.66557 13.9663 4.70228C14.0107 5.8052 14.4068 6.86524 15.0972 7.72815C15.4713 8.1859 15.6902 8.22347 16.1527 8.22347Z" fill="${subColor}"/>
</g>
<g clip-path="url(#clip1_730_6254)">
<path d="M10.1623 12.4375C10.167 11.0992 9.82671 10.2463 9.15397 9.90631C8.83628 9.74687 8.22155 9.45079 7.63123 9.1709C7.62505 9.24596 7.60123 9.31845 7.56176 9.38238C7.29168 9.80504 6.92081 10.1527 6.48309 10.3934C6.04537 10.6342 5.55476 10.7604 5.05616 10.7606C4.55755 10.7608 4.06687 10.6349 3.62899 10.3944C3.19111 10.1539 2.82002 9.80652 2.54967 9.38404C2.50749 9.32057 2.48247 9.2471 2.47709 9.1709C1.88726 9.45178 1.27203 9.74687 0.954175 9.90631C0.28144 10.2463 -0.0588587 11.0987 -0.0541073 12.4375C-0.0541073 13.02 -0.0572205 14.1326 -0.0572205 14.1326C-0.0570055 14.1756 -0.039956 14.2169 -0.0097724 14.2474C0.0204112 14.2778 0.0612932 14.2951 0.104 14.2953H10.0041C10.0256 14.2952 10.0468 14.2907 10.0664 14.2822C10.0861 14.2737 10.104 14.2613 10.1188 14.2457C10.1338 14.2309 10.1457 14.2131 10.1538 14.1936C10.1618 14.174 10.1659 14.1529 10.1657 14.1317C10.1657 14.1317 10.1623 13.02 10.1623 12.4375Z" fill="${color}"/>
<path d="M5.06078 9.04463C4.44768 9.04463 4.09935 8.79084 3.65731 8.46882C3.65567 8.46717 3.65239 8.46552 3.65075 8.46387V8.61686L2.89004 8.97573C2.86907 8.9855 2.85043 8.9997 2.83539 9.01737C2.82035 9.03505 2.80926 9.05579 2.80287 9.07817C2.79636 9.1003 2.79472 9.1236 2.79809 9.14644C2.80146 9.16927 2.80975 9.19109 2.82237 9.21035C3.06351 9.58626 3.39415 9.89531 3.78412 10.1093C4.1741 10.3233 4.611 10.4354 5.05496 10.4354C5.49893 10.4354 5.93583 10.3233 6.3258 10.1093C6.71578 9.89531 7.04642 9.58626 7.28755 9.21035C7.29963 9.19071 7.30744 9.16872 7.31048 9.14582C7.31351 9.12292 7.31169 9.09963 7.30514 9.07749C7.29859 9.05535 7.28746 9.03486 7.27248 9.01738C7.2575 8.99989 7.23902 8.98581 7.21825 8.97606L6.91662 8.83281C6.74556 8.75317 6.58893 8.67833 6.45687 8.61653V8.47494C6.01958 8.7958 5.66961 9.04463 5.06078 9.04463Z" fill="${color}"/>
<path d="M7.44885 4.27566C7.41639 4.28829 7.38909 4.31157 7.37135 4.34175C7.35478 4.10793 7.27946 3.8822 7.15248 3.68585C7.0255 3.48949 6.85104 3.32896 6.64553 3.21939C6.61663 3.2065 6.58459 3.20254 6.55345 3.20799C6.02768 3.29902 5.09362 3.34942 4.82427 3.10389C4.20953 2.54098 3.9369 2.69711 3.56268 3.02244C3.49977 3.07614 3.43161 3.13644 3.3546 3.19493C3.1013 3.38692 2.88831 3.87004 2.75281 4.33696C2.73799 4.31563 2.71724 4.29919 2.69317 4.28971C2.58889 4.23879 2.47244 4.21869 2.3573 4.23171C2.2815 4.24325 2.20942 4.27251 2.14684 4.31715C2.08425 4.36179 2.03289 4.42057 1.99685 4.4888C1.93093 4.6198 1.89471 4.76393 1.8908 4.91078C1.88689 5.05762 1.91539 5.20351 1.97424 5.33789C2.01126 5.43223 2.0419 5.52343 2.06943 5.60638C2.17101 5.91386 2.27587 6.23109 2.64369 6.23753C2.70333 6.83614 2.87602 7.53735 3.33412 7.84152C3.50475 7.95611 3.67258 8.07488 3.83745 8.19775C4.26655 8.51018 4.54885 8.71837 5.06184 8.71837C5.57483 8.71837 5.8604 8.51018 6.2895 8.19626C6.45331 8.07394 6.62004 7.95566 6.78955 7.84152C7.25093 7.53569 7.42198 6.83366 7.48162 6.23588C7.83486 6.22134 7.94037 5.91055 8.03983 5.60968C8.06883 5.52508 8.09783 5.43388 8.13649 5.33789C8.19471 5.2033 8.22274 5.0574 8.21858 4.91063C8.21441 4.76385 8.17816 4.61981 8.11241 4.4888C8.07678 4.42071 8.02582 4.36198 7.96362 4.31734C7.90143 4.27269 7.82972 4.24337 7.75425 4.23171C7.6504 4.21966 7.54521 4.23479 7.44885 4.27566Z" fill="${subColor}"/>
<path d="M3.63525 1.0581C2.33189 1.45827 2.30813 3.07383 2.33189 3.55843C2.33664 3.66087 2.35122 3.77802 2.36892 3.90325C2.38661 3.90325 2.40594 3.9016 2.42544 3.9016C2.46806 3.90164 2.51061 3.9049 2.55275 3.91135C2.68185 3.56157 2.88354 3.14686 3.16093 2.93537C3.21745 2.89142 3.26906 2.84748 3.3174 2.80683L3.35459 2.77379C3.56906 2.5884 3.8063 2.40451 4.12727 2.40451C4.41284 2.40451 4.69514 2.54611 5.04036 2.86317C5.07313 2.88928 5.24844 2.95768 5.6759 2.95768C5.95158 2.95646 6.22673 2.93303 6.49872 2.88762C6.52648 2.88333 6.55452 2.88118 6.5826 2.88118C6.6517 2.88061 6.72005 2.89563 6.78265 2.92513C6.97738 3.02552 7.15038 3.16394 7.29161 3.33233C7.43283 3.50073 7.53946 3.69575 7.6053 3.90606C7.6315 3.90277 7.65788 3.90112 7.68428 3.90111C7.70214 3.90111 7.71983 3.90111 7.73752 3.90276C7.79193 3.44726 7.79144 2.98678 7.73605 2.5314C7.67625 2.13486 7.43114 1.79616 7.00351 1.52271C6.06961 0.926253 4.47904 0.801013 3.63525 1.0581Z" fill="${color}"/>
</g>
<defs>
<clipPath id="clip0_730_6254">
<path d="M11.4546 0.90918H21V13.3182H11.4546V0.90918Z" fill="${color}"/>
</clipPath>
<clipPath id="clip1_730_6254">
<path d="M0 0.90918H10.4999V13.3182H0V0.90918Z" fill="${color}"/>
</clipPath>
</defs>
</svg>
  `;

  return (
    <SvgXml
      xml={icon}
      width={width}
      height={height}
      color={color}
      subColor={subColor}
    />
  );
};
