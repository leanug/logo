import { NextResponse } from 'next/server'

import mongoose from 'mongoose'

import Logo from '@/models/logo'
import { connectDB } from '@/utils/connectDB'
import { sanitizeString } from '@/utils/sanitize-string'

type Params = {
  id: string
  action: string
}

/**
 * Update a post and increment its like count.
 *
 * @param {Request} req - The request object.
 * @param {Params} params - The route parameters.
 * @returns {Promise<Response>} The response object.
 */
export async function PATCH(req: Request, { params }: { params: Params }) {
  if (req.method !== 'PATCH') {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    )
  }

  const { id, action } = params

  // Validate post ID
  if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid post ID.' }, 
      { status: 400 }
    )
  }

  const safeAction = sanitizeString(action)
  
  // Determine the update based on the action
  const update = safeAction === 'downloads'
  ? { $inc: { downloads: 1 } }
  : safeAction === 'copies'
    ? { $inc: { copies: 1 } }
    : null;

  if (!update) {
    return NextResponse.json(
      { message: 'Invalid action. Use "downloads" or "copies".' },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Increment the like count of the post
    const updatedLogo = await Logo.findByIdAndUpdate(
      id,
      update,
      { new: true }
    )

    if (!updatedLogo) {
      return NextResponse.json(
        { message: 'Logo not found.' }, 
        { status: 404 }
      )
    }

    // Return a success response with the updated post
    return NextResponse.json(
      {
        success: true,
        logo: updatedLogo,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    if (process.env.NEXT_PUBLIC_IS_DEV) console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
