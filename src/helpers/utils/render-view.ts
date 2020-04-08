import ejs from 'ejs';
import url from 'url';
import { Config } from '../../config';
import { logger } from '../../core';

export default async function renderView(template: string, data: any, layout: string) {
  try {
    // Render the template view to generate the body of the view
    const emailHtml = await ejs.renderFile(__dirname + `/../../../views/${template}.ejs`, {
      ...data,
      url,
      config: Config,
    });

    // Render the layout view injecting the body previously generated
    const layoutHtml = await ejs.renderFile(__dirname + `/../../../views/layouts/layout-email.ejs`, {
      body: emailHtml,
      fromEmailAddress: Config.email.fromEmailAddress,
      supportEmail: Config.custom.supportEmail,
      url,
      config: Config,
    });
    return layoutHtml;
  } catch (err) {
    logger.error(`Error when trying to render the HTML view: ${err.message}`);
    throw err;
  }
}
