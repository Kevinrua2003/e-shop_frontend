# E-Shop

Your premium e-commerce destination

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19 + Material UI (MUI)
- **Estilos**: Tailwind CSS
- **Autenticación**: NextAuth.js (Auth.js v5)
- **API**: Consume API REST externa (gestionada en otro repositorio)
- **Base de Datos**: PostgreSQL
- **Formularios**: React Hook Form
- **Notificaciones**: React Hot Toast + SweetAlert2
- **Animaciones**: Framer Motion
- **Gestión de Estado**: React Context API
- **HTTP Client**: Axios
- **Íconos**: React Icons

## Propósito y Funcionamiento

E-Shop es una aplicación de comercio electrónico completa que permite:

- **Clientes**: Navegar productos, buscar por categorías, agregar al carrito, realizar pedidos
- **Administradores**: Gestionar productos (crear, editar, eliminar), administrar pedidos

### Características Principales

- Catálogo de productos con filtrado y búsqueda
- Carrito de compras persistente
- Sistema de autenticación (login/register)
- Panel de administración
- Tema claro/oscuro
- Diseño responsivo

### Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con productos |
| `/product/[productId]` | Detalles de producto |
| `/cart` | Carrito de compras |
| `/auth/login` | Inicio de sesión |
| `/auth/register` | Registro de usuario |
| `/admin` | Panel de administración |
| `/admin/manage-products` | Gestionar productos |
| `/admin/manage-orders` | Gestionar pedidos |
| `/admin/add-products` | Añadir nuevo producto |
| `/admin/edit-product/[productId]` | Editar producto |
| `/user/[userId]` | Perfil de usuario |

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
NEXT_PUBLIC_API_URL=
```

Configura la URL de la API REST externa.

## Cómo Iniciar la App

1. **Instalar dependencias**:

```bash
npm install
# o
pnpm install
# o
yarn install
```

2. **Configurar variables de entorno**:

Copia el archivo `.env.example` a `.env` y completa los valores necesarios.

3. **Ejecutar en desarrollo**:

```bash
npm run dev
```

4. **Abrir en el navegador**:

Accede a [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta el linter |

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Panel de administración
│   ├── auth/              # Rutas de autenticación
│   ├── cart/              # Carrito de compras
│   ├── product/           # Detalles de producto
│   └── user/              # Perfil de usuario
├── hooks/                  # Custom React Hooks
├── providers/              # Context Providers
├── UI/                     # Componentes de interfaz
└── utils/                  # Utilidades y funciones
```
