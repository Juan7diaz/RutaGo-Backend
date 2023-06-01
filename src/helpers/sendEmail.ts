import nodemailer from 'nodemailer'
import { getBodyMail } from './getBodyMail';
import util from 'util';

export const sendEmail = async (email:string, username:string, newPassword:string):Promise<boolean> => {
  const message = {
    from: process.env.GOOGLE_EMAIL_ADDRESS,
    to: email,
    subject: `🔥 ${username} tu nueva contraseña está lista 🔥`,
    html: getBodyMail(username, newPassword)
  };

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GOOGLE_EMAIL_ADDRESS,
        pass: process.env.GOOGLE_EMAIL_PASSWORD
      }
    });

    const sendMailAsync = util.promisify(transporter.sendMail).bind(transporter);
    await sendMailAsync(message);

    return true;
  } catch (error) {
    return false;
  }
};
