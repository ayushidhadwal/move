import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {RootState} from '../store';
import {RootStackParamsList} from './types';

import BottomTabNavigation from './BottomTabNavigation';
import {TopTabNavigation} from '../component/navigation/TopTabNavigation';
import {RequestVenueScreen} from '../screen/venues/request-venue';
import {PitchBookingScreen} from '../screen/new-game/pitch-booking';
import {GamePolicyScreen} from '../screen/new-game/game-policy';
import {ChooseSportScreen} from '../screen/new-game/choose-sport';
import {GameDifficultyScreen} from '../screen/new-game/game-difficulty';
import {SelectLocationScreen} from '../screen/new-game/select-location';
import {GameDetailsScreen} from '../screen/new-game/game-details';
import {DateTimeScreen} from '../screen/new-game/date-time';
import {GamePaymentScreen} from '../screen/new-game/game-payment';
import {GameTopTabNavigation} from '../component/navigation/GameTopTabNavigation';
import {ManageGuestScreen} from '../screen/existed-game/manage-guest';
import {InvitationScreen} from '../screen/existed-game/invitations';
import {SendInvitationScreen} from '../screen/existed-game/invitations/SendInvitationScreen';
// import {ChatScreen} from '../screen/existed-game/chat';
import {PaymentDetailScreen} from '../screen/existed-game/payment-details';
import {PaymentSuccessfulScreen} from '../screen/existed-game/payment-success';
import {SettingScreen} from '../screen/settings';
import {FollowerScreen} from '../screen/follower';
import {FollowingScreen} from '../screen/following';
import {ChangeLanguageScreen} from '../screen/change-language';
import {ChangeInfoScreen} from '../screen/change-info';
import {PlayerSportScreen} from '../screen/player-info/choose-sport';
import {AvailableDayScreen} from '../screen/player-info/availabe-days';
import {PositionScreen} from '../screen/player-info/position/PositionScreen';
import {InvoiceScreen} from '../screen/invoice';
import {MovePayTopTabNavigation} from '../component/navigation/MovePayTopTabNavigation';
import {BankDetailsScreen} from '../screen/bank-details';
import {BookingDetailScreen} from '../screen/bookings/BookingDetails';
import {PaymentStructureScreen} from '../screen/bookings/PaymentStructure/PaymentStructureScreen';
import {SelectPlayerScreen} from '../screen/match-review/SelectPlayerScreen';
import {ReviewQuestionScreen} from '../screen/match-review/ReviewQuestionScreen';
import {ReviewRatingScreen} from '../screen/match-review/ReviewRatingScreen';
import {LiveScoringScreen} from '../screen/live-scoring';
import {FeedbackScreen} from '../screen/feedback';
import {ChangeLevelScreen} from '../screen/change-level';
import {BlockListScreen} from '../screen/blocklist';
import {CustomerSupportScreen} from '../screen/customer-support';
import {FAQScreen} from '../screen/FAQ';
import {ChooseYourSportScreen} from '../screen/choose-sport/ChooseSportScreen';
import {PlayerProfileScreen} from '../screen/player-profile';
import {ChangeSportPreferenceScreen} from '../screen/change-sport-preference';
import {UserChangePasswordScreen} from '../screen/user-change-password';
import {GamePaymentSuccessScreen} from '../screen/new-game/payment/PaymentSuccess';
import {GamePaymentFailedScreen} from '../screen/new-game/payment/PaymentFailed';
import {MatchPaymentScreen} from '../screen/new-game/payment/MatchPayment';
import {CouponScreen} from '../screen/existed-game/coupon';
import {ActivityAroundScreen} from '../screen/home/ActivityAroundScreen';
import {MatchRequestScreen} from '../screen/home/MatchRequestScreen';
import {LiveScoreScreen} from '../screen/home/LiveScoreScreen';
import {MatchJoinPaymentScreen} from '../screen/existed-game/matchJoinPayment';
import {UpcomingGamesScreen} from '../screen/home/UpcomingGamesScreen';
import {JoinMatchPaymentFailedScreen} from '../screen/existed-game/payment-failed/PaymentFailed';
import {NotificationScreen} from '../screen/notification';
import {UpdateLocationScreen} from '../screen/update-location';
import {ManageRequestScreen} from '../screen/Manage-Request/ManageRequestScreen';
import {AndroidChatScreen} from '../screen/existed-game/chat/AndroidChatScreen';
import {IosChatScreen} from '../screen/existed-game/chat/IosChatScreen';
import {useInitialURL} from '../../App';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamsList>();

