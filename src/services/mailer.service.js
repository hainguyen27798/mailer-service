import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

const SES = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export class MailerService {
  static send = async (call, callback) => {
    const { send_to, subject, text, html } = call.request;

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: send_to,
      },
      Message: {
        Body: {
          [html ? 'Html' : 'Text']: {
            Charset: 'UTF-8',
            Data: html || text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: process.env.AWS_SES_SENDER_EMAIL,
    });

    try {
      const response = await SES.send(command);
      console.log('Email sent:', response);
      callback(null, { status_code: 200, message: 'Email sent successfully' });
    } catch (err) {
      console.error('Error sending email:', err);
      callback(null, { status_code: 500, message: 'Error sending email' });
    }
  };
}
