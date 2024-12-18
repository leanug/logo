import { Logo } from "@/types/logo"

type UpdateLogoParams = {
  id: string;
  action: string;
};

export async function updateLogo({ id, action }: UpdateLogoParams): Promise<Logo | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const endpoint = process.env.NEXT_PUBLIC_UPDATE_LOGO
  const url = `${baseUrl}${endpoint}/${id}/${action}`
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    });

    if (!response.ok) {
      console.error(`Error`);
      return null;
    }

    const result = await response.json()
    
    return result?.logo || null;
  } catch (error) {
    console.error('Failed to update logo', error)
    return null;
  }
}