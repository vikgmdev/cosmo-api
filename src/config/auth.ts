const authConfig = {
  /**************************************************************************
   *                                                                         *
   * The TTL (time-to-live) for various sorts of tokens before they expire.  *
   *                                                                         *
   **************************************************************************/
  passwordResetTokenTTL: 24 * 60 * 60 * 1000, // 24 hours
  emailProofTokenTTL: 24 * 60 * 60 * 1000, // 24 hours

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  verifyEmailAddresses: false,
};

export default authConfig;
