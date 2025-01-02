import * as z from "zod"

const LogoFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-_]+$/, {
      message: "Slug must be URL-safe (only lowercase letters, numbers, hyphens, and underscores).",
    })
    .min(2, { message: "Slug must be at least 3 characters long." })
    .max(100, { message: "Slug must be at most 100 characters long." }),
  fileName: z
    .string()
    .trim()
    .regex(/\.(png|jpg|jpeg|svg|webp|gif)$/, {
      message: "Slug must point to an image with a valid extension (png, jpg, jpeg, svg, webp, gif).",
    })
    .min(2, { message: "File names must be at least 10 characters long." })
    .max(300, { message: "File names must be at most 300 characters long." }),
  tags: z
  .string()
  .trim()
  .refine((val) => {
    // Split the tags by commas and check if each tag is valid (alphanumeric or hyphen/underscore)
    const tags = val.split(",").map(tag => tag.trim());
    return tags.every(tag => /^[a-z0-9-_]+$/.test(tag) && tag.length > 1 && tag.length <= 100);
  }, {
    message: "Each tag must be URL-safe (lowercase, numbers, hyphens, underscores) and between 2 to 100 characters long.",
  })
  .optional(), // Tags field is optional
})

export default LogoFormSchema