const pug = require('pug');
const juice = require('juice');

const createTemplatedEmail = pug.compileFile(__dirname + '/wedding.pug');

//Code up fancy email
const emailFancyFrom = `From us! ❤️`;
const emailSubject = `Our Wedding 💍`;
const emailPlainText = `RSVP to our wedding!`;

function makeRSVP(guest) {
  let html = juice(
    createTemplatedEmail({
      title: '💍 Wedding RSVP',
      firstName: guest.firstName,
      token: guest.token,
    })
  );

  let finalEmailContent = `${html}`;

  return {
    emailContent: finalEmailContent,
    email: guest.email,
    firstName: guest.firstName,
    lastName: guest.lastName,
  };
}

function constructEmails(guestList) {
  const rsvps = guestList.map(guest => makeRSVP(guest));
  return rsvps;
}

module.exports = [
  constructEmails,
  emailSubject,
  emailFancyFrom,
  emailPlainText,
];
