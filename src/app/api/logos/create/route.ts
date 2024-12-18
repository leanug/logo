import { NextResponse } from "next/server"

import Logo from "@/models/logo"
import { connectDB } from '@/utils/connectDB'
import LogoFormSchema from '@/validators/logo'
import { auth } from "@/auth"

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return Response.json(
      { message: "Method Not Allowed" }, 
      { status: 405 }
    )
  }

  const data = await req.json()
  const {slug, fileName, tags} = data

  //const session = await auth()

  // Check if user is authenticated
  /* if (!session) {
    return NextResponse.json(
      { message: 'User not authenticated. Please log in to continue.' }, 
      { status: 401 }
    )
  } */

  const validatedLogoInputData = LogoFormSchema.safeParse({ slug, fileName, tags })

  if (!validatedLogoInputData.success) {
    // Return validation errors if any
    const errors = validatedLogoInputData.error.format();
    if (process.env.NEXT_PUBLIC_IS_DEV) console.error('Validation errors', errors);
    return NextResponse.json(
      { message: 'Validation errors', errors },
      { status: 400 }
    )
  }
  
  try {
    // Connect to MongoDB
    await connectDB()

    const tagsArray = tags
      .split(',')
      .map((tag: string) => tag.trim()) // Trim whitespace around each tag
      .filter((tag: string) => tag.length > 0); // Remove empty tags, if any

    // Create a new user in the database
    const newLogo = await Logo.create({slug, fileName, tags: tagsArray})
    // Return a success response with the newly created board
    return NextResponse.json({
      sucess: true,
      logo: newLogo
    }, {
      status: 201
    })
  } catch (error) {
    if (process.env.NEXT_PUBLIC_IS_DEV) console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}