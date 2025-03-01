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