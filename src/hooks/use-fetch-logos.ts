'use client'

import {
  useQuery,
} from '@tanstack/react-query'

import { fetchLogos } from '@/server/fetch-logos'

export const useFetchLogos = (tag: string) => {
  return useQuery({
    queryKey: ['logos', tag],
    queryFn: () => fetchLogos(tag)
  })
}