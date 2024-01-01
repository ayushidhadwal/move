export type InvitationItem = {
  user_id: string;
  name: string;
  image: string;
  is_invited: boolean;
  is_accepted: boolean;
  is_rejected: boolean;
};

export const InvitationList = [
  {
    id: '1',
    guestName: 'hussain24',
    img: require('../assets/data/playerImg.png'),
  },
  {
    id: '2',
    guestName: 'goncalo12',
    img: require('../assets/data/user8.png'),
  },
  {
    id: '3',
    guestName: 'hugo ',
    img: require('../assets/data/user7.png'),
  },
];
