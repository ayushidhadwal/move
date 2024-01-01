import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, FlatList} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {InvitationItem, InvitationList} from '../../../data/InvitationList';

import {Loader} from '../../../component/common/Loader';
import {useGetInviteList} from '../../../hooks/invitation/useGetInvite';
import {SendInvitationCard} from './components/SendInvitationCard';
import {Axios} from '../../../lib/Axios';
import {ApiEndpoints} from '../../../store/ApiEndpoints';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

type Props = RootStackScreenProps<'SendInvitation'>;

export const SendInvitationScreen: FC<Props> = ({navigation, route}) => {
  const {matchId} = route.params;
  console.log(matchId);

  const [inviteLoading, setInviteLoading] = useState<boolean>(true);
  const [inviteList, setInviteList] = useState<InvitationItem[]>([]);

  const {t} = useTranslation();
  const renderItem = ({item, index}: {item: InvitationItem; index: number}) => (
    <SendInvitationCard
      index={index}
      userId={item.user_id}
      guestName={item.name}
      img={{uri: item.image}}
      isInvited={item.is_invited}
      isAccepted={item.is_accepted}
      isRejected={item.is_rejected}
      award={item.match_award}
      sendMatchInvitation={sendMatchInvitation}
      // onPressHandler={() =>
      //   navigation.navigate('PlayerProfile', {userId: item.id})
      // }
    />
  );

  const getInvities = () => {
    Axios.get(`${ApiEndpoints.invitation.invite}?match_id=${matchId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setInviteList(response.data.data.invitees);
        }
      })
      .catch((error: any) => {
        //
      })
      .finally(() => {
        setInviteLoading(false);
      });
  };

  useEffect(() => {
    getInvities();
  }, []);

  const intervalRef = useRef<number>();

  useEffect(() => {
    setInviteLoading(true);
    getInvities();

    if (intervalRef.current) {
      clearInterval(intervalRef?.current as number);
    }

    // intervalRef.current = setInterval(() => {
    //   // console.log('get invities calling after 3s');
    //
    //   getInvities();
    // }, 3000);

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, []);

  const sendMatchInvitation = async (receiverId: any, type: string) => {
    console.log(receiverId, type);
    try {
      const response = await Axios.post(
        ApiEndpoints.invitation.sendMatchInvitation,
        {
          match_id: matchId,
          receiver_id: receiverId,
          type: type,
        },
      );

      if (response.data.status === 'ok') {
        getInvities();
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      //
    }
  };

  return (
    <AppLayout>
      <Header heading={String(t('Send Invitations'))} />
      {inviteLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={inviteList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </Box>
      )}
    </AppLayout>
  );
};
