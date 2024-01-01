export type InvoiceListItem = {
  id: string;
  venueName: string;
  transactionId: string;
  amtPaid: string;
  amount: string;
  date: string;
  transaction_id: string;
  venue_en: string;
  venue_ar: string;
  invoice: string;
};

export const InvoiceList = [
  {
    id: '1',
    venueName: 'Qadsia Sports Club',
    date: 'Saturday 23 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '9.000 KD',
  },
  {
    id: '3',
    venueName: 'Kuwait Sports Club',
    date: 'Saturday 18 Feb 2023',
    transactionId: '655645845648',
    amtPaid: '5.500 KD',
  },
];
