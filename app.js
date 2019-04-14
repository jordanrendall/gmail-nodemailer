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

const {
  emailFancyFrom,
  emailList,
  emailSubject,
  emailPlainText,
  emailHTML,
} = require(`./local/${args.use}`);

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

//Create message object based on custom email parameters
const message = {
  from: `${emailFancyFrom} <${process.env.SENDER_EMAIL}>`,
  to: emailList,
  subject: emailSubject,
  text: emailPlainText,
  html: emailHTML,
};

//Send the message to the email list
transporter.sendMail(message, (error, response) => {
  if (error) {
    return;
  }
  console.log(response);
  transporter.close();
});
