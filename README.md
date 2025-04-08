# Gestión de Laboratorio Farmacéutico

Esta aplicación web está diseñada para optimizar la administración y trazabilidad en el área de microbiología de un laboratorio farmacéutico. Se utiliza una arquitectura por features que encapsula la funcionalidad de cada módulo en carpetas independientes, facilitando la escalabilidad y el mantenimiento. El layout es global y compartido en todas las vistas, mientras que el enrutamiento se gestiona desde la carpeta nativa de Astro: `/src/pages`.

---

## Requerimientos Funcionales

A continuación, se detallan los requerimientos funcionales que soporta la aplicación:

### Gestión de Usuarios y Autenticación

- **Registro de Usuarios:**  
  - **Como** coordinador del área, **quiero** crear usuarios, **para** controlar quién puede acceder al sistema.  
    - Formulario de registro con los siguientes campos:  
      - Nombre Completo  
      - Cédula  
      - Email  
      - Contraseña  
      - Firma  
    - Estado de actividad del usuario (activo/inactivo).

- **Formato de Firma:**  
  - **Como** coordinador, **quiero** que cada usuario registrado tenga una firma (por ejemplo: *David Gonzalez* se transforma a *D. Gonzalez*), para identificar en qué análisis intervino cada usuario.

- **Autenticación:**  
  - **Como** analista, **quiero** ingresar al sistema con mi usuario y contraseña, para usar las funcionalidades asignadas a mi cargo.

- **Listado y Gestión de Usuarios:**  
  - **Como** coordinador, **quiero** visualizar un listado de usuarios (con búsqueda por nombre y actualización de información) y también inhabilitar el acceso a aquellos que ya no forman parte del área.

### Control y Seguimiento de Productos

- **Registro de Productos:**  
  - **Como** analista, **quiero** registrar los productos que ingresan al área (cada entrada es única, aunque los nombres puedan repetirse) a través de un CRUD de productos.

- **Listado y Filtros en Productos:**  
  - **Como** analista, **quiero** obtener un listado de los productos recientes ingresados, permitiendo búsquedas por ID, y filtros por:
    - Tipo de producto  
    - Fecha de recepción  
    - Fecha de inicio de análisis

- **Estadísticas de Ingreso y Calidad:**  
  - **Como** coordinador, **quiero** conocer:
    - La cantidad de productos que ingresan al área de forma diaria, mensual y anual.
    - La cantidad de productos que cumplen los estándares de calidad en los mismos períodos.
    - La cantidad de productos procesados por cada analista al mes, con un top 3 de los mejores rendimientos.

- **Historial de Cambios (Tracking):**  
  - **Como** coordinador, **quiero** que cada producto tenga un registro de cambios para mapear el proceso de análisis; esto incluye:
    - Fechas e información de cada cambio.
    - Operaciones CRUD para gestionar la información de cada etapa del producto.

### Gestión de Clientes y Proveedores

- **Clientes:**  
  - **Como** analista, **quiero** registrar a los clientes de los productos que se analizan y visualizar un listado que permita búsquedas por nombre.

- **Proveedores:**  
  - **Como** analista, **quiero** registrar a los proveedores y contar con un listado con capacidad de búsqueda por nombre.

### Monitoreo y Resultados de Análisis

- **Pruebas de Recuento:**  
  - **Como** analista, **quiero** registrar el monitoreo y los resultados de pruebas de recuento de un producto, incluyendo:
    - Registro de métodos y variables ambientales.
    - Registro de resultados (por ejemplo, bioburden en cajas).
  - Además, poder consultar y actualizar la información de estas pruebas.

- **Controles Negativos:**  
  - **Como** analista, **quiero** registrar y consultar los controles negativos de los medios empleados en los análisis, permitiendo su actualización.

- **Detección de Microorganismos:**  
  - **Como** analista, **quiero** registrar y consultar tanto los métodos y variables ambientales como los resultados de las pruebas de detección de microorganismos específicos, asegurando la trazabilidad y actualización cuando sea necesario.

### Informes y Peticiones de Cambio

- **Generación de Informes:**  
  - **Como** analista, **quiero** generar un informe microbiológico en formato PDF que resuma los resultados de las pruebas, para firmarlo y entregarlo al cliente en formato físico.

- **Peticiones de Cambio:**  
  - **Como** coordinador, **quiero** dejar peticiones de cambio a los analistas sobre productos específicos, indicando:
    - El módulo a modificar  
    - El número de registro del producto  
    - Ordenando por fecha de creación
  - Además, conocer el estado de resolución de estas peticiones y disponer de un listado filtrable (por número de registro, estado y nombre del analista).
  - **Como** analista, **quiero** recibir notificaciones cuando el coordinador solicite cambios y actualizar el estado de la petición a resuelta.

### Recuperación de Contraseña

- **Recuperación de Contraseña:**  
  - **Como** analista, **quiero** recuperar mi contraseña a través de mi correo electrónico, para restablecer el acceso en caso de pérdida.

---

## Arquitectura por Features y Organización del Proyecto

La aplicación se organiza en base a una **arquitectura por features**, lo que implica que cada funcionalidad se encapsula en un módulo independiente. Cada feature contiene:

