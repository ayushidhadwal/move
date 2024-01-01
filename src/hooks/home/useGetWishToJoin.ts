import {useEffect, useRef, useState} from 'react';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {Axios} from '../../lib/Axios';
import {HomeJoinType} from '../../data/HomeActivities';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export const useGetWishToJoin = (getData: any) => {
  const [wishLoading, setWishLoading] = useState<boolean>(true);
  const [wishList, setWishList] = useState<HomeJoinType[]>([]);

  const getWishList = () => {
    // setWishList(HomeJoin);
    setWishLoading(true);

    Axios.get(ApiEndpoints.home.wish)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setWishList(response.data.data.wish_to_join);
          // console.log(response.data.data.wish_to_join);
          // setWishList(HomeJoin);
        }
        setWishLoading(false);
      })
      .catch((error: any) => {
        setWishLoading(false);
      });
  };

  const intervalRef = useRef<number>();

  useEffect(() => {
    if (getData) {
      setWishLoading(true);
      getWishList();

      if (intervalRef.current) {
        clearInterval(intervalRef?.current as number);
      }

      intervalRef.current = setInterval(() => {
        // console.log('get wish to join calling after 3s');

        getWishList();
      }, 3000);
    }

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, [getData]);

  // const updateMatchRequest = async (id: string, status: number) => {
  //   try {
  //     const response = await Axios.post(
  //       ApiEndpoints.invitation.updateMatchRequest,
  //       {
  //         match_id: matchId,
  //         user_id: userId,
  //         status: status,
  //       },
  //     );
  //     if (response.data.status === 'ok') {
  //       getMatchRequest();
  //       console.log(response.data);
  //     }
  //   } catch (e) {
  //     //
  //   }
  // };

  const updateWishStatus = async (
    userId: number,
    matchId: number,
    id: string,
    status: number,
    requestStatus: number,
  ) => {
    const index = wishList.findIndex(wish => {
      return id === wish.user_id;
    });
    console.log('outside if', index);

    if (index > -1) {
      // API call
      console.log(userId, matchId, status, requestStatus);

      Axios.post(ApiEndpoints.invitation.updateMatchRequest, {
        match_id: matchId,
        user_id: userId,
        status: status,
        request_status: requestStatus,
      }).then((response: any) => {
        console.log('response', response);
        if (response.data.status === 'ok') {
          // API success
          const nWishList = [...wishList];
          nWishList.splice(index, 1);
          setWishList(nWishList);
          // API success ends
        } else {
          console.log(response.data);
        }
      });
    }
  };

  return {
    HomeJoin: wishList,
    wishLoading,
    updateWishStatus,
  };
};
