import mongoose, { Schema, models } from 'mongoose'

type LogoDocument = {
  _id: string
  fileName: string
  slug: string
  downloads: number
  tags: string[]
  copies: number
  createdAt: Date
  updatedAt: Date
}

const logoSchema = new Schema<LogoDocument>(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v: any) {
          return /^[a-zA-Z0-9-_]+\.(png|jpg|jpeg|svg|webp|gif)$/.test(v); // Validates file names with specific image extensions
        },
        message: props => `${props.value} is not a valid image file name!`,
      },
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    downloads: {
      type: Number,
      default: 0,
    },
    copies: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

const Logo = models.Logo || mongoose.model<LogoDocument>('Logo', logoSchema)

export default Logo
