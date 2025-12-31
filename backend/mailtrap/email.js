import {
  GOOD_BYE_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Verification Emails",
    });
    console.log("Verification email sent", { response });
  } catch (error) {
    console.log("Error: ", { error: error.message });
    throw new Error("Error sending verification email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "e0ae41fe-b559-423f-b412-3bc48f717c49",
      template_variables: {
        company_info_name: "Authentication",
        name: name,
      },
    });
    console.log("Welcome email sent", { response });
  } catch (error) {
    console.log("Error: ", { error: error.message });
    throw new Error("Error sending welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Forgot your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password reset",
    });
    console.log("Password reset email sent", { response });
  } catch (error) {
    console.log("Error: ", { error: error.message });
    throw new Error("Error sending password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset", { response });
  } catch (error) {
    console.log("Error: ", { error: error.message });
    throw new Error("Error sending password reset email");
  }
};

export const sendGoodbyeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "We're sorry to see you go",
      html: GOOD_BYE_EMAIL_TEMPLATE.replace("{username}", name),
    });
    console.log("Goodbye email sent", { response });
  } catch (error) {
    console.log("Error: ", { error: error.message });
    throw new Error("Error sending goodbye email");
  }
};
