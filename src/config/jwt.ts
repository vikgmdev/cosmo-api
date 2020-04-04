const jwtConfig = {
  // CHANGE THIS SECRET
  secret: 'fcq3tgefwv4tyw4gw4y46yvrg',
  expiry: {
    unit: 'days',
    length: '7',
    rememberMeMaxLength: '30',
  },
  audience: 'app name',
  subject: 'subject',

  // tracks jwt usage if set to true
  trackUsage: true,

  // if set to false will authenticate the
  // express session object and attach the
  // user to it during the hasJsonWebToken
  // middleware
  stateless: false,

  // set the name of the jwt token property
  // in the JSON response
  tokenProperty: 'token',

  // set the name of the expires property
  // in the JSON response
  expiresProperty: 'expires',
};

export default jwtConfig;
