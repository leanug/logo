import { NextResponse } from 'next/server'

import Logo from '@/models/logo'
import { connectDB } from '@/utils/connectDB'
import { isValidSlug } from '@/utils'

type Params = {
  tag: string
}

export async function GET(req: Request, {params}: {params: Params}) {
  if (req.method !== 'GET') {
    return Response.json({ message: "Method Not Allowed" }, { status: 405 })
  }

  const {tag} = params

  // Basic validation for 'tag' using regex
  if (tag && !/^[a-zA-Z0-9-]+$/.test(tag)) {
    return NextResponse.json({ message: "Invalid tag format" }, { status: 400 });
  }
  
  try {
    // Connect to MongoDB
    await connectDB()

    // Fetch projects related to the userId
    const logos = await Logo.find({ where: { tags: { has: tag } } })
    
    // Return a success response with the newly created user
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