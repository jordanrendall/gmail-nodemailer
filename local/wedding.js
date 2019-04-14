//Code up fancy email
const emailFancyFrom = `The Bride and Groom ❤️`;
let emailList = [`x@gmail.com`];
const emailSubject = `Our Wedding 💍 2020`;
const emailPlainText = `Please RSVP to our Wedding!`;
const emailHTML = `
<h1>💍 Wedding RSVP</h1>
<p>Hello ${emailList[0]}!</p>
`;

exports.emailFancyFrom = emailFancyFrom;
exports.emailList = emailList;
exports.emailSubject = emailSubject;
exports.emailPlainText = emailPlainText;
exports.emailHTML = emailHTML;