function RootStackNavigation() {
  const {url: initialUrl, processing} = useInitialURL();
  const navigation = useNavigation();

  useEffect(() => {
    console.log(initialUrl);
    if (initialUrl?.includes('player-profile')) {
      // console.log(initialUrl.split('/'));
      const url = initialUrl.split('/');
      navigation.navigate('PlayerProfile', {userId: url[url.length - 1]});
    }
  }, [initialUrl]);
  // console.log(userId);

  const {chooseSport} = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{animation: 'slide_from_right', headerShown: false}}>
      {!chooseSport && (
        <Stack.Screen
          name="ChooseYourSport"
          component={ChooseYourSportScreen}
        />
      )}
      <Stack.Screen name="BottomTabs" component={BottomTabNavigation} />
      <Stack.Screen name="TopTab" component={TopTabNavigation} />
      <Stack.Screen name="RequestVenue" component={RequestVenueScreen} />
      <Stack.Screen name="PitchBooking" component={PitchBookingScreen} />
      <Stack.Screen name="GamePolicy" component={GamePolicyScreen} />
      <Stack.Screen name="ChooseSport" component={ChooseSportScreen} />
      <Stack.Screen name="GameDifficulty" component={GameDifficultyScreen} />
      <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
      <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
      <Stack.Screen name="DateTime" component={DateTimeScreen} />
      <Stack.Screen name="GamePayment" component={GamePaymentScreen} />
      <Stack.Screen name="GameTopTab" component={GameTopTabNavigation} />
      <Stack.Screen name="ManageGuest" component={ManageGuestScreen} />
      <Stack.Screen name="Invitation" component={InvitationScreen} />
      <Stack.Screen name="SendInvitation" component={SendInvitationScreen} />
      {/*<Stack.Screen name="Chat" component={ChatScreen} />*/}
      <Stack.Screen name="Android" component={AndroidChatScreen} />
      <Stack.Screen name="Ios" component={IosChatScreen} />
      <Stack.Screen name="PaymentDetail" component={PaymentDetailScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessfulScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Follower" component={FollowerScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
      <Stack.Screen name="ChangeInfo" component={ChangeInfoScreen} />
      <Stack.Screen name="PlayerSport" component={PlayerSportScreen} />
      <Stack.Screen name="AvailableDay" component={AvailableDayScreen} />
      <Stack.Screen name="Position" component={PositionScreen} />
      <Stack.Screen name="Invoice" component={InvoiceScreen} />
      <Stack.Screen name="MovePayTopTab" component={MovePayTopTabNavigation} />
      <Stack.Screen name="BankDetails" component={BankDetailsScreen} />
      <Stack.Screen name="BookingDetails" component={BookingDetailScreen} />
      <Stack.Screen name="SelectPlayer" component={SelectPlayerScreen} />
      <Stack.Screen name="ReviewQuestion" component={ReviewQuestionScreen} />
      <Stack.Screen name="ReviewRating" component={ReviewRatingScreen} />
      <Stack.Screen name="LiveScoring" component={LiveScoringScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="ChangeLevel" component={ChangeLevelScreen} />
      <Stack.Screen name="BlockList" component={BlockListScreen} />
      <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="PlayerProfile" component={PlayerProfileScreen} />
      <Stack.Screen name="MatchPayment" component={MatchPaymentScreen} />
      <Stack.Screen name="Coupon" component={CouponScreen} />
      <Stack.Screen name="ActivityAround" component={ActivityAroundScreen} />
      <Stack.Screen name="MatchRequest" component={MatchRequestScreen} />
      <Stack.Screen name="LiveScore" component={LiveScoreScreen} />
      <Stack.Screen name="UpcomingGames" component={UpcomingGamesScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="UpdateLocation" component={UpdateLocationScreen} />
      <Stack.Screen name="ManageRequest" component={ManageRequestScreen} />

      {/* <Stack.Screen
            name="CurrentLocation"
            component={CurrentLocationScreen}
          /> */}
      <Stack.Screen
        name="JoinMatchPaymentFailed"
        component={JoinMatchPaymentFailedScreen}
      />
      <Stack.Screen
        name="MatchJoinPayment"
        component={MatchJoinPaymentScreen}
      />
      <Stack.Screen
        name="ChangeSportPreference"
        component={ChangeSportPreferenceScreen}
      />
      <Stack.Screen
        name="UserChangePassword"
        component={UserChangePasswordScreen}
      />
      <Stack.Screen
        name="PaymentStructure"
        component={PaymentStructureScreen}
      />
      <Stack.Screen
        name="GamePaymentSuccess"
        component={GamePaymentSuccessScreen}
      />
      <Stack.Screen
        name="GamePaymentFailed"
        component={GamePaymentFailedScreen}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigation;
