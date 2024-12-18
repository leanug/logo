'use client'

import Link from "next/link"
import { useParams } from "next/navigation"

import { logoTags } from "@/data/logo-tags"

function TagList() {
  const params = useParams()
  const {tag} = params

  return (
    <section className="max-w-7xl w-svw md:w-full mx-auto mb-6">
      <div className="overflow-x-scroll md:overflow-hidden mx-2.5">
        <div className="flex gap-2 md:justify-center mb-2.5">
          <Link
            href="/"
            className={`px-3 py-1 btn btn-ghost btn-sm text-sm font-medium cursor-pointer ${tag === undefined ? 'bg-base-200' : ''}`}
          >
            All
          </Link>
          {logoTags.map((tagItem) => (
            <Link
              href={`/t/${tagItem.slug}`}
              key={tagItem.slug}
              className={`px-3 py-1 btn btn-ghost btn-sm text-sm font-medium cursor-pointer ${tag === tagItem.slug ? 'bg-base-200' : ''}`}
            >
              {tagItem.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TagList