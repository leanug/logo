'use client'

import Link from 'next/link'
import Image from 'next/image'

import { FaXmark, FaDownload, FaCopy } from 'react-icons/fa6'

import LogoActionModalBtn from "@/components/UI/Buttons/LogoActionModalBtn"
import { useDownloadLogo } from '@/hooks/use-download-logo'
import { useCopyLogo } from "@/hooks/use-copy-logo"
import { tagTitles } from '@/data/tag-titles'
import { formatDate } from '@/utils/format-date'
import { useModalStore }  from '@/store/use-modal-store'

// Default logo object
const defaultLogo = {
  id: "default-id",
  copies: 0,
  downloads: 0,
  fileName: "default.svg",
  updatedAt: new Date(),
  tag: "default",
  tags: ["tech"]
};

// Initialize the variables with default values
let id = defaultLogo.id;
let copies = defaultLogo.copies;
let downloads = defaultLogo.downloads;
let fileName = defaultLogo.fileName;
let updatedAt = defaultLogo.updatedAt;
let tag = defaultLogo.tag;
let tags = defaultLogo.tags;

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing
 * the modal or null if the modal is not active.
 */
const Modal: React.FC = () => {
  const {openModal, closeModal, modalData} = useModalStore()
  // Check if modalData is neither null nor string
  // Only destructure if modalData is not null and is an object, not a string
  if (modalData && typeof modalData !== "string") {
    // Directly assign values from modalData to the variables
    id = modalData.id ?? defaultLogo.id;
    copies = modalData.copies ?? defaultLogo.copies;
    downloads = modalData.downloads ?? defaultLogo.downloads;
    fileName = modalData.fileName ?? defaultLogo.fileName;
    updatedAt = new Date(modalData.updatedAt) ?? defaultLogo.updatedAt.toISOString();
    tag = modalData.tag ?? defaultLogo.tag;
    tags = modalData.tags ?? defaultLogo.tags;
  }

  const {downloadSvg} = useDownloadLogo({fileName, id, tag})
  const {copySvgFromFile} = useCopyLogo({fileName, id, tag})
  
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
                width={82}
                height={82}
                className="max-w-40"
              />
            </div>
            <div className="flex items-center justify-between">
              <h1 className='text-xl font-bold'>
                Logo info:
              </h1>
              <div className="flex gap-2.5 items-center">
                <LogoActionModalBtn
                  tooltip="Download SVG"
                  icon={<FaDownload size={16} />}
                  onClick={downloadSvg}
                />
                <LogoActionModalBtn
                  tooltip="Copy SVG"
                  icon={<FaCopy size={16} />}
                  onClick={copySvgFromFile}
                />
              </div>
            </div>
            <div className="text-sm mt-3">{formatDate(updatedAt)}</div>
            <div className="flex gap-6 flex-wrap mt-6">
              <div>
                <div className="text-sm">Total Copies</div>
                <span className="font-semibold">{copies}</span>
              </div>
              <div>
                <div className="text-sm">Total Downloads</div>
                <span className="font-semibold">{downloads}</span>
              </div>
            </div>
            <h3 className="mt-6 text-sm">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {tags.map((tag: string) => {
                const title = tagTitles[tag as keyof typeof tagTitles];
                return (
                  <Link
                    key={tag}
                    onClick={() => closeModal()}
                    href={`/t/${tag}`}
                    className="
                      px-3 py-1 border border-gray-200 text-gray-700 
                      rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer"
                    >
                    {title}
                  </Link>
                )
              })}
            </div>
            <h3 className="mt-6 text-sm">Author</h3>
            <div className="mt-1.5">
              <a href="https://x.com/scriptpxls" className='btn btn-sm'>
                leanug
              </a>
            </div>
            <h3 className="mt-6 text-sm">Licence</h3>
            <p className="mt-1.5">
              Feel free to modify, share, or use this logo however you like, 
              with no restrictions.
            </p>
          </div>
        </div>
      </dialog>
    </div>
  ) : null
}

export default Modal