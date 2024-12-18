'use client'

import Image from "next/image"

import { FaDownload, FaCopy, FaCircleInfo } from "react-icons/fa6"
import { useQueryClient } from '@tanstack/react-query'

import LogoActionBtn from "@/components/ui/buttons/LogoActionBtn"
import { useModalStore } from "@/store"
import { updateLogo } from '@/server/update-logo'
import { useCopyLogo } from "@/hooks/use-copy-logo"

type LogoItemProps = {
  id: string
  copies: number 
  downloads: number 
  fileName: string
  tags: string[]
  tag: string
  updatedAt: string
}

function LogoItem({
  id,
  copies,
  downloads,
  fileName,
  tags,
  tag,
  updatedAt
}: LogoItemProps) {
  const {setOpenModal, setModalData} = useModalStore()
  const {copySvgFromFile} = useCopyLogo({fileName, id, tag})
  const queryClient = useQueryClient()
  
  /* Download Logo */
  const downloadSvg = async (e: any) => {
    e.stopPropagation()
    const svgUrl = `/${fileName}`
  
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

  const openModal = (e: any) => {
    e.stopPropagation()
    const modalData = { 
      id,
      copies, 
      downloads,
      fileName,
      updatedAt,
      tags
    }
    setModalData(modalData)
    setOpenModal('modal')
  }

  return (
    <div className="w-full inline">
      <div 
        data-tip="Click to Copy SVG"
        onClick={copySvgFromFile}
        className="
          tooltip p-6 w-full aspect-[4/3] bg-gray-50 border border-transparent 
          hover:bg-white hover:border-slate-100 rounded-lg 
          flex items-center justify-center cursor-pointer relative group transition"
      >
        <Image
          alt="icon"
          src={`/logos/${fileName}`}
          width={32}
          height={32}
          className="w-20"
        />
        <div className="absolute top-2.5 right-2.5 flex gap-1.5 z-10">
          <LogoActionBtn
            tooltip="Open Info"
            icon={<FaCircleInfo size={16} />}
            onClick={openModal}
          />
          <LogoActionBtn
            tooltip="Download SVG"
            icon={<FaDownload size={16} />}
            onClick={downloadSvg}
          />
        </div>
      </div>
    </div>
  )
}

export default LogoItem