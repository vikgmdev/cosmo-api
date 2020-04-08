const emailConfig = {
  host: 'smtp.hostinger.mx',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'tortugadescalza@taotechia.org', // generated ethereal user
    pass: 'yZN6F!gq', // generated ethereal password
  },
  fromEmail: '"Tortuga Descalza 👻" <tortugadescalza@taotechia.org>',
  fromEmailAddress: 'tortugadescalza@taotechia.org'
};

export default emailConfig;
