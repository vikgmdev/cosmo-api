import mongoose, { DocumentToObjectOptions } from 'mongoose';
import { omit } from 'ramda';
import { RoleModel } from './role.model';
import { GeoLocation } from '../types';

export interface UserLocation {
  country: string;
  countryCode: string;
  city: string;
  cityCode: string;
  location: GeoLocation;
}

export interface UserModel extends mongoose.Document {
  birthDayTime: string;
  birthDayTimeZone: string;
  gender: number; // 1 = male | 2 = female
  placeOfBirth: UserLocation;
  placeOfResidence: UserLocation;
  placeOfResidenceTimeZone: string;
  sign: string;

  // ACCOUNT DATA
  email: string;
  password: string;
  fullname: string;

  // AUTH DATA
  roles: RoleModel[] | string[];
  passwordResetToken: string;
  passwordResetTokenExpiresAt: number;
  emailProofToken: string;
  emailProofTokenExpiresAt: number;
  emailStatus: string;
  emailChangeCandidate: string;
  tosAcceptedByIp: string;
  lastSeenAt: number;
}

const userSchema = new mongoose.Schema(
  {
    // CUSTOM
    birthDayTime: {
      type: 'string',
    },
    birthDayTimeZone: {
      type: 'string',
    },
    gender: {
      type: 'number',
      enum: [1, 2], // 1 = male | 2 = female
    },
    placeOfBirth: {},
    placeOfResidence: {},
    placeOfResidenceTimeZone: {
      type: 'string',
    },
    sign: {
      type: 'string',
    },

    // ACCOUNT DATA
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      maxlength: 120,
    },

    // AUTH DATA
    /**
     * A unique token used to verify the user's identity when recovering a password.
     * Expires after 1 use, or after a set amount of time has elapsed.
     */
    passwordResetToken: {
      type: String,
    },
    /**
     * A JS timestamp (epoch ms) representing the moment when this user's `passwordResetToken`
     * will expire (or 0 if the user currently has no such token).
     */
    passwordResetTokenExpiresAt: {
      type: Number,
    },
    /**
     * A pseudorandom, probabilistically-unique token for use in our account verification emails.
     */
    emailProofToken: {
      type: String,
    },
    /**
     * A JS timestamp (epoch ms) representing the moment when this user's `emailProofToken`
     * will expire (or 0 if the user currently has no such token).
     */
    emailProofTokenExpiresAt: {
      type: Number,
    },
    /**
     * The confirmation status of the user's email address.
     * Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
     * admin users).  When the email verification feature is enabled, new users created via the
     * signup form have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
     * Similarly, when an existing user changes their email address, they switch to the "changeRequested"
     * email status until they click the link in the confirmation email.
     */
    emailStatus: {
      type: String,
      enum: ['unconfirmed', 'changeRequested', 'confirmed'],
      default: 'confirmed',
    },
    /**
     * The (still-unconfirmed) email address that this user wants to change to.
     */
    emailChangeCandidate: {
      type: String,
    },
    /**
     * The IP (ipv4) address of the request that accepted the terms of service.
     * Useful for certain types of businesses and regulatory requirements (KYC, etc.)
     * moreInfoUrl: https://en.wikipedia.org/wiki/Know_your_customer
     */
    tosAcceptedByIp: {
      type: String,
    },
    /**
     * A JS timestamp (epoch ms) representing the moment at which this user most recently
     * interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).
     */
    lastSeenAt: {
      type: Number,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      transform: (_doc, ret): DocumentToObjectOptions => {
        return omit(
          [
            'password',
            'passwordResetToken',
            'passwordResetTokenExpiresAt',
            'emailProofToken',
            'emailProofTokenExpiresAt',
            'emailStatus',
            'emailChangeCandidate',
            'tosAcceptedByIp',
            'lastSeenAt',
          ],
          ret,
        );
      },
      virtuals: true,
    },
  },
);

export const User = mongoose.model<UserModel>('User', userSchema);
