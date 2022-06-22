export interface Keywords {
  words: string[]
  _id: string
  code: string
  language: string
  updated: Date
  lastUpdated: Date
}

/* from https://api.arasaac.org/api/pictograms/es/search/casa
using http://json2ts.com/ */

export interface Keyword {
  keyword: string
  type: number
  meaning: string
  plural: string
  hasLocution: boolean
}

export interface Pictogram {
  _id: number
  created: Date
  downloads: number
  tags: string[]
  synsets: string[]
  sex: boolean
  lastUpdated: Date
  schematic: boolean
  keywords: Keyword[]
  categories: string[]
  violence: boolean
  hair: boolean
  skin: boolean
  aac: boolean
  aacColor: boolean
  score?: number
  desc: string
}