- **Componentes:**  
  Archivos de UI específicos para la funcionalidad (por ejemplo, componentes de formulario, listados, tarjetas informativas, etc.).

- **Utilidades (Utils):**  
  Funciones y métodos propios que gestionan la lógica particular (por ejemplo, llamadas a la API, validaciones y transformaciones de datos específicos).

- **Clases:**  
  Entidades y modelos de datos que representan los objetos de negocio de cada feature.

El layout es global, compartido entre todas las vistas, y se integra en las rutas nativas de Astro, ubicadas en `/src/pages`.

### Estructura General del Proyecto
Las carpetas dentro de features y de pages pueden variar
```
/mi-proyecto
├─ /.vscode
│    ├─ extensions.json
│    └─ launch.json
├─ /node_modules
├─ /public
│    ├─ /assets
│    │    ├─ css
│    │    └─ images
│    └─ favicon.svg
├─ /src
│    ├─ /features
│    │    ├─ /user
│    │    │    ├─ /components
│    │    │    │     └─ UserProfile.jsx
│    │    │    ├─ /utils
│    │    │    │     └─ api.js
│    │    │    └─ /classes
│    │    │           └─ User.js
│    │    ├─ /product
│    │    │    ├─ /components
│    │    │    │     └─ ProductCard.jsx
│    │    │    ├─ /utils
│    │    │    │     └─ productApi.js
│    │    │    └─ /classes
│    │    │           └─ Product.js
│    │    ├─ /analysis
│    │    │    ├─ /components
│    │    │    │     └─ TestForm.jsx
│    │    │    ├─ /utils
│    │    │    │     └─ analysisApi.js
│    │    │    └─ /classes
│    │    │           └─ Analysis.js
│    │    └─ /others
│    │         └─ (Otras features según se requiera)
│    ├─ /layouts
│    │    └─ MainLayout.astro            <!-- Layout global para todas las vistas -->
│    └─ /pages
│         ├─ index.astro                 <!-- Página de bienvenida -->
│         ├─ user.astro                  <!-- Ruta para la feature "user" -->
│         ├─ product.astro               <!-- Ruta para la feature "product" -->
│         ├─ analysis.astro              <!-- Ruta para la feature "analysis" -->
│         └─ (más rutas según se requiera)
├─ astro.config.mjs
├─ package.json
├─ pnpm-lock.yaml (o package-lock.json)
├─ tsconfig.json  (si se utiliza TypeScript)
└─ README.md
```

**Puntos Clave:**

- **Features Encapsuladas:**  
  Cada módulo de funcionalidad tiene su propio conjunto de componentes, utilidades y clases, permitiendo que cada feature pueda evolucionar de forma independiente.

- **Layout Global:**  
  Se utiliza un layout compartido (`MainLayout.astro`) para mantener consistencia en la experiencia de usuario a través de todas las vistas.

- **Enrutamiento Centralizado:**  
  Todas las rutas públicas se gestionan en `/src/pages`, donde se importan los componentes necesarios de cada feature.

- **Assets:**  
  Los recursos globales (como CSS, imágenes y otros) se ubican en la carpeta `/public/assets`. Si una feature requiere assets propios, se pueden incluir en una subcarpeta dentro del módulo de la feature.

---

## Instalación y Uso

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión LTS recomendada).  
- Gestor de paquetes: [pnpm](https://pnpm.io/) o npm.

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
   
2. **Entra a la carpeta del proyecto:**
    ```bash    
    cd mi-proyecto
    ```
3. **Instala las dependencias con pnpm**
    ```bash
    pnpm install
    ```
## Modos de Ejecucion

1. **Modo Desarrollo**
    ```bash
    pnpm dev
    ```
2. **Build y Previsualizacion en produccion**
    Genera el build final de la aplicacion:
    ```bash
    pnpm run build
    ```
    Previsualizar en modo produccion:
    ```
    pnpm run preview
    ```
## Tecnologias Utilizadas
- **Astro**: Framework para construir sitios web estáticos y optimizados.
- **React**: Biblioteca para construir interfaces interactivas.
- **JavaScript**: Lenguajes de programación para la lógica del frontend.
- **CSS**: Para estilos y diseño responsivo.

## Contribuciones
1. **Realiza un fork en el repositorio**
2. **Crea una nueva rama para la funcionalidad o correcion**
    ```
    git checkout -b feature/nueva-funcionalidad
    ```
3. **Realiza tus cambios y haz commit**
    ```
    git commit -m "Agrega nueva funcionalidad X"
    ```
4. **Sube tus cambios**
    ```
    git push origin feature/nueva-funcionalidad
    ```
5. **Abre un pull request en GitHub**

## Nota
Este es un proyecto educativo del SENA en Colombia, por ende este proyecto no tiene fines educativos.
## Autores
- [Santiago Quitian](https://github.com/Santiago-Quitian)
- [Andrea Niño](https://github.com/AndreaBedoya)
- [Nicolas Becerra](https://github.com/NicolasBece)
- [David Gonzalez](https://github.com/DavidGonzalez-dev)

# Implementacion Login
# Implementacion Registro Login