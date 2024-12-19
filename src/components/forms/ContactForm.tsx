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
  FormTextarea, 
  Button 
} from '@/components/UI/form'
import { useNotificationStore } from '@/store'
import ContactFormSchema from '@/validators/contact'

export default function EmailForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {addNotification} = useNotificationStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
  })

  type FormData = {
    name: String
    email: String
    message: String
  }

  const handleRegistration = async (data: FormData) => {
    setIsLoading(true);

    const response = await fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      console.log();
      addNotification('Email sent successfully!', 'success');
    } else {
      addNotification('Error sending email.', 'error');
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto p-2.5 sm:p-6 border rounded-lg mt-10">
      <h1 className="text-xl font-semibold mb-4">Get in Touch 🌟</h1>
      <p className="text-gray-600 mb-6">
        Have questions, feedback, or just want to connect? Reach out to me anytime.  
        You can also find me on{" "}
        <a
          href="https://x.com/scriptpxls"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 font-medium"
        >
          X (ScriptPxls)
        </a>.
      </p>
      <Form onSubmit={handleSubmit(handleRegistration)}>
        <FormField htmlFor="name">
          <FormLabel>Name</FormLabel>
          <FormInput 
            type="text" 
            id="name" 
            register={register} 
            name="name" 
            errors={errors}
            placeholder='Dark Mode Toggle'
          />
          {errors?.name && (
            <FormError>
              {errors.name.message as React.ReactNode}
            </FormError>
          )}
        </FormField>
        <FormField htmlFor="email">
          <FormLabel>Email</FormLabel>
          <FormInput 
            type="email" 
            id="email" 
            register={register} 
            name="email" 
            errors={errors}
            placeholder='Dark Mode Toggle'
          />
          {errors?.email && (
            <FormError>
              {errors.email.message as React.ReactNode}
            </FormError>
          )}
        </FormField>
        <FormField htmlFor="message">
          <FormLabel>Message</FormLabel>
          <FormTextarea
            id="message" 
            register={register} 
            name="message" 
            errors={errors}
            placeholder='Your message'
          />
          {errors.message && (
            <FormError>
              {errors.message.message as React.ReactNode}
            </FormError>
          )}
        </FormField>
        <Button 
          loading={isLoading} 
          type="submit"
          disabled={isLoading}
        >
          Send message
        </Button>
      </Form>
    </div>
  );
}
