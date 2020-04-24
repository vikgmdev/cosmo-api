import * as passwords from './passwords';
import addressFromRequest from './address-from-request';
import { buildPaginationQuery, stringToRegex } from './query-builder';
import randomString from './random-string';
import renderView from './render-view';
import sendTemplateEmail from './send-template-email';

export default {
  addressFromRequest,
  buildPaginationQuery,
  passwords,
  randomString,
  renderView,
  sendTemplateEmail,
  stringToRegex,
};
