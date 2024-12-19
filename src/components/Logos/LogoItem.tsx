'use client'

import Image from "next/image"

import { FaDownload, FaCircleInfo } from "react-icons/fa6"

import LogoActionBtn from "@/components/UI/Buttons/LogoActionBtn"
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
  updatedAt: Date
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
    tags,
    tag
  })

  return (
    <div 
      data-tip="Click to Copy SVG"
      onClick={copySvgFromFile}
      className="
        tooltip w-full py-5 sm:py-8 md:py-0 md:aspect-[1/1] border shadow-sm cursor-pointer relative
        rounded-lg flex items-center justify-center group transition"
    >
      <Image
        alt="icon"
        src={`/logos/${fileName}`}
        width={32}
        height={32}
        className="w-12 h-12 md:h-20 md:w-20"
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
  )
}

export default LogoItem