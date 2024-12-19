import Link from "next/link"

function NavLinks({ isOpen }: { isOpen: boolean}) {
  return (
    <nav 
      className={`
        flex-none w-full absolute top-[70px] left-0 bg-white z-50 
        sm:static sm:w-auto sm:bg-transparent shadow-lg sm:shadow-none 
        sm:block px-1.5 sm:px-0 py-6 sm:py-0
        ${isOpen ? '' : 'hidden'}
      `}>
      <ul className="flex flex-col sm:flex-row px-1 md:p-0">
        <li>
          <Link 
            href="/"
            className="btn btn-ghost font-bold w-full"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/license"
            className="btn btn-ghost font-bold w-full"
          >
            License
          </Link>
        </li>
        <li>
          <Link 
            href="/contact"
            className="btn btn-ghost font-bold w-full"
          >
            Contact
          </Link>
        </li>
        <li>
          <a 
            className="btn btn-ghost font-bold w-full"
            href="https://www.feedbackrealm.com/b/logoplacer"
          >
            Feedback
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavLinks