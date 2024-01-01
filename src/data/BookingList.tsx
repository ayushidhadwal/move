import {string} from 'yup';

export type BookingListItem = {
  id: string;
  date: string;
  transactionId: string;
  amtPaid: string;
  venue: string;
};

export type bookingItem = {
  venue_en: string;
  venue_ar: string;
  datetime: string;
  team: string;
  slots: string;

};
export type paymentItem = {

  total_amount: string;
  paid_from_wallet: string;
  coupon: string;
  paid_amount: string;
  reference_id: string;
};

export const BookingList = [
  {
    id: '1',
    date: 'Saturday 23 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '9.000 KD',
    venue: 'Qadsia Sports club ',
  },
  {
    id: '2',
    date: 'Saturday 18 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '5.500 KD',
    venue: 'Kuwait Sports club ',
  },
];
