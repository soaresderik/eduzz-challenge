import nodemailer from "nodemailer";
import mailConfig from "../configs/mail.configs";

export default nodemailer.createTransport(mailConfig);
