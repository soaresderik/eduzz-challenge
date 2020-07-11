import mail from "../shared/mail.shared";

export default {
  key: "mail",
  async handle({ data }) {
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
