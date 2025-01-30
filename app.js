const fs = require('fs').promises;
const nodemailer = require('nodemailer');
const config = require('./assets/configs/smtp.js');

(async () => {
  try {
    const conteudo = await fs.readFile('./assets/templates/index.html', 'utf8');
    const emailData = await fs.readFile('./assets/configs/emails.json', 'utf8');
    const { emails } = JSON.parse(emailData);

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailEnviado = await transporter.sendMail({
      subject: 'Assuto do e-mail', //altere para o assunto do e-mail
      from: 'Seu nome <seuemail@gmail.com>', //altere para o seu nome e e-mail
      bcc: emails, //não altere
      html: conteudo, //não altere
    });

    console.warn('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail!');
  }
})();
