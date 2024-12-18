'use client'

import { useParams } from "next/navigation"

import {
  useQuery,
} from '@tanstack/react-query'

import LogoItem from "@/components/Logos/Logo"
import { fetchLogos } from '@/server/fetch-logos'
import { Logo } from "@/types"

function LogoList() {
  const params = useParams()
  const {tag} = params

  const {
    data: logos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['logos', tag],
    queryFn: () => fetchLogos(tag as string)
  })
  
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {logos && 
        <section className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {logos.map((logo: Logo) => (
              <LogoItem 
                key={logo._id}
                id={logo._id}
                copies={logo?.copies || 0}
                downloads={logo?.downloads || 0}
                fileName={logo?.fileName || 'vercel.svg'}
                priority={false}
              />
            ))}
          </div>
        </section>
      }
    </>
  )
}

export default LogoList