export type TopUpListItem = {
  // id: string;
  transaction_id_en: string;
  transaction_id_ar: string;
  type_en: string;
  type_ar: string;
  date_en: string;
  date_ar: string;
  amount_en: string;
  amount_ar: string;
  name: string;
  amount: string;
  wallet: string;
  reference_id_en: string;
  reference_id_ar: string;
  comment: string;
  img_url: string;
  user_id: number;

  id: number;
};

export const TopUpList = [
  {
    id: '1',
    date: 'Saturday 23 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '9.000 KD',
  },
  {
    id: '2',
    date: 'Saturday 23 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '9.000 KD',
  },
  {
    id: '3',
    date: 'Saturday 23 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '9.000 KD',
  },
  {
    id: '4',
    date: 'Saturday 23 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '9.000 KD',
  },
];
