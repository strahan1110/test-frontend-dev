# ParisCorp Cursos Dashboard

## Descripción

ParisCorp Cursos es un dashboard moderno y responsive para la gestión de cursos y módulos educativos. La aplicación permite a los usuarios visualizar y acceder a contenido educativo a través de una interfaz intuitiva y atractiva.

## Características Principales

- **Interfaz Responsive**: Diseño adaptable que funciona perfectamente tanto en dispositivos móviles como en escritorio.
- **Autenticación Segura**: Sistema de login y logout con token JWT para proteger el acceso a los cursos.
- **Gestión de Módulos**: Visualización jerárquica de módulos y clases con progreso individual.
- **Reproductor de Video Integrado**: Visualización de videos de YouTube directamente en el dashboard.
- **Seguimiento de Progreso**: Sistema de seguimiento del progreso en cada módulo y clase.

## Tecnologías Utilizadas

- **Frontend**: React.js
- **UI Components**: Tailwind CSS, Lucide React
- **Autenticación**: JWT
- **Integración**: YouTube Embed API
- **Mis Asistencias Técnicas**: Lovable / DeepSeek / Windsurf

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- API de YouTube (para incrustar videos)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
VITE_API_URL=[URL_DE_TU_API]
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── ClaseItem.jsx  # Tarjeta de clase individual
│   ├── ModuloCard.jsx # Tarjeta de módulo
│   └── ui/            # Componentes de interfaz
├── pages/             # Páginas principales
│   ├── Login.jsx     # Página de inicio de sesión
│   └── Modulos.jsx   # Dashboard principal
├── services/          # Servicios y API
│   └── authenticationService.js
└── hooks/            # Hooks personalizados
    └── use-mobile.js
```

## Funcionalidades

### Login
- Sistema de autenticación con JWT
- Interfaz moderna y responsive
- Validación de credenciales

### Dashboard de Módulos
- Visualización jerárquica de módulos
- Expansión/colapso de módulos
- Indicadores de progreso
- Contador de clases completadas

### Reproductor de Video
- Integración con YouTube
- Reproducción automática
- Control de tamaño responsivo
- Soporte para diferentes formatos de URL de YouTube

### Diseño Responsivo
- Layout adaptable
- Menú lateral colapsable
- Optimización para móviles
- Animaciones suaves

## Variables de Entorno

- `VITE_API_URL`: URL base de la API

## Contribución

1. Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto

Jemima Jange - jemimajange@gmail.com
WhatsApp - 999920247

