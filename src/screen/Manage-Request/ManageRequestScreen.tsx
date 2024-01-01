import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, FlatList} from 'native-base';
import {useTranslation} from 'react-i18next';

import {ManageRequestCard} from './components/ManageRequestCard';
import {AppLayout} from '../../component/common/AppLayout';
import {Header} from '../../component/common/Header';
import {Loader} from '../../component/common/Loader';
import {RootStackScreenProps} from '../../navigation/types';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {MangeRequestItem} from '../../data/ManageRequestList';
import {useError} from '../../context/ErrorProvider';

type Props = RootStackScreenProps<'ManageRequest'>;

export const ManageRequestScreen: FC<Props> = ({navigation, route}) => {
  const {matchId} = route.params;
  const setError = useError();

  console.log('Manage Request', matchId);

  const [matchRequestLoading, setMatchRequestLoading] = useState<boolean>(true);

  const [matchRequestList, setMatchRequestList] = useState<MangeRequestItem[]>(
    [],
  );
  const {t} = useTranslation();
  const renderItem = ({
    item,
    index,
  }: {
    item: MangeRequestItem;
    index: number;
  }) => (
    <ManageRequestCard
      index={index}
      userId={item?.user_id}
      guestName={item?.name}
      img={{uri: item?.image}}
      award={item?.match_award}
      accepted={item?.is_accepted}
      declined={item?.is_declined}
      updateMatchRequest={updateMatchRequest}
      onPressHandler={() => {
        // view profile
        navigation.navigate('PlayerProfile', {userId: item?.user_id});
      }}
      joined={item.is_joined}
    />
  );

  const updateMatchRequest = async (userId: number, status: number) => {
    console.log('Passing object ', {
      match_id: matchId,
      user_id: userId,
      request_status: status, // cross icon 0   and accept button 1
      status: '2', // host doing  public accesss 2  or user doing invite only 1   ,
    });
    try {
      const response = await Axios.post(
        ApiEndpoints.invitation.updateMatchRequest,
        {
          match_id: matchId,
          user_id: userId,
          request_status: status, // cross icon 0   and accept button 1
          status: '2', // host doing  public accesss 2  or user doing invite only 1
        },
      );
      if (response.data.status === 'ok') {
        getMatchRequest();
        console.log(response.data);
      }
    } catch (e: any) {
      setError(e);
    }
  };
  const getMatchRequest = () => {
    // console.log(matchId);
    Axios.get(`${ApiEndpoints.invitation.getMatchRequest}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setMatchRequestList(response?.data?.data);
          // console.log(response.data.data);
        }
      })
      .catch((e: any) => {
        setError(e);
      })
      .finally(() => {
        setMatchRequestLoading(false);
      });
  };

  const intervalRef = useRef<number>();

  useEffect(() => {
    setMatchRequestLoading(true);
    getMatchRequest();

    if (intervalRef.current) {
      clearInterval(intervalRef?.current as number);
    }

    // intervalRef.current = setInterval(() => {
    //   console.log('get match request calling after 3s');

    //   getMatchRequest();
    // }, 3000);

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, []);

  return (
    <AppLayout>
      <Header heading={String(t('Manage Requests'))} />
      {matchRequestLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={matchRequestList}
            renderItem={renderItem}
            keyExtractor={item => item?.user_id}
          />
        </Box>
      )}
    </AppLayout>
  );
};
