export const ApiEndpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    verifyOtp: '/api/auth/verify-otp',
    logout: '/api/auth/logout',
    uniqueCheck: '/api/user-detail-unique-check',
    resendOTP: '/api/auth/resend-otp',
  },
  forgotPassword: {
    forgotPassword: '/api/auth/forgot-password',
    updatePassword: '/api/auth/update-password',
  },
  support: {
    init: '/api/init',
    areas: '/api/get-areas',
    customerSupport: '/api/customer-support',
    getGender: '/api/get-gender',
    selectedSport: '/api/sports/get-selected-sport',
  },
  match: {
    create: '/api/match/create',
    store: '/api/match/store',
    checkout: '/api/match/checkout',
    matchDetails: '/api/match/match-detail',
    slotAvailability: '/api/match/check-slot-availability',
    joinMatchCheckout: '/api/match/joining-checkout',
    joinMatch: '/api/match/match-joining',
    notifyMatch: '/api/match/notify-match',
    joiningDetails: '/api/match/joining-payment-details?match_booking_id=',
    matchFormation: '/api/match/get-formation',
    matchRequest: '/api/invitation/get-match-request?match_id=1',
  },
  user: {
    userSport: '/api/choose-sport',
    changeNumber: '/api/auth/change-number',
    updateProfile: '/api/auth/update-profile',
    getProfile: '/api/auth/profile',
    uploadUserImage: '/api/auth/upload-image',
    follower: '/api/followers',
    following: '/api/following',
    blockList: '/api/block-list',
    follow: '/api/follow',
    unFollow: '/api/unfollow',
    block: '/api/block',
    remove: '/api/remove-follower', // remove Follower
    feedback: '/api/post-feedback',
  },
  venue: {
    // venueList: '/api/venue/get-venue?search=&user_id=USER_ID',
    venueList: '/api/venue/get-venue?search',
    createVenue: '/api/venue/create',
    details: '/api/venue/details?id=VENUE_ID',
  },
  bankDetails: {
    details: '/api/bank-detail/get-bank',
    detailsPost: '/api/bank-detail/create',
  },
  explore: {
    matchListing: '/api/match/listing',
  },
  wallet: {
    getPackages: '/api/wallet/packages',
    transaction: '/api/wallet/transaction',
  },
  booking: {
    getBookingList: '/api/match/booking-list',
    getBookingDetails: '/api/match/booking-payment-details',
    getLiveScore: '/api/match/get-live-score',
    updateLiveScore: '/api/match/live-score-submit',
  },
  home: {
    live: '/api/match/live-score-home',
    wish: '/api/invitation/get-do-you-wish-to-join',
  },
  invitation: {
    invite: '/api/invitation/invitees',
    sendMatchInvitation: '/api/invitation/send-match-invitation',
    getMatchRequest: '/api/invitation/get-match-request',
    updateMatchRequest: '/api/invitation/update-match-request',
    getPaymentDetail: '/api/match/get-payment-details',
  },
  liveScore: {
    getLiveScore: '/api/match/get-live-score',
    updateLiveScore: '/api/match/live-score-submit',
  },
  notification: {
    notification: '/api/notifications',
  },
  statistics: {
    statistics: '/api/match/get-statistics',
  },
  matchReview: {
    matchReview: '/api/match/get-match-review',
    updateMatchReview: '/api/match/submit-match-review',
  },
  playerInfo: {
    playerSport: '/api/match/get-match-review',
    availableDay: '/api/match/get-match-review',
    position: '/api/match/get-match-review',
  },
  invoice: {
    getInvoiceList: '/api/wallet/invoice-list',
  },
  topUp: {
    topUp: '/api/wallet/wallet-transaction-list',
    getPackages: '/api/wallet/packages',
    updatePayment: '/api/wallet/purchase',
  },
  comments: {
    getComments: '/api/match/get-comments',
    postComments: '/api/match/save-comment',
  },
  cancelBooking: {
    cancelBooking: '/api/match/cancel-user-booking',
  },
  coupon: {coupon: '/api/invitation/invitees'},
  requestBackend: {requestBackend: '/api/match/notify-match-slot-request'},
};
