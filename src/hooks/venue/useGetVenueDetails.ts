import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import i18next from 'i18next';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../store/ApiEndpoints';
import {useMessage} from '../useMessage';
import i18n from 'i18next';

export type venueImageDTO = {
  id: number;
  venue_id: number;
  image_url: string;
};

export type upcomingImage = {
  id: number;
  image: string;
  image_url: string;
};

export type reviewQues = {
  title_en: string;
  title_ar: string;
  is_active: string;
};

export type reviewDTO = {
  image: string;
  name: string;
  rating: number;
  details: reviewQues[];
  ground_quality: number;
};

export type venueDetailsDTO = {
  id: number;
  name: string;
  details: string;
  location: string;
  image: venueImageDTO[];
};

export type upcomingDTO = {
  match_id: number;
  host_id: number;
  host_name: string;
  host_image: string;
  date: string;
  start_time: string;
  sport_name: string;
  sport_image: string;
  sport_icon: string;
  sport_active_icon: string;
  level_en: string;
  level_ar: string;
  gender_name: string;
  gender_icon: string;
  venue: string;
  no_of_players: number;
  key1: number;
  key2: number;
  distance: string;
  price: {
    price_per_player: string;
  };
};

export const useGetVenueDetailsList = (venueId: number) => {
  const navigation = useNavigation();
  const setMessage = useMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [venueDetails, setDetails] = useState<venueDetailsDTO>({
    id: 0,
    name: '',
    details: '',
    location: '',
    image: [],
  });
  const [reviewList, setReviewList] = useState<reviewDTO[]>([]);
  const [upcomingBanner, setUpcomingBanner] = useState<upcomingImage[]>([]);
  const [upcomingList, setUpcomingList] = useState<upcomingDTO[]>([]);

  const locale = i18n.language;

  const getVenueDetails = () => {
    Axios.get(ApiEndpoints.venue.details.replace('VENUE_ID', String(venueId)))
      .then((response: any) => {
        if (response.data.status === 'ok') {
          setDetails({
            id: response?.data?.data?.info?.id,
            name:
              locale === 'en'
                ? response?.data?.data?.info?.name_en
                : response?.data?.data?.info?.name_ar,
            details:
              locale === 'en'
                ? response?.data?.data?.info?.details_en
                : response?.data?.data?.info?.details_ar,
            location: response?.data?.data?.info?.location,
            image: response?.data?.data?.info?.image,
          });
          setUpcomingBanner(response?.data?.data?.images);
          setReviewList(response?.data?.data?.reviews);
          setUpcomingList(response?.data?.data?.upcomming);
        }
        setLoading(false);
      })
      .catch((error: any) => {
        setMessage(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getVenueDetails();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    venueDetails,
    reviewList,
    upcomingList,
    upcomingBanner,
    dataLoading: loading,
  };
};
