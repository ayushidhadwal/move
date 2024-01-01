export type MangeRequestItem = {
  user_id: string;
  name: string;
  image: string;
  match_award: number;
  is_accepted: boolean;
  is_declined: boolean;
  is_joined:boolean;
};

export const ManageRequestList = [
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
