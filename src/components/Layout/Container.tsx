import { ReactNode } from 'react'

function Container({children}: {children: ReactNode}) {
  return (
    <div className="py-6 md:py-8">
      {children}
    </div>
  )
}

export default Container