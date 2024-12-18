'use client'

import { useQueryClient } from '@tanstack/react-query'

import { useNotificationStore } from "@/store"
import { updateLogo } from '@/server/update-logo'

type UseCopyLogoProps = {
  fileName: string
  id: string 
  tag: string
}

export const useCopyLogo = ({ 
  fileName, id, tag 
}: UseCopyLogoProps) => {
  const {addNotification} = useNotificationStore()
  const queryClient = useQueryClient()

  const copySvgFromFile = async (e: any) => {
    e.stopPropagation()

    try {
      // Fetch the SVG content
      const response = await fetch(`/logos/${fileName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch SVG file.")
      }
  
      const svgContent = await response.text();
  
      // Copy to clipboard
      await navigator.clipboard.writeText(svgContent);
      addNotification('SVG copied to clipboard!', 'success')
      const updatedLogo = await updateLogo({
        id, 
        action: 'copies'
      })

      if (updatedLogo) {
        // Invalidate or update the cache for the relevant query
        queryClient.invalidateQueries({ queryKey: ['logos', tag] })
      }
    } catch (error) {
      console.error("Error copying SVG:", error);
      addNotification('Error copying SVG', 'error')
    }
  }

  return {
    copySvgFromFile,
  }
}
