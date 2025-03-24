export const enabledVisibilityMailTemplate = async (email: string, completedName: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">🎉 Your Profile is Now Public!</h2>
      <p>Hello <strong>${completedName}</strong>,</p>
      <p>We are excited to inform you that your profile is now public, and you can start offering your services to potential clients.</p>
      <p>People can now easily find and contact you for your services.</p>
      <p>If you have any questions or need assistance, feel free to <a href="${email}" style="color: #007bff; text-decoration: none;">reach out to us</a>.</p>
      <p>We wish you great success!</p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="text-align: center; color: #777; font-size: 12px;">This is an automated message. Please do not reply.</p>
      <p style="text-align: center; color: #777; font-size: 12px;">&copy; ${new Date().getFullYear()} The Mundsoh team. All rights reserved.</p>
    </div>
  `
} 