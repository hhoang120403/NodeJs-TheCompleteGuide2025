const { MailtrapClient } = require('mailtrap');

const TOKEN = 'e01e062b5b72b969122ca1ce94fbfac1';

exports.sender = {
  email: 'hello@demomailtrap.co',
  name: 'Mailtrap Test',
};

exports.client = new MailtrapClient({
  token: TOKEN,
});
