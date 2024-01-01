import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Axios} from '../lib/Axios';
import {useMessage} from './useMessage';
import {ApiEndpoints} from '../store/ApiEndpoints';
import i18n from 'i18next';

type aboutUs = {
  name: string;
  description: string;
};

type levels = {
  level_en: string;
  level_ar: string;
};
type termsConditions = {
  name: string;
  description: string;
};
type privacyPolicy = {
  name: string;
  description: string;
};
type genders = {
  id: number;
  icon: string;
  name: string;
  icon_url: string;
  active_icon_url: string;
};

type radius = {
  id: number;
  distance_en: string;
  distance_ar: string;
};

export type banner = {
  id: number;
  sort_order: number;
  image: string;
  image_url: string;
};
export type introBanner = {
  id: number;
  sort_order: number;
  image: string;
  image_url: string;
};

export type sportsDTO = {
  id: number;
  sports_name: string;
  team_one_en: string;
  team_one_ar: string;
  team_two_en: string;
  team_two_ar: string;
  image_url: string;
  image: string;
  icon: string;
  active_icon_url: string;
  yellow_icon_url: string;
  icon_url: string;
};
type faq = {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
};

export const useInit = (withToken = false) => {
  const navigation = useNavigation();
  const setMessage = useMessage();
  const locale = i18n.language;

  const [aboutUsData, setAboutUsData] = useState<aboutUs>({
    name: '',
    description: '',
  });
  const [termsList, setTermsList] = useState<termsConditions>({
    name: '',
    description: '',
  });
  const [privacyPolicy, setPrivacyPolicy] = useState<privacyPolicy>({
    name: '',
    description: '',
  });
  const [faqList, setFaqList] = useState<faq[]>([]);
  const [gender, setGenderList] = useState<genders[]>([]);
  const [walletBalance, setWalletBalance] = useState('');
  const [sportsList, setSportsList] = useState<sportsDTO[]>([]);
  const [radiusList, setRadiusList] = useState<radius[]>([]);
  const [bannerList, setBannerList] = useState<banner[]>([]);
  const [introBannerList, setIntroBannerList] = useState<introBanner[]>([]);
  const [levelList, setLevelList] = useState<levels[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getInitList = () => {
    Axios.get(ApiEndpoints.support.init, {headers: {withToken}})
      .then((response: any) => {
        if (response.data.status === 'success') {
          setSportsList(response.data.data.sports);
          setAboutUsData({
            name: response.data?.data?.cms.about_us?.name,
            description:
              locale === 'en'
                ? response.data?.data.cms.about_us.description_en
                : response.data?.data.cms.about_us.description_ar,
          });
          setTermsList({
            name: response.data?.data?.cms.terms_n_condition?.name,
            description:
              locale === 'en'
                ? response.data?.data.cms.terms_n_condition.description_en
                : response.data?.data.cms.terms_n_condition.description_ar,
          });
          setPrivacyPolicy({
            name: response.data?.data?.cms.privacy_policy?.name,
            description:
              locale === 'en'
                ? response.data?.data.cms.privacy_policy.description_en
                : response.data?.data.cms.privacy_policy.description_ar,
          });
          setFaqList(response.data?.data.cms.faq);
          setGenderList(response.data?.data.genders);
          setRadiusList(response.data?.data.radius);
          setBannerList(response.data?.data.banners);
          setIntroBannerList(response.data?.data.intro_banners);
          setWalletBalance(response.data?.data.wallet_ballance);
          setLevelList(response.data?.data.levels);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        setMessage(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInitList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    aboutUsData,
    levelList,
    termsList,
    privacyPolicy,
    gender,
    walletBalance,
    radiusList,
    bannerList,
    introBannerList,
    sportsList,
    faqList,
    dataLoading: loading,
  };
};
