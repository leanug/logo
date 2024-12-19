'use client'

import Link from 'next/link'

function Footer() {
  return (
    <footer className="
      flex border-t border-base-200 justify-start md:justify-between w-full 
      flex-col md:flex-row items-center md:px-6 mt-6 mx-auto py-3 px-2.5"
    >
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
  )
}

export default Footer