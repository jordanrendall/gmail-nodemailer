# Gmail - Nodemailer App

## Setup

Login to [Google API Console](https://console.developer.google.com) to:

1. Create new project
2. Enable Gmail API
3. Create OAuth2 Client Credentials
4. Use [Google OAuth2 Playground](https://developers.google.com/oauthplayground) to create refresh token
5. Save Client ID, Client Secret and Refresh Token into the respective .env file parameters

(See [this tutorial](https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1) for help with the above.)

## Message Parameters

`from` : Can include custom coded text with emojis 😃, just be sure to follow the following format: `from` : \`Cool text 😎 \<myemail@gmail.com\>\`

`to` : should be a list of emails separated by commas (or a single email address)

`subject` : Like the `from` parameter, can include emojis 🚀

`text` : No HTML, just plain text (for a fallback)

`html` : Can be any valid HTML code

## `--Use` Parameter

Call node app.js --use \<messageName\> to look in `./local/` for `messageName.js` in order to construct the message.

See `./examples/wedding.js` for help in constructing the email message.

### Enjoy!
