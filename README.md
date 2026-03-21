# Barber PWA (Next.js + Supabase)

PWA completa para gestión de citas de barberías, con frontend cliente, panel admin, Supabase y enlace dinámico a WhatsApp.

## Características

- Next.js 14 App Router + TailwindCSS + diseño mobile-first.
- PWA lista: `manifest.json`, service worker (vía `next-pwa`) y offline fallback.
- Cliente:
  - Home con branding y servicios.
  - Agenda por día con slots dinámicos (30/60 min).
  - Estados: disponible, ocupado y no disponible.
  - Reserva con generación de mensaje de WhatsApp.
- Admin:
  - Login con Supabase Auth.
  - Dashboard con métricas del día.
  - Crear/cancelar citas.
  - Endpoints CRUD para servicios, disponibilidad y bloqueos.
- Arquitectura reutilizable para múltiples barberías por `shop_id`.

## Estructura

- `app/` frontend y rutas API.
- `components/` UI reusable.
- `lib/` configuración, helpers y data access.
- `supabase/schema.sql` esquema SQL completo.

## Configuración rápida

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear variables de entorno:
   ```bash
   cp .env.example .env.local
   ```
3. Crear proyecto en Supabase y ejecutar `supabase/schema.sql` en SQL Editor.
4. En Supabase Auth, crear usuario administrador.
5. Ejecutar en local:
   ```bash
   npm run dev
   ```
6. Abrir `http://localhost:3000`.

## Deploy en Vercel

1. Subir repo a GitHub.
2. Importar proyecto en Vercel.
3. Configurar variables de entorno del `.env.example`.
4. Deploy.

## Personalización multi-barbería

- Branding por variables `NEXT_PUBLIC_*`.
- En modo SaaS, propagar `shop_id` por subdominio / tenant para filtrar datos por barbería.
- Puedes ampliar con tabla `profiles` para mapear usuario admin -> `shop_id`.
