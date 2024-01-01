import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {PaymentStructureDTO} from '../hooks/booking/useGetMatchBookingDetails';

export enum VerificationFor {
  REGISTRATION = '1',
  CHANGE_NUMBER = '2',
  FORGET_PASSWORD = '3',
}

export enum PaymentMethodId {
  KNET = '1',
  CREDIT_CARD = '2',
  WALLET = '3',
}

export type AuthStackParamsList = {
  SelectLocations: undefined;
  ManualLocation: undefined;
  CurrentLocation: {latitude: number; longitude: number};
  Introduction: undefined;
  Login: undefined;
  Register: undefined;
  OTPScreen: {
    userId: number;
    phone: string;
    verificationFor: VerificationFor;
  };
  ForgotPassword: undefined;
  ChangePassword: {
    userId: number;
  };
};

export type BottomTabsParamList = {
  Home: undefined;
  Venues: undefined;
  Explore: undefined;
  BookingTopTab: undefined;
  Profile: undefined;
};

export type RootStackParamsList = {
  ChooseYourSport: undefined;
  BottomTabs: BottomTabsParamList;
  TopTab: {screen: string; venueId: number; venueHeader: string};
  RequestVenue: undefined;
  PitchBooking: undefined;
  GamePolicy: undefined;
  ChooseSport: undefined;
  GameDifficulty: {level: []; SportId: string};
  SelectLocation: {levelId: string; SportId: string};
  GameDetails: {venueId: string; SportId: string; levelId: string};
  DateTime: {
    venueId: string;
    SportId: string;
    levelId: string;
    formationId: string;
    genderId: string;
    gameType: string;
    accessType: string;
    goLiveScoring: string;
    noOfPlayers: string;
    title: string;
    description: string;
  };
  GamePayment: {
    venueId: string;
    SportId: string;
    levelId: string;
    formationId: string;
    genderId: string;
    gameType: string;
    accessType: string;
    goLiveScoring: string;
    noOfPlayers: string;
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endTime: string;
  };
  GameTopTab: {screen: string; matchId: number};
  ManageGuest: {loggedInUserJoin: boolean; matchId: number};
  Invitation: undefined;
  Chat: {matchId: number};
  Android: {matchId: number};
  Ios: {matchId: number};
  PaymentDetail: {
    matchId: number;
    selectedPlayerList: number[];
    coupon?: string;
  };
  PaymentSuccess: {paymentId: number; matchId: number};
  Settings: undefined;
  Follower: {userId: number | null};
  Following: {userId: number | null};
  ChangeLanguage: undefined;
  ChangeInfo: undefined;
  PlayerSport: undefined;
  AvailableDay: undefined;
  Position: undefined;
  Invoice: undefined;
  MovePayTopTab: {screen: string};
  BankDetails: undefined;
  BookingDetails: {matchBookingId: number};
  PaymentStructure: {paymentStructure: PaymentStructureDTO | null};
  SelectPlayer: {matchId: any};
  ReviewQuestion: {matchId: number; selectedPlayer: number};
  ReviewRating: {matchId: number; selectedPlayer: number};
  LiveScoring: {matchId: number};
  Feedback: undefined;
  ChangeLevel: undefined;
  BlockList: undefined;
  CustomerSupport: undefined;
  FAQ: undefined;
  ChangeSportPreference: undefined;
  UserChangePassword: undefined;
  GamePaymentSuccess: undefined;
  GamePaymentFailed: undefined;
  ActivityAround: undefined;
  MatchRequest: undefined;
  LiveScore: undefined;
  UpcomingGames: undefined;
  JoinMatchPaymentFailed: undefined;
  PlayerProfile: {userId: number};
  SendInvitation: {matchId: number};
  MatchPayment: {url: string};
  MatchJoinPayment: {url: string; paymentId: number; matchId: any; info: any};
  ManageRequest: {matchId: number};
  Coupon: {
    matchId: number;
    selectedPlayerList: number[];
  };
  Notification: undefined;
  UpdateLocation: undefined;
};

export type AuthNavigationProps =
  NativeStackNavigationProp<AuthStackParamsList>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamsList> =
  NativeStackScreenProps<AuthStackParamsList, Screen>;

export type RootNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamsList>,
  BottomTabNavigationProp<BottomTabsParamList>
>;

export type RootStackScreenProps<Screen extends keyof RootStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamsList, Screen>,
    BottomTabScreenProps<BottomTabsParamList>
  >;

export type RootBottomTabScreenProps<Screen extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, Screen>,
    NativeStackScreenProps<RootStackParamsList>
  >;
