import {useEffect, useRef, useState} from 'react';
import {LiveScore, LiveScoreItem} from '../../data/HomeActivities';
import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

export const useGetLiveScore = (getData: any) => {
  const [liveScoreLoading, setLiveScoreLoading] = useState<boolean>(true);
  const [liveScoreList, setLiveScoreList] = useState<LiveScoreItem[]>([]);
  const {userId} = useSelector((state: RootState) => state.auth);

  const getLiveScoreList = () => {
    setLiveScoreLoading(true);

    Axios.get(`${ApiEndpoints.home.live}?user_id=${userId}`)
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setLiveScoreList(response?.data?.data);
          setLiveScoreLoading(false);
          // setLiveScoreList(LiveScore);
        }
      })
      .catch((error: any) => {
        setLiveScoreLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const intervalRef = useRef<number>();

  useEffect(() => {
    if (getData) {
      setLiveScoreLoading(true);
      getLiveScoreList();

      if (intervalRef.current) {
        clearInterval(intervalRef.current as number);
      }

      intervalRef.current = setInterval(() => {
        // console.log('get live score calling after 3s');

        getLiveScoreList();
      }, 3000);
    }

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, [getData]);

  return {
    LiveScore: liveScoreList,
    liveScoreLoading,
  };
};
