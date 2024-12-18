import { NextResponse } from "next/server"

import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return Response.json(
      { success: false, message: "Method Not Allowed" }, 
      { status: 405 }
    )
  }

  const data = await req.json()
  const { email, message, name } = data

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use an App Password for better security
      },
    })

    const mailOptions = {
      from: email,
      to: '2011.yoda@gmail.com', // Send to yourself for testing
      subject: `New message from ${name}`,
      text: message,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true,
      message: 'Message sent', 
    }, { 
      status: 200 
    })
  } catch(error) {
    if (process.env.IS_DEV) console.error(error);
    return NextResponse.json({ 
      success: false,
      message: 'Error sending email', 
    }, { 
      status: 400 
    })
  }
}