'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from "@hookform/resolvers/zod"

import { 
  Form, 
  FormLabel, 
  FormInput, 
  FormField, 
  FormError, 
  Button 
} from '@/components/UI/form'
import { useNotificationStore } from '@/store'
import LogoFormSchema from '@/validators/logo'
import { logoTags } from '@/data/logo-tags'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const createLogoUrl = `${baseUrl}${process.env.NEXT_PUBLIC_LOGO_CREATE}`

function CreateLogoForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {addNotification} = useNotificationStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LogoFormSchema),
    defaultValues: {
      slug: '',
      fileName: '',
      tags: ''
    },
  })

  type FormData = {
    slug: string
    fileName: string
    tags?: string
  }

  const handleUpload = async (data: FormData) => {
    setIsLoading(true);

    const response = await fetch(createLogoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      addNotification('Cool', 'success');
    } else {
      addNotification('Not cool.', 'error');
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto p-2.5 sm:p-6 border rounded-lg mt-10">
      <h1 className="text-xl font-semibold mb-4">Upload Logo</h1>
      <Form onSubmit={handleSubmit(handleUpload)}>
        {/* Slug Field */}
        <FormField htmlFor="slug">
          <FormLabel>Slug</FormLabel>
          <FormInput
            type="text"
            id="slug"
            register={register}
            name="slug"
            errors={errors}
            placeholder="dark-mode-toggle"
          />
          {errors?.slug && (
            <FormError>{errors.slug.message as React.ReactNode}</FormError>
          )}
        </FormField>

        {/* File fileName Field */}
        <FormField htmlFor="fileName">
          <FormLabel>File Name</FormLabel>
          <FormInput
            type="text"
            id="fileName"
            register={register}
            name="fileName"
            errors={errors}
            placeholder="dark_mode_toggle.png"
          />
          {errors?.fileName && (
            <FormError>{errors.fileName.message as React.ReactNode}</FormError>
          )}
        </FormField>

        <ul className="list-disc pl-5 mb-2">
          {logoTags.map((tag) => (
            <li key={tag.slug}>{tag.title} - <strong>{tag.slug}</strong></li>
          ))}
        </ul>

        {/* File fileName Field */}
        <FormField htmlFor="tags">
          <FormLabel>Tags</FormLabel>
          <FormInput
            type="text"
            id="tags"
            register={register}
            name="tags"
            errors={errors}
            placeholder="Tags"
          />
          {errors?.tags && (
            <FormError>{errors.tags.message as React.ReactNode}</FormError>
          )}
        </FormField>

        {/* Submit Button */}
        <Button loading={isLoading} type="submit" disabled={isLoading}>
          Create Logo
        </Button>
      </Form>
    </div>
  )
}

export default CreateLogoForm