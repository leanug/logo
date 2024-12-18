import { create } from 'zustand'

interface ModalStore {
  openModal: string | null; // Keeps track of the currently open modal
  modalData: Record<string, any> | null; // Data passed to the modal
  setOpenModal: (modalName: string) => void;
  setModalData: (data: Record<string, any>) => void; // Sets the modal data
  clearModalData: () => void; // Clears modal data
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: null,
  modalData: {}, // Initialize modalData
  setOpenModal: (modalName) => set({ openModal: modalName }),
  setModalData: (data) => set({ modalData: data }),
  clearModalData: () => set({ modalData: null }),
  closeModal: () => set({ openModal: null }),
}))