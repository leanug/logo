'use client'

import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="px-2.5">
      <footer className="footer items-center md:p-4 mt-6 mx-auto">
        <div className="grid-flow-col gap-4">
          <p>
            💻 Developed by <a className="btn btn-link p-0" href="https://x.com/scriptpxls">leanug</a>
          </p>
        </div>
        <div className="grid-flow-col items-center md:justify-self-end">
          📃 <Link className="btn btn-link p-0" href="/license">License</Link>
          ✉️ <Link className="btn btn-link p-0" href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
