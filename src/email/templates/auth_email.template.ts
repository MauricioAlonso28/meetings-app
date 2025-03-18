export const signedUpMailTemplate = async () => {
  return `
    <div style="background-color: #f0f0f0; padding: 40px; text-align: center; font-family: Arial, sans-serif;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; font-size: 28px; margin-bottom: 20px;">Welcome to Mundsoh!</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          You have successfully registered. You can now explore the website and enjoy all our features!
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          If you have any questions, feel free to contact us.
        </p>
        <p style="color: #333; font-size: 14px; font-weight: bold; margin-top: 30px;">Best regards,</p>
        <p style="color: #666; font-size: 14px;">The Mundosh Team</p>
      </div>
    </div>
  `;
}

export const signedInMailTemplate = async () => {
  return `
    <div style="background-color: #f0f0f0; padding: 40px; text-align: center; font-family: Arial, sans-serif;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; font-size: 28px; margin-bottom: 20px;">Welcome back to Mundsoh!</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          We're glad to see you again. You’ve successfully signed in and can now continue exploring all that Mundsoh has to offer.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          If you ever need assistance, our support team is here to help.
        </p>
        <p style="color: #333; font-size: 14px; font-weight: bold; margin-top: 30px;">Enjoy your time!</p>
        <p style="color: #666; font-size: 14px;">The Mundsoh Team</p>
      </div>
    </div>
  `
}

export const sendResetPasswordLinkMailTemplate = async (url: string) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <p>Hey,</p>
      <p>We received a request to reset your password.</p>
      <p>Click the link below to set a new password:</p>
      <p><a href="${url}" style="color:rgb(38, 111, 190); text-decoration: none;">Reset your password</a></p>
      <p>This link will expire in 15 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
      <p>Best regards,<br>The Mundsoh Team</p>
    </div>
  `
}

export const updatedPasswordMailTemplate = async (email: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">🔒 Password Successfully Updated</h2>
      <p>Hello,</p>
      <p>We want to inform you that the password for your account <strong>${email}</strong> has been successfully updated.</p>
      <p>If you did not request this change, please <a href="mundsoh0@gmail.com" style="color: #007bff; text-decoration: none;">contact us immediately</a>.</p>
      <p>For your security, we recommend using a strong password and never sharing it with anyone.</p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="text-align: center; color: #777; font-size: 12px;">This is an automated message. Please do not reply.</p>
      <p style="text-align: center; color: #777; font-size: 12px;">&copy; ${new Date().getFullYear()} Mundsoh. All rights reserved.</p>
    </div>
  `
}

export const enabledMailTemplate = async () => {
  return `
    <div class="container">
      <h1>🎉 Your Account is Now Enabled!</h1>
      <p>Dear user,</p>
      <p>We are pleased to inform you that your account has been successfully enabled. You can now access all features and services.</p>
      <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
      <p>Enjoy your experience!</p>
      <div class="footer">
        <p>Best regards,</p>
        <p><strong>Mundsoh Team</strong></p>
      </div>
    </div>
  `
}