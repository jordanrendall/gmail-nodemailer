//Allow for environment variable import
require('dotenv').config();

//Required dependencies
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

//OAuth2 parameters
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;
const refreshToken = process.env.REFRESH_TOKEN;

const args = require('minimist')(process.argv.slice(2));

if (!args.use) {
  return console.log('No --use parameter given');
}

const [
  constructEmails,
  emailFancyFrom,
  emailSubject,
  emailPlainText,
] = require(`./local/${args.use}/${args.use}`);

const fakeContact1 = {
  firstName: 'Jordan',
  lastName: 'Rendall',
  email: process.env.FAKE_CONTACT_EMAIL1,
  token: 'arslkdfi3290mm55',
};

const fakeContact2 = {
  firstName: 'Britney',
  lastName: 'Avery',
  email: process.env.FAKE_CONTACT_EMAIL2,
  token: 'ioupqijwer8271',
};

const fakeEmailList = [fakeContact1, fakeContact2];

let constructedEmails = constructEmails(fakeEmailList);

//Create OAuth2 client
const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

//Set OAuth2 refresh token
oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

//Create SMTP mailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    clientId,
    clientSecret,
    refreshToken,
  },
});

// //Create message object based on custom email parameters
function createNodeMailerMessage(fancyFrom, to, subject, text, html) {
  return {
    from: `${fancyFrom} <${process.env.SENDER_EMAIL}>`,
    to,
    subject,
    text,
    html,
  };
}

function sendAllMail(emails) {
  emails.map(email => {
    transporter.sendMail(
      createNodeMailerMessage(
        emailFancyFrom,
        email.email,
        emailSubject,
        emailPlainText,
        email.emailContent
      ),
      (error, response) => {
        if (error) return;
        console.log(response);
        transporter.close();
      }
    );
  });
}

sendAllMail(constructedEmails);
