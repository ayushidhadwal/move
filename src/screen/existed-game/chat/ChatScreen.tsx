// import React, {FC, useEffect, useState} from 'react';
// import {Box, HStack, Image, Input, Pressable, Text} from 'native-base';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//
// import {AppLayout} from '../../../component/common/AppLayout';
// import {PaymentMethodId, RootStackScreenProps} from '../../../navigation/types';
// import {Header} from '../../../component/common/Header';
// import {Send} from '../../../component/svg';
// import {useTranslation} from 'react-i18next';
// import {Axios} from '../../../lib/Axios';
// import {ApiEndpoints} from '../../../store/ApiEndpoints';
// import {TopUpListItem} from '../../../data/TopUpList';
// import {useSelector} from 'react-redux';
// import {RootState} from '../../../store';
// import {KeyboardAvoidingView, Platform} from 'react-native';
// import useKeyboardHeight from '../../../hooks/useKeyboardHeight';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
//
// const AnimatedHStack = Animated.createAnimatedComponent(HStack);
//
// type Props = RootStackScreenProps<'Chat'>;
//
// export const ChatScreen: FC<Props> = ({navigation, route}) => {
//   const {t} = useTranslation();
//   const keyboardHeight = useKeyboardHeight();
//
//   const {bottom} = useSafeAreaInsets();
//
//   const height = useSharedValue(0);
//   const inputStyle = useAnimatedStyle(() => {
//     return {bottom: height.value, padding: 5};
//   });
//
//   useEffect(() => {
//     height.value = withTiming(keyboardHeight ? keyboardHeight - bottom : 0, {
//       duration: 10,
//     });
//   }, [keyboardHeight]);
//
//   const [commentLoading, setCommentLoading] = useState<boolean>(true);
//   const [commentValue, setCommentValue] = useState<string>('');
//   const [commentsList, setCommentsList] = useState<TopUpListItem[]>([]);
//   const {userId} = useSelector((state: RootState) => state.auth);
//   const {matchId} = route.params;
//
//   const getComments = () => {
//     Axios.get(`${ApiEndpoints.comments.getComments}?match_id=${matchId}`)
//       .then((response: any) => {
//         if (response.data.status === 'ok') {
//           if (response.data.data) {
//             setCommentsList(response.data.data);
//             console.log(response.data);
//             // setTopUpList(TopUpList);
//           }
//         }
//       })
//       .catch((error: any) => {
//         //
//       })
//       .finally(() => {
//         setCommentLoading(false);
//       });
//   };
//
//   useEffect(() => {
//     getComments();
//   }, []);
//
//   const postComments = async () => {
//     try {
//       const response = await Axios.post(ApiEndpoints.comments.postComments, {
//         match_id: matchId,
//         user_id: userId,
//         comment: commentValue,
//       });
//       console.log(response.data);
//       if (response.data.status === 'ok') {
//         getComments();
//         setCommentValue('');
//       }
//     } catch (e) {
//       console.log('error', e);
//     }
//   };
//
//   const RightCard = ({comment, name, img}: any) => {
//     return (
//       <HStack mb={2} alignItems={'center'} alignSelf={'flex-end'}>
//         <>
//           <Text
//             p={2}
//             mr={3}
//             fontFamily={'body'}
//             fontSize={'sm'}
//             fontWeight={'100'}
//             fontStyle={'normal'}
//             color={'white'}
//             bg={'background.400'}>
//             {comment}
//           </Text>
//           <Box alignItems={'center'}>
//             <Image alt={'no img'} source={{uri: img}} size={'xs'} />
//             <Text
//               fontFamily={'body'}
//               fontSize={10}
//               fontWeight={'100'}
//               fontStyle={'normal'}
//               color={'yellow.400'}>
//               {name}
//             </Text>
//           </Box>
//         </>
//       </HStack>
//     );
//   };
//
//   const LeftCard = ({comment, name, img}: any) => {
//     return (
//       <HStack mb={2} alignItems={'center'}>
//         <>
//           <Box>
//             <Image alt={'no img'} source={{uri: img}} size={'xs'} />
//             <Text
//               fontFamily={'body'}
//               fontSize={10}
//               fontWeight={'100'}
//               fontStyle={'normal'}
//               color={'white'}>
//               {name}
//             </Text>
//           </Box>
//           <Text
//             p={2}
//             ml={3}
//             fontFamily={'body'}
//             fontSize={'sm'}
//             fontWeight={'100'}
//             fontStyle={'normal'}
//             color={'white'}
//             bg={'background.400'}>
//             {comment}
//           </Text>
//         </>
//       </HStack>
//     );
//   };
//
//   return (
//     <AppLayout>
//       {/*<Header heading={String(t('Comments'))} />*/}
//       <KeyboardAwareScrollView style={{flex: 1}}>
//         <Box p={5}>
//           {commentsList.map(m => {
//             if (m.user_id === userId) {
//               return (
//                 <RightCard
//                   comment={m.comment}
//                   img={m.img_url}
//                   name={m.name}
//                   id={m.id}
//                 />
//               );
//             } else {
//               return (
//                 <LeftCard
//                   comment={m.comment}
//                   img={m.img_url}
//                   name={m.name}
//                   id={m.id}
//                 />
//               );
//             }
//           })}
//         </Box>
//       </KeyboardAwareScrollView>
//
//       {Platform.OS === 'ios' ? (
//         <AnimatedHStack
//           p={5}
//           bg={'background.400'}
//           alignItems={'center'}
//           safeAreaBottom
//           style={inputStyle}>
//           {
//             <Input
//               value={commentValue}
//               colorScheme={'primary'}
//               size={'md'}
//               variant="outline"
//               w={'90%'}
//               borderColor={'secondary.400'}
//               backgroundColor={'rgba(138,202,255,0.10)'}
//               focusOutlineColor={'secondary.400'}
//               placeholder={String(t('Type here'))}
//               placeholderTextColor={'gray.400'}
//               mr={3}
//               color={'white'}
//               onChangeText={text => {
//                 setCommentValue(text);
//               }}
//             />
//           }
//           <Pressable onPress={postComments}>
//             <Send width={22} height={22} />
//           </Pressable>
//         </AnimatedHStack>
//       ) : (
//         <AnimatedHStack
//           p={5}
//           bg={'background.400'}
//           alignItems={'center'}
//           safeAreaBottom
//           style={inputStyle}>
//           {
//             <Input
//               value={commentValue}
//               colorScheme={'primary'}
//               size={'md'}
//               variant="outline"
//               w={'90%'}
//               borderColor={'secondary.400'}
//               backgroundColor={'rgba(138,202,255,0.10)'}
//               focusOutlineColor={'secondary.400'}
//               placeholder={String(t('Type here'))}
//               placeholderTextColor={'gray.400'}
//               mr={3}
//               color={'white'}
//               onChangeText={text => {
//                 setCommentValue(text);
//               }}
//             />
//           }
//           <Pressable onPress={postComments}>
//             <Send width={22} height={22} />
//           </Pressable>
//         </AnimatedHStack>
//       )}
//     </AppLayout>
//   );
// };
