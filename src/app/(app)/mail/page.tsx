import ContentWrapper from "@/components/Layout/Container";
import { FormData } from "@/types/form-data";
import { getErrorMessage } from "@/utils/error";
import mailFormSchema from "@/utils/validation/mail-form";
import nodemailer from "nodemailer";
import MailForm from "@/components/Forms/MailForm";

export default async function Page() {
  const sendMail = async (formData: FormData) => {
    'use server'

    try {
      // Validate the data
      mailFormSchema.parse(formData);
  
      // Nodemailer setup
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: formData.email,
        to: process.env.MAIL_RECEIVER_ADDRESS,
        subject: formData.subject,
        text: formData.message,
        html: '',
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
      return { 
        success: true,
        error: null,
      };
    } catch (error) {
      return { 
        success: false, 
        error: getErrorMessage(error) 
      };
    }
  };

  return (
    <ContentWrapper>
      <MailForm sendMail={sendMail} />
    </ContentWrapper>
  )
}
