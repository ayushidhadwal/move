type data_DTO = {
  title_en: string;
  title_ar: string;
  value_en: string;
  value_ar: string;
};

export type BookingListDTO = {
  date: data_DTO;
  transaction_id: data_DTO;
  amount_paid: data_DTO;
  venue_icon: data_DTO;
  match_booking_id: number;
  date_en: string;
  date_ar: string;
  transaction_id_en: string;
  transaction_id_ar: string;
  amount_paid_en: string;
  amount_paid_ar: string;
  venue_icon_en: string;
  venue_icon_ar: string;
};

export type BookingSliceState = {
  attendingList: BookingListDTO[];
  playedList: BookingListDTO[];
};
