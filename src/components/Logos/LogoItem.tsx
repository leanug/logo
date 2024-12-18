'use client'

import Image from "next/image"

import { FaDownload, FaCircleInfo } from "react-icons/fa6"

import LogoActionBtn from "@/components/ui/buttons/LogoActionBtn"
import { useLogoInfoModal } from "@/hooks/use-logo-info-modal"
import { useDownloadLogo } from '@/hooks/use-download-logo'
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
  const {copySvgFromFile} = useCopyLogo({fileName, id, tag})
  const {downloadSvg} = useDownloadLogo({fileName, id, tag})
  const {openLogoInfoModal} = useLogoInfoModal({ 
    id,
    copies, 
    downloads,
    fileName,
    updatedAt,
    tags
  })

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
            onClick={openLogoInfoModal}
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