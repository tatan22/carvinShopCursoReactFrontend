# Proyecto TesloShop

## Paso a paso para levantar el proyecto

1. Clonar el repositorio
2. Clonar el archivo .env.templete y renombrarlo a .env
3. Ejecutar el comando `npm install` para instalar las dependencias
4. Verificar que el backend este Corriendo
5. Ejecutar el comando `npm run dev` para levantar el proyecto

Este proyecto fue diseñado con tres paneles que fueron diseñados con inteligencia artificial y react, instalamos tailwindcss ya que usaremos shadcn

- Instalamos tailwindcss
- Instalamos shadcn
- instalamos el bottom de shadcn con `npx shadcn@latest add button`
- Instalar la fuente de Google Fonts, estas van en el index.html
- Se debe especificar el font family en el index.css al final de la hoja de estilos usamos

``` css
@theme {
  --font-montserrat: 'Montserrat Alternates', sans-serif;
  }
  ```

## Diseño de nuestra aplicación

- El primer diseño fue creado con lovable
- Hacemos un fork del proyecto de lovable para poder usarlo en el proyecto, ya en github presionamos "." para abrir vsc online
  [repositorio](https://github.dev/tatan22/threads-of-tesla-style-recurso)
- Para mostrar la sección crearemos un jumbotron

  > 💡 Regla fácil para recordar:

  Usa || → cuando quieras un valor por defecto para cualquier valor falsy.

  Usa ?? → cuando quieras un valor por defecto solo si es null o undefined (sin afectar 0, false o "").

## Determinar que cosas van el useState y que cosas van en la Url

  Solo vamos a utilizar las variables de estado es para determinar si un menu esta abierto o no, mas que todo en el modo response

  > en html la etiqueta `a` se llama anchor tags o enlaces

## Navegación del sidebar

  Para la navegación el sidebar implementaremos el el hook de useLocation para determinar la ruta actual, con pathname que nos permite determinar la ruta actual
   Recordemos que useLocation me entrega la información de la url actual, como protocolo (http o https), el host, el puerto; el pathname me entrega la información adicional de la ruta actual de la url.

### Products

   Recomendación para el uso de tablas que sean mas robustas y permitan una mayor interacción con el usuario. Puedes ver un ejemplo en la sección de [Tables](https://www.shadcn.com/ui/tables) de Shadcn UI.

   Pero para casos prácticos de este proyecto usaremos las tablas de Shadcn UI y las tablas de Tailwind CSS.

## Instalación de TanStack Query

   Instalamos las siguientes dependencias

   ```bash
   npm install @tanstack/react-query axios 
   ```

   Instalación de las Devtools de TanStack Query

   ```bash
   npm install @tanstack/react-query-devtools
   ```

   Hacemos la configuración de tanstack query

   ```js
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
   import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

   const queryClient = new QueryClient()

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
         <QueryClientProvider client={queryClient}>
               <App />
                     <ReactQueryDevtools />
                         </QueryClientProvider>
                           </React.StrictMode>,
                           )
```

Esta configuración va en nuestro componente principal en este caso en TesloShopApp.tsx

## Conexión  del frontend con el backend con axios

Creamos una variable de entorno en el frontend para la conexión con el backend

## Mostrar notificaciones

Para este proyecto usaremos sonner para mostrar las notificaciones

## Uso de Gestores de Estado de Zustand

Recomendado curso de Zustand y también de patrones de diseño de Fernando Herrera

> La doble negación es para que trasforme el valor undefined a un booleano, lo usaremos para determinar si el usuario esta logueado o no

## Protección de rutas por roll

## Para el manejo de formularios

Para el manejo de formularios tenemos dos opciones muy populares que son useForm y Formik

Para ejemplos prácticos de este curso usaremos useForm
> Todos los botones postean en el formulario, al menos que se le especifique que es de tipo button

El getValues no lanza rerender, pero hay en ocasiones que necesitamos que lance rerender, para esto usaremos
useForm podemos usar su función watch

---

## Uso de Bucket para el manejo de archivos

En este proyecto cargaremos las imágenes en fileSystem, esto no es lo más recomendable ya que no es escalable, pero para este proyecto lo vamos a usar como ejemplo practico ya que este curso no es un curso basado en el backend.

Los files no hacen parte de los productos por buenas prácticas

## Deployment de la aplicación

- En Neon tech desplegamos la base de datos 

- Desplegaremos en backend en 