import { NextResponse } from 'next/server'

import Logo from '@/models/logo'
import { connectDB } from '@/utils/connectDB'

export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return Response.json({ message: "Method Not Allowed" }, { status: 405 })
  }

  try {
    // Connect to MongoDB
    await connectDB()
    
    const logos = await Logo.find()
    
    return NextResponse.json({ 
      success: true,
      logos
    }, { 
      status: 200 
    })
  } catch (error) {
    if (process.env.IS_DEV) console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong on our end. Please try again later.' }, 
      { status: 500 }
    )
  }
}