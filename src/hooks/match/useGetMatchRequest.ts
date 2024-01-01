import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {walletDTO} from '../../store/wallet/types';
import {useError} from '../../context/ErrorProvider';
import {useAppDispatch} from '../../store';
import {getPackages} from '../../store/wallet/walletSlice';
import {InvitationItem, InvitationList} from '../../data/InvitationList';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {LiveScore} from '../../data/HomeActivities';

export const useGetMatchRequestList = () => {
  const navigation = useNavigation();
  const setError = useError();
  const dispatch = useAppDispatch();

  const [matchRequestLoading, setMatchRequestLoading] = useState<boolean>(true);
  const [matchRequestList, setMatchRequestList] = useState<InvitationItem[]>(
    [],
  );

  const getMatchRequestList = () => {
    Axios.get(ApiEndpoints.match.matchRequest).then((response: any) => {
      if (response.data.status === 'ok') {
        setMatchRequestLoading(false);
        // setLiveScoreList(response.data.data);
        console.log(response.data.data);
      }
    });
    // .catch((error: any) => {
    //   setMessage(error);
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  useEffect(() => {
    setMatchRequestLoading(true);

    getMatchRequestList();
  });

  return {
    InvitationList: matchRequestList,
    matchRequestLoading,
  };
};
