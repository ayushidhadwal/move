// import React, {FC} from 'react';
// import {Box, HStack, Image, Text, VStack} from 'native-base';
// import {Dimensions, ImageSourcePropType} from 'react-native';
// import {
//   Calender,
//   Close,
//   CoEd,
//   Map,
//   MapPin,
//   NewComer,
//   Users,
// } from '../../../../component/svg';
// import {Colors} from '../../../../styles';
//
// type JoinCardType = {
//   index: number;
//   game: string;
//   icon: React.ReactNode;
//   name: string;
//   img: ImageSourcePropType;
//   date: string;
//   player: string;
//   type: string;
//   level: string;
//   address: string;
//   distance: string;
// };
//
// const WIDTH = Dimensions.get('screen').width;
//
// export const JoinCard: FC<JoinCardType> = ({
//   index,
//   game,
//   icon,
//   name,
//   img,
//   date,
//   player,
//   type,
//   level,
//   address,
//   distance,
// }) => {
//   return (
//     <Box
//       bg={'background.400'}
//       mt={index === 0 ? 5 : 0}
//       mb={5}
//       w={'98%'}
//       alignSelf={'center'}>
//       <HStack justifyContent={'space-between'}>
//         <HStack backgroundColor={'yellow.400'} px={1} alignItems={'center'}>
//           {icon}
//           <Text fontWeight={'200'} fontSize={'sm'} mx={2}>
//             {game}
//           </Text>
//         </HStack>
//         <Box pt={1} pr={1}>
//           <Close width={16} height={16} />
//         </Box>
//       </HStack>
//       <Box p={2} mb={2}>
//         <HStack mb={2}>
//           <Image
//             source={img}
//             w={70}
//             h={70}
//             rounded={100}
//             alt={'img'}
//             borderColor={'secondary.400'}
//             borderWidth={1}
//             resizeMode={'cover'}
//           />
//           <VStack pl={3} mt={2}>
//             <Text
//               fontFamily={'body'}
//               fontSize={'md'}
//               pt={1}
//               color={'secondary.400'}
//               textTransform={'capitalize'}
//               fontWeight={'200'}>
//               {name}
//             </Text>
//             {/*<Box*/}
//             {/*// backgroundColor={'#01FD48'}*/}
//             {/*// px={1}*/}
//             {/*// py={0}*/}
//             {/*// alignItems={'center'}*/}
//             {/*>*/}
//             <Text
//               w={12}
//               bg={'#01FD48'}
//               px={1}
//               flexShrink={1}
//               fontWeight={'200'}
//               fontSize={'xs'}>
//               Accept
//             </Text>
//             {/*</Box>*/}
//           </VStack>
//         </HStack>
//         <HStack alignItems={'center'} my={1}>
//           <Calender width={18} height={18} />
//           <Text
//             color={'white'}
//             fontWeight={'200'}
//             fontSize={'sm'}
//             ml={2}
//             fontFamily={'body'}>
//             {date}
//           </Text>
//         </HStack>
//         <HStack alignItems={'center'} mb={1}>
//           <Users width={20} height={20} color={Colors.secondary} />
//           <Text
//             ml={2}
//             color={'white'}
//             fontWeight={'200'}
//             fontSize={'sm'}
//             fontFamily={'body'}>
//             {player}
//           </Text>
//         </HStack>
//         <HStack alignItems={'center'} mb={1}>
//           <CoEd width={22} height={22} color={'white'} subColor={'#8acaff'} />
//           <Text
//             color={'white'}
//             fontWeight={'100'}
//             fontSize={'sm'}
//             ml={2}
//             fontFamily={'body'}>
//             {type}
//           </Text>
//         </HStack>
//         <HStack justifyContent={'space-between'} alignItems={'center'} mb={1}>
//           <HStack alignItems={'center'}>
//             <NewComer width={20} height={20} />
//             <Text
//               color={'white'}
//               fontWeight={'200'}
//               fontSize={'sm'}
//               ml={2}
//               fontFamily={'body'}>
//               {level}
//             </Text>
//           </HStack>
//         </HStack>
//       </Box>
//       <HStack justifyContent={'space-between'} bg={'#263C59'} p={2}>
//         <HStack alignItems={'center'}>
//           <Map height={15} width={15} />
//           <Text color={'white'} fontSize={'xs'} ml={2}>
//             {address}
//           </Text>
//         </HStack>
//         <HStack>
//           <MapPin width={15} height={15} />
//           <Text color={'white'} fontSize={'xs'} ml={2}>
//             {distance}
//           </Text>
//         </HStack>
//       </HStack>
//     </Box>
//   );
// };

