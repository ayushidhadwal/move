import {PaymentMethodId} from '../../navigation/types';

export type matchCheckoutPayload = {
  noOfPlayers: string;
  amount: string;
};
export type matchCreatePayload = {
  venueId: string;
  SportId: string;
  levelId: string;
  formationId: string;
  genderId: string;
  gameType: string;
  accessType: string;
  goLiveScoring: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endTime: string;
  amount: string;
  refundable: boolean;
};

export type dateTime = {
  date: string;
  start_time: string;
};
export type formation = {
  titel_en: string;
  titel_ar: string;
};
export type level = {
  title_en: string;
  title_ar: string;
};
export type gender = {
  name: string;
  icon: string;
};
export type pricePerPlayer = {
  price_per_player: string;
};

export type imageDTO = {
  id: string;
  image: string;
  image_url: string;
};

export type venueDetails = {
  location: string;
  name: string;
  distance: string;
  image: imageDTO[];
};

export type infoDTO = {
  datetime: dateTime;
  formation: formation;
  level: level;
  gender: gender;
  price_per_player: pricePerPlayer;
  venue_details: venueDetails;
};

export type teamOne = {
  title_en: string;
  title_ar: string;
  formation: number;
  added_players: string;
  players: string;
};

export type lineupDTO = {
  team_one: teamOne;
  team_two: teamOne;
};

export type GameSliceState = {
  payableAmount: null | string;
  receivableAmount: null | string;
  moveCommission: null | string;
  pricePerPlayer: null | string;
  matchId: null | number;
  paymentUrl: null | string;
  infoData: null | infoDTO;
  lineupData: null | lineupDTO;
};

export type matchSliceState = {
  totalSlots: number | null;
  availableSlot: number | null;
  loggedInUserJoin: boolean;
  totalAmount: number;
  paidFromWallet: number;
  coupon: number;
  payableAmount: number;
  matchBookingPaymentId: number;
  paymentUrl: string | null;
  bookingDetails: [];
  paymentDetails: [];
};
export type joinMatchCheckoutSliceState = {
  paymentMethod: PaymentMethodId;
  coupon: string | null;
  matchId: number;
  selectedPlayerList: number[];
};

export type joiningMatchSliceState = {
  paymentMethod: PaymentMethodId;
  matchId: number;
  selectedPlayerList: number[];
};
