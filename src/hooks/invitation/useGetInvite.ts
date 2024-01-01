import {useEffect, useRef, useState} from 'react';
import {InvitationItem} from '../../data/InvitationList';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';

export const useGetInviteList = () => {
  const [inviteLoading, setInviteLoading] = useState<boolean>(true);
  const [inviteList, setInviteList] = useState<InvitationItem[]>([]);
  // const {matchId} = route.params;

  const getInvitationList = (matchId: number) => {
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

  const intervalRef = useRef<number>();

  useEffect(() => {
    setInviteLoading(true);
    getInvitationList();

    if (intervalRef.current) {
      clearInterval(intervalRef?.current as number);
    }

    intervalRef.current = setInterval(() => {
      // console.log('get invities calling after 3s');

      getInvitationList();
    }, 3000);

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, []);

  const updateWishStatus = async (id: string, status: number) => {
    const index = inviteList.findIndex(invite => {
      return id === invite.id;
    });

    if (index > -1) {
      // API call
      Axios.get(ApiEndpoints.invitation.invite).then((response: any) => {
        if (response.data.status === 'ok') {
          // API success
          const nInviteList = [...inviteList];
          nInviteList.splice(index, 1);
          setInviteList(nInviteList);
          // API success ends
        }
      });
    }
  };

  // const updateInviteStatus = async (id: string, status: boolean) => {
  //   getInvitationList();
  // };

  return {
    InvitationList: inviteList,
    inviteLoading,
    updateWishStatus,
    // updateInviteStatus,
  };
};
