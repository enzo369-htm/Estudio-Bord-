import { createRouter, type Route } from './router'
import { authRoutes } from './routes/auth'
import { canvasRoutes } from './routes/canvas'
import { editorialRoutes } from './routes/editorial'
import { mediaRoutes } from './routes/media'
import { pageRoutes } from './routes/pages'

/**
 * Todas las rutas del sitio, en un solo lugar. Las recetas y los módulos
 * agregan sus rutas acá; nunca creando un archivo nuevo dentro de `api/`.
 */
const routes: Route[] = [
  ...authRoutes,
  ...mediaRoutes,
  ...editorialRoutes,
  ...pageRoutes,
  ...canvasRoutes,
]

const handle = createRouter(routes)

export async function core(request: Request): Promise<Response> {
  try {
    return await handle(request)
  } catch (error) {
    console.error('[api]', error)
    return Response.json({ error: 'Error de servidor' }, { status: 500 })
  }
}
