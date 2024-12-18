import { useQueryClient } from '@tanstack/react-query'

import { updateLogo } from '@/server/update-logo'

type UseDownloadLogoProps = {
  fileName: string
  id: string
  tag: string
}

export function useDownloadLogo({
  fileName, 
  id, 
  tag
}: UseDownloadLogoProps) {
  const queryClient = useQueryClient()

  /* Download Logo */
  const downloadSvg = async (e: any) => {
    e.stopPropagation()
    const svgUrl = `/logos/${fileName}`
  
    // Create a temporary <a> element to initiate download
    const link = document.createElement("a")
    link.href = svgUrl;
    link.download = fileName // File name for the download
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)

    const updatedLogo = await updateLogo({
      id, 
      action: 'downloads'
    })

    if (updatedLogo) {
      // Invalidate or update the cache for the relevant query
      queryClient.invalidateQueries({ queryKey: ['logos', tag] })
    }
  }

  return {downloadSvg}
}