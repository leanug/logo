'use client'

import Image from "next/image"

import { FaDownload, FaCopy, FaCircleInfo } from "react-icons/fa6"
import { useQueryClient } from '@tanstack/react-query'

import { useModalStore, useNotificationStore } from "@/store"
import { updateLogo } from '@/server/update-logo'

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
  const {addNotification} = useNotificationStore()

  const queryClient = useQueryClient()

  const copySvgFromFile = async (e: any) => {
    e.stopPropagation()

    try {
      // Fetch the SVG content
      const response = await fetch("/next.svg");
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
  };

  /* Download Logo */
  const downloadSvg = async (e: any) => {
    e.stopPropagation()
    const svgUrl = "/next.svg"
  
    // Create a temporary <a> element to initiate download
    const link = document.createElement("a")
    link.href = svgUrl;
    link.download = "next.svg"; // File name for the download
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
          <button
            data-tip="Download SVG"
            className="
              btn btn-sm bg-gray-100 py-1.5  
              hover:bg-gray-200 flex items-center gap-2 opacity-0
              group-hover:opacity-100 transition-opacity duration-300
            "
            onClick={openModal}
          >
            <FaCircleInfo size={16} />
          </button>
          <button
            data-tip="Download SVG"
            className="
              btn btn-sm bg-gray-100 py-1.5
              hover:bg-gray-200 flex items-center gap-2 opacity-0
              group-hover:opacity-100 transition-opacity duration-300
            "
            onClick={downloadSvg}
          >
            <FaDownload size={16} />
          </button>
        </div>
      </div>
    </div>
      )
    }

export default LogoItem