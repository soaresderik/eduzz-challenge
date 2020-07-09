import mail from "../shared/mail.shared";

interface MailInfo {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export default {
  key: "mail",
  async handle(data: MailInfo) {
    await mail.sendMail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  },
  options: {
    attempts: 2,
    backoff: 1000 * 10, // dez segundos
  },
};
