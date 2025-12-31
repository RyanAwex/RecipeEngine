import { MailtrapClient } from "mailtrap";

export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@rayanesefiani.com",
  name: "Awex's Team",
};
