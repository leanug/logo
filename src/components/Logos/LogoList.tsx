'use client'

import { useParams } from "next/navigation"

import LogoItem from "@/components/Logos/LogoItem"
import { useFetchLogos } from "@/hooks/use-fetch-logos"
import { Logo } from "@/types/logo"
import { Loading } from "@/components/UI/Loading"

function LogoList() {
  const params = useParams()
  const {tag} = params

  const {
    data: logos,
    isLoading,
    isError,
    refetch
  } = useFetchLogos(tag as string)
  
  return (
    <section className="md:max-w-7xl mx-auto px-2.5">
      {isLoading && <div className="flex justify-center"><Loading /></div>}
      {isError && (
        <div className="text-center space-y-3">
          <p>Error loading logos. Try again!</p>
          <button onClick={() => refetch()} className="btn btn-neutral">
            Retry
          </button>
        </div>
      )}
      {logos && 
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {logos.map((logo: Logo) => (
            <LogoItem
              key={logo._id}
              id={logo._id}
              copies={logo?.copies}
              downloads={logo?.downloads}
              fileName={logo?.fileName || 'default.svg'}
              updatedAt={logo?.updatedAt as Date} 
              tags={logo?.tags}
              tag={tag as string}
            />
          ))}
        </div>
      }
      {!isLoading && !isError && logos?.length === 0 && 
        <h3 className="font-semibold text-xl text-center">No results found</h3>
      }
    </section>
  )
}

export default LogoList