'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from "next/link"

import { FaBars, FaXmark } from 'react-icons/fa6'

import NavLinks from '@/components/Layout/Nav'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev: boolean) => ! prev)
  }

  return (
    <header 
      className="
        flex items-center px-2.5 w-full justify-between 
        lg:mx-auto py-2.5 sm:py-3 border-b border-base-200
      "
    >
      <div>
        <Link href="/">
          <div className='w-40 btn btn-ghost px-2'>
            <Image
              src="/logo-orange.svg"
              alt="Logo"
              width={150}
              height={38}
              placeholder="empty" // use 'empty' for a blank placeholder
              loading="eager" 
              priority={true}
            />
          </div>
        </Link>
      </div>
      <NavLinks isOpen={isOpen} />
      <button
        className="sm:hidden btn btn-ghost"
        onClick={toggleMenu} 
      >
        {
          isOpen 
            ? <FaXmark size={18} /> 
            : <FaBars size={18} />
        }
      </button>
    </header>
  )
}
