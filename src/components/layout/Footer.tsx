'use client'

import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="px-2.5 md:px-0">
      <footer className="flex justify-start md:justify-between flex-col md:flex-row items-center md:px-6 mt-6 mx-auto">
        <div className="grid-flow-col gap-4">
          <p>
            💻 Developed by <a className="btn btn-link p-0 text-base-content" href="https://x.com/scriptpxls">leanug</a>
          </p>
        </div>
        <div className="grid-flow-col items-center md:justify-self-end">
          <Link className="btn btn-link p-0 text-base-content" href="/license">License</Link>
          <Link className="btn btn-link p-0 ml-3 text-base-content" href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
