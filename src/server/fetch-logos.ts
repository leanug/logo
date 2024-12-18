import { Logo } from "@/types/logo"

export async function fetchLogos(tag: string): Promise<Logo[] | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const endpoint = tag 
    ? `${process.env.NEXT_PUBLIC_LOGO_GET}/tag/${tag}` 
    : process.env.NEXT_PUBLIC_LOGO_GET 
  const url = `${baseUrl}${endpoint}`
  
  const response = await fetch(url, {cache: 'no-store'})
  
  if (!response.ok) {
    console.error(`Error`);
    return null 
  }

  const result = await response.json()
  
  if (result && result.logos)
    return result.logos

  return null
}