import React, {FC, useState} from 'react';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import {ActivityIndicator, Dimensions, ImageSourcePropType} from 'react-native';
import {
  Calender,
  Close,
  CoEd,
  Map,
  MapPin,
  NewComer,
  Users,
} from '../../../../component/svg';
import {Colors} from '../../../../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {Loader} from '../../../../component/common/Loader';

type JoinCardType = {
  id: string;
  index: number;
  game: string;
  icon: React.ReactNode;
  name: string;
  img: ImageSourcePropType;
  date: string;
  player: string;
  type: string;
  level: string;
  address: string;
  distance: string;
  updateWishStatus: (id: string, status: number) => void;
};

const WIDTH = Dimensions.get('screen').width;

export const JoinCard: FC<JoinCardType> = ({
  id,
  index,
  game,
  icon,
  name,
  img,
  date,
  player,
  type,
  level,
  address,
  distance,
  updateWishStatus,
}) => {
  const [closeLoading, setCloseLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const {t} = useTranslation();

  return (
    <Box
      bg={'#1B2C46'}
      mb={6}
      mt={index === 0 || index === 1 ? 5 : 0}
      ml={index % 2 !== 0 ? 3 : 0}
      flex={1 / 2}>
      <HStack justifyContent={'space-between'} p={0}>
        <HStack
          backgroundColor={'yellow.400'}
          h={4}
          px={1}
          alignItems={'center'}>
          {icon}
          <Text fontWeight={'200'} fontSize={'xs'} px={1}>
            {game}
          </Text>
        </HStack>
        {/*<Box pt={0.5} pr={1}>*/}
        {/*  <Close width={16} height={16} />*/}
        {/*</Box>*/}
        {!closeLoading ? (
          <Pressable
            onPress={async () => {
              setCloseLoading(true);
              await updateWishStatus(id, 0);
              // setCloseLoading(false);
            }}>
            <AntDesign
              name="closecircle"
              size={16}
              color="red"
              style={{paddingTop: 5, paddingRight: 5}}
            />
          </Pressable>
        ) : (
          <Box p={1}>
            <ActivityIndicator size={14} color={'red'} />
          </Box>
        )}
      </HStack>
      <Box p={2}>
        <Image
          source={img}
          w={50}
          h={50}
          rounded={100}
          alt={'img'}
          borderColor={'secondary.400'}
          borderWidth={1}
          resizeMode={'cover'}
        />
        <Text
          fontFamily={'body'}
          fontSize={'sm'}
          pt={1}
          color={'secondary.400'}
          textTransform={'capitalize'}
          fontWeight={'200'}
          textAlign={'left'}>
          {name}
        </Text>
        <HStack alignItems={'center'} my={1}>
          <Calender width={15} height={15} />
          <Text
            color={'white'}
            fontWeight={'200'}
            fontSize={'xs'}
            ml={2}
            fontFamily={'body'}>
            {date}
          </Text>
        </HStack>
        <HStack alignItems={'center'} mb={1}>
          <Users width={17} height={17} color={Colors.secondary} />
          <Text
            ml={2}
            color={'white'}
            fontWeight={'200'}
            fontSize={'xs'}
            fontFamily={'body'}>
            {player}
          </Text>
        </HStack>
        <HStack alignItems={'center'} mb={1}>
          <CoEd width={19} height={19} color={'white'} subColor={'#8acaff'} />
          <Text
            color={'white'}
            fontWeight={'100'}
            fontSize={'xs'}
            ml={2}
            fontFamily={'body'}>
            {type}
          </Text>
        </HStack>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          // mb={1}
          // bg={'green.400'}
        >
          <HStack alignItems={'center'}>
            <NewComer width={16} height={16} />
            <Text
              color={'white'}
              fontWeight={'200'}
              fontSize={'xs'}
              ml={2}
              fontFamily={'body'}>
              {level}
            </Text>
          </HStack>
          <Box
            style={{width: 51}}
            backgroundColor={'#01FD48'}
            px={2}
            py={0.5}
            alignItems={'center'}>
            {!acceptLoading ? (
              <Pressable
                onPress={async () => {
                  setAcceptLoading(true);
                  await updateWishStatus(id, 1);
                  // setAcceptLoading(false);
                }}>
                <Text fontWeight={'200'} fontSize={10}>
                  {t('Accept')}
                </Text>
              </Pressable>
            ) : (
              <ActivityIndicator size={15} color={'black'} />
            )}
          </Box>
        </HStack>
      </Box>
      <HStack justifyContent={'space-between'} bg={'#263C59'} p={1}>
        <HStack alignItems={'center'} w={'50%'}>
          <Map height={12} width={12} />
          <Text color={'white'} fontSize={'2xs'} ml={2} numberOfLines={1}>
            {address}
          </Text>
        </HStack>
        <HStack>
          <MapPin width={12} height={12} />
          <Text color={'white'} fontSize={'2xs'} ml={2}>
            {distance}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};
