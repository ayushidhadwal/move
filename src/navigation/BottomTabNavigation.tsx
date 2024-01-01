import React from 'react';
import {Image} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeScreen} from '../screen/home/HomeScreen';
import {ExploreScreen} from '../screen/explore';
import {ProfileScreen} from '../screen/profile';
import {VenuesScreen} from '../screen/venues/venues';
import {BookingTopTabNavigation} from '../component/navigation/BookingTopTabNavigation';

import {BottomTabsParamList} from './types';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

function BottomTabNavigation() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#0F1F38'},
        tabBarActiveTintColor: '#8acaff',
        tabBarInactiveTintColor: '#8acaff',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: String(t('Home')),
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/activeIcons/homeActive.png')
                  : require('../assets/inActiveIcons/home.png')
              }
              width={5}
              height={5}
              alt={'no img'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Venues"
        component={VenuesScreen}
        options={{
          tabBarLabel: String(t('Venues')),

          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/activeIcons/venuesActive.png')
                  : require('../assets/inActiveIcons/venues.png')
              }
              width={5}
              height={5}
              alt={'no img'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: String(t('Explore')),

          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/activeIcons/exploreActive.png')
                  : require('../assets/inActiveIcons/explore.png')
              }
              width={5}
              height={5}
              alt={'no img'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookingTopTab"
        component={BookingTopTabNavigation}
        options={{
          tabBarLabel: String(t('Bookings')),
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/activeIcons/bookingsActive.png')
                  : require('../assets/inActiveIcons/bookings.png')
              }
              width={5}
              height={5}
              alt={'no img'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: String(t('Profile')),
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/activeIcons/profileActive.png')
                  : require('../assets/inActiveIcons/profile.png')
              }
              width={5}
              height={5}
              alt={'no img'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
