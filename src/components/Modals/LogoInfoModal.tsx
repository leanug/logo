'use client'

import Image from 'next/image'
import { FaXmark } from 'react-icons/fa6'
import {useModalStore}  from '@/store/use-modal-store'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing
 * the modal or null if the modal is not active.
 */
const Modal: React.FC = () => {
  const {openModal, closeModal, modalData} = useModalStore()
  const { id,
      copies, 
      downloads,
      fileName,
      tags } = modalData
  console.log('modalData', modalData);
  
  return openModal === 'modal' ? (
    <div
      className="
        fixed h-screen w-screen top-0 left-0 flex 
        justify-center items-center z-30"
      style={{ background: 'rgba(0,0,0,0.6)' }}
    >
      <dialog id="post-modal" className="modal" open>
        <div className="modal-box rounded-lg">
          <div className='w-32'>
            <Image
              src="/logo-orange.svg"
              alt="Logo"
              width={150}
              height={38}
              placeholder="empty" // use 'empty' for a blank placeholder
              loading="eager" 
              priority={true}
              className="logo"
            />
          </div>
          <button
            onClick={() => closeModal()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2.5 top-2.5"
          >
            <FaXmark size={22} />
          </button>
          <div>
            <div className="p-6 w-72 aspect-[4/3] m-auto flex items-center justify-center">
              <Image
                alt="icon"
                src={`./logos/${fileName}`}
                width={132}
                height={132}
                className="max-w-96"
              />
            </div>
            <h1 className='text-xl font-bold'>
              Logo info:
            </h1>
            <div className="text-sm mt-3">Posted on 23 dec, 2024</div>
            <div className="flex gap-6 flex-wrap mt-6">
              <div>
                <div className="text-sm">Total Copies</div>
                <span className="font-semibold">14.2k</span>
              </div>
              <div>
                <div className="text-sm">Total Downloads</div>
                <span className="font-semibold">14.2k</span>
              </div>
            </div>
            <h3 className="mt-6 text-sm">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-1.5">
              <span className="px-3 py-1 border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                React
              </span>
              <span className="px-3 py-1 border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                Tailwind
              </span>
              <span className="px-3 py-1 border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                JavaScript
              </span>
              <span className="px-3 py-1 border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                CSS
              </span>
              <span className="px-3 py-1 border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                TypeScript
              </span>
            </div>
            <h3 className="mt-6 text-sm">Author</h3>
            <div className="mt-1.5">
              <a href="https://www.github.com/leanug" className='btn btn-sm'>leanug</a>
            </div>
            <h3 className="mt-6 text-sm">Licence</h3>
            <p className="mt-1.5">
              Feel free to modify, share, or use this logo however you like, with no restrictions.
            </p>
          </div>
        </div>
      </dialog>
    </div>
  ) : null
}

export default Modal