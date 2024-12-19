'use client'

import { useModalStore } from "@/store"

type UseLogoInfoModalProps = {
  id: string
  copies: number 
  downloads: number 
  fileName: string
  tags: string[]
  tag: string
  updatedAt: Date
}

export const useLogoInfoModal = ({ 
  id,
  copies, 
  downloads,
  fileName,
  updatedAt,
  tag,
  tags
}: UseLogoInfoModalProps) => {
  const {setOpenModal, setModalData} = useModalStore()

  const openLogoInfoModal = (e: any) => {
    e.stopPropagation()
    setModalData({ 
      id,
      copies, 
      downloads,
      fileName,
      updatedAt,
      tag,
      tags
    })
    setOpenModal('modal')
  }

  return {openLogoInfoModal}
}