# Enisa Limpieza · Servicios para el Hogar

Web profesional con landing, sistema de reservas y panel de administración.

---

## 🚀 Cómo publicar en Vercel (paso a paso)

### PASO 1 — Instala Git si no lo tienes
Descarga desde: https://git-scm.com/download/win

### PASO 2 — Sube el proyecto a GitHub

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
git init
git add .
git commit -m "Primera versión Enisa Limpieza"
```

Luego:
1. Ve a https://github.com → crea una cuenta si no tienes
2. Haz clic en **"New repository"** → ponle nombre (ej: `enisa-web`)
3. Copia los comandos que te da GitHub para subir el código:

```powershell
git remote add origin https://github.com/TU_USUARIO/enisa-web.git
git branch -M main
git push -u origin main
```

### PASO 3 — Despliega en Vercel

1. Ve a https://vercel.com → crea cuenta con GitHub
2. Haz clic en **"New Project"**
3. Selecciona el repositorio `enisa-web`
4. Vercel detecta Next.js automáticamente → haz clic en **"Deploy"**

### PASO 4 — Crea la base de datos (gratis con Neon)

1. En Vercel → tu proyecto → pestaña **"Storage"**
2. Haz clic en **"Create Database"** → selecciona **"Neon Postgres"**
3. Elige la región **"Frankfurt"** (la más cercana a España)
4. Vercel conecta la base de datos automáticamente

### PASO 5 — Añade las variables de entorno en Vercel

En Vercel → tu proyecto → **"Settings"** → **"Environment Variables"**

Añade cada una de estas variables:

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | La que te da Neon automáticamente |
| `AUTH_SECRET` | `mCKQ6OOlhRnxn9s/8u+cO84O04g09rSPG/IC28Evxkg=` |
| `NEXTAUTH_SECRET` | mismo valor que AUTH_SECRET |
| `NEXTAUTH_URL` | `https://tudominio.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://tudominio.com` |
| `NEXT_PUBLIC_COMPANY_NAME` | `Enisa Limpieza` |
| `NEXT_PUBLIC_COMPANY_PHONE` | `+34 691 74 67 30` |
| `NEXT_PUBLIC_COMPANY_EMAIL` | `info@enisa.es` |
| `DEMO_ADMIN_EMAIL` | `admin@enisa.es` |
| `DEMO_ADMIN_PASSWORD` | (pon una contraseña segura) |

Después de añadirlas → haz clic en **"Redeploy"**.

### PASO 6 — Inicializa la base de datos

En tu ordenador, con el proyecto descargado:

```powershell
# Copia el DATABASE_URL de Vercel a tu .env.local
# Luego ejecuta:
npm run db:push
npm run db:seed
```

### PASO 7 — Conecta tu dominio de IONOS

1. En Vercel → **"Settings"** → **"Domains"** → escribe tu dominio
2. Vercel te dará dos registros DNS, por ejemplo:
   - Tipo `A` → valor `76.76.21.21`
   - Tipo `CNAME` → `cname.vercel-dns.com`
3. En IONOS → panel de control → **"Dominios y SSL"** → tu dominio → **"DNS"**
4. Añade esos dos registros
5. Espera 24-48 horas → tu web estará en tu dominio

---

## 🛠 Desarrollo local

```powershell
# Instalar dependencias
npm install

# Copiar variables de entorno
copy .env.example .env.local
# Edita .env.local con tus datos

# Iniciar servidor de desarrollo
npm run dev
```

Abre http://localhost:3000

## Panel de administración

- URL: `/admin/login`
- Email: `admin@enisa.es`
- Contraseña: la que hayas puesto en `DEMO_ADMIN_PASSWORD`

---

## 📦 Stack tecnológico

| Tecnología | Uso |
|-----------|-----|
| Next.js 15 (App Router) | Framework principal |
| TailwindCSS | Estilos |
| Framer Motion | Animaciones |
| PostgreSQL + Prisma | Base de datos |
| NextAuth v5 | Autenticación admin |
| Nodemailer / Resend | Emails de confirmación |
| Vercel | Hosting |
| Neon | Base de datos en la nube |
