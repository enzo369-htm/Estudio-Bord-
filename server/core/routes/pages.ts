import type { MediaRecord } from '../../../src/core/images/types'
import { isAuthed } from '../auth'
import { hasDatabase, sql } from '../db'
import { asText, fail, isUuid, json, notFound, readJson, unauthorized } from '../http'
import { isPageSlug } from '../page-slug'
import { route } from '../router'

type PageRow = {
  slug: string
  title: string
  title_en: string
  body: string
  body_en: string
  image_media_id: string | null
  updated_at: string
  image_url: string | null
  image_width: number | null
  image_height: number | null
  image_mime: string | null
  image_variants: unknown
}

function imageOf(row: PageRow): MediaRecord | null {
  if (!row.image_media_id || !row.image_url) return null
  return {
    id: row.image_media_id,
    url: row.image_url,
    width: row.image_width,
    height: row.image_height,
    mime: row.image_mime,
    variants: (row.image_variants as MediaRecord['variants']) ?? {},
  }
}

function toRecord(row: PageRow) {
  return {
    slug: row.slug,
    title: row.title,
    titleEn: row.title_en,
    body: row.body,
    bodyEn: row.body_en,
    image: imageOf(row),
    updatedAt: row.updated_at,
  }
}

function imageIdFrom(raw: unknown) {
  const value = asText(raw)
  if (!value) return null
  if (!isUuid(value)) return undefined
  return value
}

async function loadPage(slug: string) {
  const db = sql()
  return (await db`
    select
      p.slug, p.title, p.title_en, p.body, p.body_en, p.image_media_id, p.updated_at,
      m.url as image_url, m.width as image_width, m.height as image_height,
      m.mime as image_mime, m.variants as image_variants
    from pages p
    left join media m on m.id = p.image_media_id
    where p.slug = ${slug}
  `) as PageRow[]
}

export const pageRoutes = [
  route('GET', '/api/pages/:slug', async ({ params }) => {
    const slug = params.slug ?? ''
    if (!isPageSlug(slug)) return fail(400, 'Slug inválido')
    if (!hasDatabase()) return fail(503, 'Falta DATABASE_URL')
    const rows = await loadPage(slug)
    if (!rows[0]) return notFound()
    return json(toRecord(rows[0]))
  }),

  route('PUT', '/api/pages/:slug', async ({ request, params }) => {
    if (!(await isAuthed(request))) return unauthorized()
    const slug = params.slug ?? ''
    if (!isPageSlug(slug)) return fail(400, 'Slug inválido')
    if (!hasDatabase()) return fail(503, 'Falta DATABASE_URL')
    const body = await readJson<{
      title?: unknown
      titleEn?: unknown
      body?: unknown
      bodyEn?: unknown
      imageMediaId?: unknown
    }>(request)
    const imageMediaId = imageIdFrom(body.imageMediaId)
    if (imageMediaId === undefined) return fail(400, 'imageMediaId inválido')

    const db = sql()
    await db`
      insert into pages (slug, title, title_en, body, body_en, image_media_id, updated_at)
      values (
        ${slug},
        ${asText(body.title)},
        ${asText(body.titleEn)},
        ${asText(body.body)},
        ${asText(body.bodyEn)},
        ${imageMediaId},
        now()
      )
      on conflict (slug) do update set
        title = excluded.title,
        title_en = excluded.title_en,
        body = excluded.body,
        body_en = excluded.body_en,
        image_media_id = excluded.image_media_id,
        updated_at = now()
    `
    const rows = await loadPage(slug)
    if (!rows[0]) return fail(500, 'No se pudo guardar la página')
    return json(toRecord(rows[0]))
  }),
]
