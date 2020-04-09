const customConfig = {
  /**************************************************************************
   *                                                                         *
   * Automated email configuration                                           *
   *                                                                         *
   * Sandbox Mailgun credentials for use during development, as well as any  *
   * other default settings related to "how" and "where" automated emails    *
   * are sent.                                                               *
   *                                                                         *
   * (https://app.mailgun.com/app/domains)                                   *
   *                                                                         *
   **************************************************************************/
  mailgunDomain: 'mg.mayabmoot.com',
  mailgunSecret: 'aacaba102227f72e62766e22b31c3e77-0a4b0c40-25a5f459',

  // The sender that all outgoing emails will appear to come from.
  supportEmail: 'tortugadescalza@taotechia.org',
  baseUrl: 'http://tortugadescalza.com',
  frontUrl: 'http://tortugadescalza.com',
};

export default customConfig;
