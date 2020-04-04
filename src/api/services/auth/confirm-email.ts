import { Request } from 'express';
import { User } from '../../models';

export const confirmEmail = async (token: string, req: Request): Promise<any> => {
  // If no token was provided, this is automatically invalid.
  if (!token) {
    throw 'invalidOrExpiredToken';
  }

  // Get the user with the matching email token.
  var user = await User.findOne({ emailProofToken: token });

  // If no such user exists, or their token is expired, bail.
  if (!user || user.emailProofTokenExpiresAt <= Date.now()) {
    throw 'invalidOrExpiredToken';
  }

  if (user.emailStatus === 'unconfirmed') {
    //  ┌─┐┌─┐┌┐┌┌─┐┬┬─┐┌┬┐┬┌┐┌┌─┐  ╔═╗╦╦═╗╔═╗╔╦╗ ╔╦╗╦╔╦╗╔═╗  ╦ ╦╔═╗╔═╗╦═╗  ┌─┐┌┬┐┌─┐┬┬
    //  │  │ ││││├┤ │├┬┘││││││││ ┬  ╠╣ ║╠╦╝╚═╗ ║───║ ║║║║║╣   ║ ║╚═╗║╣ ╠╦╝  ├┤ │││├─┤││
    //  └─┘└─┘┘└┘└  ┴┴└─┴ ┴┴┘└┘└─┘  ╚  ╩╩╚═╚═╝ ╩   ╩ ╩╩ ╩╚═╝  ╚═╝╚═╝╚═╝╩╚═  └─┘┴ ┴┴ ┴┴┴─┘
    // If this is a new user confirming their email for the first time,
    // then just update the state of their user record in the database,
    // store their user id in the session (just in case they aren't logged
    // in already), and then redirect them to the "email confirmed" page.
    await User.findByIdAndUpdate(user.id, {
      emailStatus: 'confirmed',
      emailProofToken: '',
      emailProofTokenExpiresAt: 0,
    });
    req.me.id = user.id;

    return { message: 'The email was successfully confirmed.' };
  } else if (user.emailStatus === 'changeRequested') {
    //  ┌─┐┌─┐┌┐┌┌─┐┬┬─┐┌┬┐┬┌┐┌┌─┐  ╔═╗╦ ╦╔═╗╔╗╔╔═╗╔═╗╔╦╗  ┌─┐┌┬┐┌─┐┬┬
    //  │  │ ││││├┤ │├┬┘││││││││ ┬  ║  ╠═╣╠═╣║║║║ ╦║╣  ║║  ├┤ │││├─┤││
    //  └─┘└─┘┘└┘└  ┴┴└─┴ ┴┴┘└┘└─┘  ╚═╝╩ ╩╩ ╩╝╚╝╚═╝╚═╝═╩╝  └─┘┴ ┴┴ ┴┴┴─┘
    if (!user.emailChangeCandidate) {
      throw new Error(
        `Consistency violation: Could not update Stripe customer because this user record's emailChangeCandidate ("${user.emailChangeCandidate}") is missing.  (This should never happen.)`,
      );
    }

    // Last line of defense: since email change candidates are not protected
    // by a uniqueness constraint in the database, it's important that we make
    // sure no one else managed to grab this email in the mean time since we
    // last checked its availability. (This is a relatively rare edge case--
    // see exit description.)
    if ((await User.count({ email: user.emailChangeCandidate })) > 0) {
      throw 'emailNoLongerAvailable';
    }

    // Finally update the user in the database, store their id in the session
    // (just in case they aren't logged in already), then redirect them to
    // their "my account" page so they can see their updated email address.
    await User.findByIdAndUpdate(user.id, {
      emailStatus: 'confirmed',
      emailProofToken: '',
      emailProofTokenExpiresAt: 0,
      email: user.emailChangeCandidate,
      emailChangeCandidate: '',
    });
    req.me.id = user.id;
    return { message: 'The email was successfully confirmed.' };
  } else {
    throw new Error(
      `Consistency violation: User ${user.id} has an email proof token, but somehow also has an emailStatus of "${user.emailStatus}"!  (This should never happen.)`,
    );
  }
};
