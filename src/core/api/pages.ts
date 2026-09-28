import type { MediaRecord } from '../images/types'
import { request } from './client'

export type PageRecord = {
  slug: string
  title: string
  titleEn: string
  body: string
  bodyEn: string
  image: MediaRecord | null
  updatedAt?: string
}

export async function apiGetPage(slug: string) {
  return request<PageRecord>(`/api/pages/${slug}`)
}

export async function apiSavePage(
  slug: string,
  payload: {
    title: string
    titleEn: string
    body: string
    bodyEn: string
    imageMediaId: string | null
  },
) {
  return request<PageRecord>(`/api/pages/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
