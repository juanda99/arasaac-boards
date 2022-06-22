import useSWR from 'swr'
import { Keywords, Pictogram } from './types'

declare function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response>

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init)
  return res.json()
}

interface KeywordsProps {
  keywords: string[]
  isLoading: boolean
  isError: string
}
export const useKeywords = (language: string): KeywordsProps => {
  const { data, error } = useSWR(
    `https://api.arasaac.org/api/keywords/${language}`,
    fetcher
  )
  return {
    keywords: data?.words,
    isLoading: !error && !data,
    isError: error,
  }
}

export const usePictograms = (
  keyword: string,
  language: string
): { pictograms: Pictogram[]; isLoading: boolean; isError: string } => {
  const { data, error } = useSWR(
    `https://api.arasaac.org/api/pictograms/${language}/search/${keyword}`,
    fetcher
  )

  return {
    pictograms: data,
    isLoading: !error && !data,
    isError: error,
  }
}
