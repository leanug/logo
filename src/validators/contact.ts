import * as z from "zod"

const ContactFormSchema = z.object({
  name: z
  .string()
  .min(3, {
    message: "Name must be at least 3 characters.",
  })
  .max(200, {
    message: "Name must be at most 200 characters.",
  }),
  email: z
  .string()
  .email("Invalid email address")
  .min(3, {
    message: "Name must be at least 3 characters.",
  })
  .max(200, {
    message: "Name must be at most 200 characters.",
  }),
  message: z
    .string()
    .max(2000, {
      message: "Description must be at most 2000 characters.",
    }),
})

export default ContactFormSchema