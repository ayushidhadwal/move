import React, {FC} from 'react';
import {Box, FlatList} from 'native-base';
import {useTranslation} from 'react-i18next';

import {RootStackScreenProps} from '../../../navigation/types';
import {AppLayout} from '../../../component/common/AppLayout';
import {Header} from '../../../component/common/Header';
import {InvitationItem} from '../../../data/InvitationList';
import {InvitationCard} from './components/InvitationCard';

import {Loader} from '../../../component/common/Loader';
import {useGetInviteList} from '../../../hooks/invitation/useGetInvite';

type Props = RootStackScreenProps<'Invitation'>;

export const InvitationScreen: FC<Props> = ({navigation}) => {
  const {InvitationList, inviteLoading, updateWishStatus} = useGetInviteList();
  // console.log(InvitationList);

  const {t} = useTranslation();
  const renderItem = ({item, index}: {item: InvitationItem; index: number}) => (
    <InvitationCard
      index={index}
      id={item.id}
      guestName={item.name}
      img={{uri: item.image}}
      updateWishStatus={updateWishStatus}
      onPressHandler={() =>
        navigation.navigate('PlayerProfile', {userId: item.id})
      }
    />
  );

  return (
    <AppLayout>
      <Header heading={String(t('Invitations'))} />
      {inviteLoading ? (
        <Loader />
      ) : (
        <Box flex={1}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={InvitationList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </Box>
      )}
    </AppLayout>
  );
};
