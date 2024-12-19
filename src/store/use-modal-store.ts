import { create } from 'zustand'

type LogoDetails = {
  id: string
  copies: number
  downloads: number
  fileName: string
  updatedAt: Date
  tag: string
  tags: string[]
}

type ModalStore = {
  openModal: string | null; // Keeps track of the currently open modal
  modalData: LogoDetails | null; // Data passed to the modal
  setOpenModal: (modalName: string) => void;
  setModalData: (data: LogoDetails | null) => void; // Sets the modal data
  clearModalData: () => void; // Clears modal data
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: null,
  modalData: null, // Initialize modalData
  setOpenModal: (modalName) => set({ openModal: modalName }),
  setModalData: (data) => set({ modalData: data }),
  clearModalData: () => set({ modalData: null }),
  closeModal: () => set({ openModal: null }),
}))