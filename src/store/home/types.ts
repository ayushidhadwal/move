export type getMatchPayload = {
  search?: string;
  newDate?: string;
  sports?: string;
  radius?: string;
  gender?: string;
  level?: string;
  isPaginate?: string;
};
export type exploreDTO = {
  match_id: number;
  host_name: string;
  host_id: number;
  host_image: string;
  date: string;
  start_time: string;
  sport_name: string;
  sport_icon: string;
  sport_image: string;
  level_en: string;
  level_ar: string;
  gender_name: string;
  gender_icon: string;
  venue: string;
  no_of_players: number;
  key1: number;
  key2: number;
  formation_icon: string;
  distance: string;
  sport_active_icon: string;
  price: {
    price_per_player: number;
  };
};
